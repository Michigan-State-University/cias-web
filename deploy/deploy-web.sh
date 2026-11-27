#!/usr/bin/env bash
#
# Build the cias-web image for one environment, push it to ECR, and roll the
# web service onto a new task definition revision pinned to it.
#
# cias-web bakes its configuration (API_URL, WEB_URL, feature flags, ...) into
# the JS bundle at build time, so an image only works in the environment it was
# built for. It is pushed as <IMAGE_TAG_PREFIX>-<IMAGE_TAG>, so builds for
# different environments never share a tag.
#
# Usage: deploy/deploy-web.sh [CIAS_WEB_DIR] [IMAGE_TAG]
#   CIAS_WEB_DIR  cias-web checkout to build (default: .)
#   IMAGE_TAG     version to build and deploy (default: 8-char git SHA of
#                 CIAS_WEB_DIR)
#
# Settings come from environment variables of the same name; only AWS_REGION,
# VERIFY_WEB_URL and ROLLOUT_TIMEOUT_SECONDS have defaults, so a run can't land
# on another environment.
# Run by .github/workflows/deploy-web.yml, or by hand.
#
# Requires aws (v2), docker, jq, git and curl. The AWS caller needs:
#   - ecr:GetAuthorizationToken, and push access to the ECR repository
#   - ecs:DescribeServices, ecs:DescribeTaskDefinition,
#     ecs:RegisterTaskDefinition, ecs:UpdateService
#   - iam:PassRole on the execution and task roles of the web task definition

set -euo pipefail

# --- Config -------------------------------------------------------------------

AWS_REGION="${AWS_REGION:-us-east-2}"
ECR_REPOSITORY_URI="${ECR_REPOSITORY_URI:-}"
ECS_CLUSTER_ARN="${ECS_CLUSTER_ARN:-}"
WEB_SERVICE_ARN="${WEB_SERVICE_ARN:-}"
IMAGE_TAG_PREFIX="${IMAGE_TAG_PREFIX:-}"
# After deploying, check that WEB_URL serves this image's bundle. Set to false
# while WEB_URL still points elsewhere, e.g. at Dokku before the DNS cutover.
VERIFY_WEB_URL="${VERIFY_WEB_URL:-true}"
# How long to wait for the service to roll out the new revision.
ROLLOUT_TIMEOUT_SECONDS="${ROLLOUT_TIMEOUT_SECONDS:-1200}"

# Build configuration baked into the bundle; the checks below enforce the
# formats.
required_build_vars=(API_URL WEBSOCKET_URL WEB_URL APP_STAGE SENTRY_ENV
  DISABLED_SMS_CAMPAIGN)
# Optional, but empty is not neutral: it disables LogRocket, Sentry and the
# feature flags. Carry each environment's values over.
# ADDITIONAL_ORIGIN_SECURE_TOKEN is deliberately never passed: whatever it held
# would be published in the bundle.
optional_build_vars=(LOGROCKET_ENV SENTRY_DSN INTERVENTION_EXPORT_FEATURE_ENABLED
  HFHS_INTEGRATION_FEATURE_ENABLED ALLOWED_USERS_FOR_SMS_CAMPAIGNS)
# SENTRY_AUTH_TOKEN (optional) uploads source maps to Sentry during the build.
# It is passed as a BuildKit secret, so it never lands in the image.

# ------------------------------------------------------------------------------

log() { echo "==> $*" >&2; }
die() { echo "ERROR: $*" >&2; exit 1; }

missing=()
for var in AWS_REGION ECR_REPOSITORY_URI ECS_CLUSTER_ARN WEB_SERVICE_ARN \
  IMAGE_TAG_PREFIX VERIFY_WEB_URL "${required_build_vars[@]}"; do
  if [[ -z "${!var:-}" || "${!var}" == REPLACE_ME ]]; then
    missing+=("$var")
  fi
done
if (( ${#missing[@]} > 0 )); then
  die "set these in the config block or the environment: ${missing[*]}"
fi
[[ "$VERIFY_WEB_URL" == true || "$VERIFY_WEB_URL" == false ]] ||
  die "VERIFY_WEB_URL must be true or false"
[[ "$ROLLOUT_TIMEOUT_SECONDS" =~ ^[1-9][0-9]*$ ]] ||
  die "ROLLOUT_TIMEOUT_SECONDS must be a whole number of seconds, without a leading zero"
# These end up in AWS CLI arguments, so only the expected shapes get through.
for var in ECS_CLUSTER_ARN WEB_SERVICE_ARN; do
  [[ "${!var}" =~ ^arn:aws:ecs:[a-z0-9-]+:[0-9]{12}:[a-z-]+/[A-Za-z0-9_./:-]+$ ]] ||
    die "$var must be an ECS ARN"
done
[[ "$ECR_REPOSITORY_URI" =~ ^[0-9]{12}\.dkr\.ecr\.[a-z0-9-]+\.amazonaws\.com/[a-z0-9._/-]+$ ]] ||
  die "ECR_REPOSITORY_URI must look like <account>.dkr.ecr.<region>.amazonaws.com/<repo>"
# The app only recognises these two; "production" would silently act as neither.
[[ "$APP_STAGE" == dev || "$APP_STAGE" == prod ]] || die "APP_STAGE must be dev or prod"
# SessionCreateButton treats only the exact string "true" as disabled.
[[ "$DISABLED_SMS_CAMPAIGN" == true || "$DISABLED_SMS_CAMPAIGN" == false ]] ||
  die "DISABLED_SMS_CAMPAIGN must be true or false"
# app/utils/env.ts reads these as Boolean(+value): only 1 turns a feature on, so
# "true" would silently ship it off.
for flag in INTERVENTION_EXPORT_FEATURE_ENABLED HFHS_INTEGRATION_FEATURE_ENABLED; do
  [[ -z "${!flag:-}" || "${!flag}" == 0 || "${!flag}" == 1 ]] ||
    die "$flag must be 0 or 1 (or empty, which turns it off)"
done
[[ "$API_URL" == https://* && "$WEB_URL" == https://* ]] ||
  die "API_URL and WEB_URL must start with https://"
[[ "$WEBSOCKET_URL" == wss://* ]] || die "WEBSOCKET_URL must start with wss://"

for cmd in aws docker jq git curl; do
  command -v "$cmd" >/dev/null || die "$cmd not found"
done

CIAS_WEB_DIR="${1:-.}"
IMAGE_TAG="${2:-}"
# The build bakes the working tree, so uncommitted changes would ship under a
# commit tag that doesn't contain them.
tree_status="$(git -C "$CIAS_WEB_DIR" status --porcelain)" ||
  die "$CIAS_WEB_DIR is not a git checkout"
if [[ -n "$tree_status" ]]; then
  die "$CIAS_WEB_DIR has uncommitted changes; commit or stash them first"
fi
if [[ -z "$IMAGE_TAG" ]]; then
  IMAGE_TAG="$(git -C "$CIAS_WEB_DIR" rev-parse --short=8 HEAD)"
elif tag_commit="$(git -C "$CIAS_WEB_DIR" rev-parse -q --verify "refs/tags/$IMAGE_TAG^{commit}")"; then
  # Tags are mutable in ECR, so building another commit would replace the release image.
  [[ "$tag_commit" == "$(git -C "$CIAS_WEB_DIR" rev-parse HEAD)" ]] ||
    die "$CIAS_WEB_DIR isn't at $IMAGE_TAG ($tag_commit); check the tag out first"
elif [[ "$IMAGE_TAG" =~ ^v[0-9] ]]; then
  die "$IMAGE_TAG looks like a release tag but isn't a tag in $CIAS_WEB_DIR; fetch tags and check it out"
fi
IMAGE="$ECR_REPOSITORY_URI:$IMAGE_TAG_PREFIX-$IMAGE_TAG"

# Applies to every aws call below, regardless of the caller's CLI config.
export AWS_REGION AWS_DEFAULT_REGION="$AWS_REGION" AWS_DEFAULT_OUTPUT=json AWS_PAGER=""
# docker build reads `--build-arg NAME` values from the environment, which keeps
# them off the command line.
export "${required_build_vars[@]}" "${optional_build_vars[@]}" SENTRY_AUTH_TOKEN

# Registers a copy of a task definition with every container that runs an image
# from ECR_REPOSITORY_URI switched to IMAGE, and prints the new revision's ARN.
# Other containers (e.g. the nginx sidecar) are left as they are.
# It runs inside $(...), where bash ignores set -e, so failures are checked by hand.
register_revision() {
  local task_definition="$1" definition
  log "Registering a new revision of $task_definition with $IMAGE"
  definition="$(
    aws ecs describe-task-definition --task-definition "$task_definition" \
      --query taskDefinition |
      jq --arg repo "$ECR_REPOSITORY_URI:" --arg image "$IMAGE" '
        .containerDefinitions |= map(
          if (.image | startswith($repo)) then .image = $image else . end
        )
        | del(.taskDefinitionArn, .revision, .status, .requiresAttributes,
              .compatibilities, .registeredAt, .registeredBy, .deregisteredAt)'
  )" || die "could not read task definition $task_definition"
  # Without a match the new revision would be identical and the deploy a no-op.
  jq -e --arg image "$IMAGE" 'any(.containerDefinitions[]; .image == $image)' \
    <<<"$definition" >/dev/null ||
    die "no container in $task_definition runs an image from $ECR_REPOSITORY_URI"
  aws ecs register-task-definition --cli-input-json "$definition" \
    --query taskDefinition.taskDefinitionArn --output text
}

# Waits until a service runs the given revision. Polls describe-services instead
# of `aws ecs wait services-stable`, which gives up after 10 minutes and can't
# tell a rollback from a slow rollout. Dies if ECS rolls the service back, marks
# the rollout failed, or it hasn't finished within ROLLOUT_TIMEOUT_SECONDS.
wait_for_rollout() {
  local service="$1" revision="$2" state last="" seen=""
  local deadline=$((SECONDS + ROLLOUT_TIMEOUT_SECONDS))
  while :; do
    state="$(
      aws ecs describe-services --cluster "$ECS_CLUSTER_ARN" --services "$service" \
        --query 'services[0].deployments' |
        jq -r --arg rev "$revision" '
          (map(select(.status == "PRIMARY")) | first) as $primary
          | if $primary == null then "unknown"
            elif $primary.taskDefinition != $rev then
              (if any(.[]; .taskDefinition == $rev) then "rolled-back" else "not-listed" end)
              + " \($primary.taskDefinition)"
            elif $primary.rolloutState == "FAILED" then "failed \($primary.rolloutStateReason // "")"
            elif $primary.rolloutState == "COMPLETED"
              or ($primary.rolloutState == null and length == 1
                  and $primary.runningCount == $primary.desiredCount) then "completed"
            else "running \($primary.runningCount)/\($primary.desiredCount), \($primary.failedTasks) failed"
            end'
    )" || die "could not describe $service"
    case "$state" in
      completed) log "$service is running $revision"; return 0 ;;
      rolled-back*) die "$service was rolled back to ${state#rolled-back } instead of $revision" ;;
      failed*) die "the rollout of $revision on $service failed: ${state#failed }" ;;
      # Right after update-service, a read can still show only the old deployment.
      # Once the revision has been seen, its disappearance means a rollback.
      not-listed*)
        [[ -z "$seen" ]] || die "$service was rolled back to ${state#not-listed } instead of $revision"
        state="waiting for ECS to list $revision" ;;
      running*) seen=1 ;;
    esac
    if [[ "$state" != "$last" ]]; then
      log "$service: $state"
      last="$state"
    fi
    (( SECONDS < deadline )) ||
      die "$service hasn't finished rolling out $revision after ${ROLLOUT_TIMEOUT_SECONDS}s ($state)"
    sleep 15
  done
}

# --- Build --------------------------------------------------------------------

log "Building $IMAGE from $CIAS_WEB_DIR"
log "  API_URL=$API_URL WEBSOCKET_URL=$WEBSOCKET_URL WEB_URL=$WEB_URL"
log "  APP_STAGE=$APP_STAGE SENTRY_ENV=$SENTRY_ENV"
empty=()
for var in "${optional_build_vars[@]}"; do
  [[ -n "${!var:-}" ]] || empty+=("$var")
done
if (( ${#empty[@]} > 0 )); then
  log "  empty: ${empty[*]}"
fi

# --pull: always start from the current base image, not a stale local copy.
build_args=(--pull --platform linux/amd64 --build-arg SOURCE_VERSION="$IMAGE_TAG")
for var in "${required_build_vars[@]}" "${optional_build_vars[@]}"; do
  build_args+=(--build-arg "$var")
done
if [[ -n "${SENTRY_AUTH_TOKEN:-}" ]]; then
  build_args+=(--secret id=sentry_auth_token,env=SENTRY_AUTH_TOKEN)
else
  log "  SENTRY_AUTH_TOKEN is not set, so source maps won't be uploaded to Sentry"
fi
docker build "${build_args[@]}" -t "$IMAGE" "$CIAS_WEB_DIR"

# Check what got baked in before anything leaves this machine.
log "Checking the image"
# Each result gets its own labelled line, so an empty one can't shift the others.
image_check="$(
  docker run --rm --platform linux/amd64 --entrypoint sh -e API_URL "$IMAGE" -c '
    echo "release=$(cat /release-version 2>/dev/null)"
    echo "bundle=$(ls build | grep -E "^main\.[0-9a-f]+\.js$" | head -1)"
    echo "api_url_file=$(grep -rlF "$API_URL" build | head -1)"'
)"
release_version="$(sed -n 's/^release=//p' <<<"$image_check")"
main_bundle="$(sed -n 's/^bundle=//p' <<<"$image_check")"
api_url_file="$(sed -n 's/^api_url_file=//p' <<<"$image_check")"
[[ "$release_version" == "$IMAGE_TAG" ]] ||
  die "/release-version is '$release_version', expected '$IMAGE_TAG'"
[[ -n "$main_bundle" ]] || die "the image has no build/main.<hash>.js"
[[ -n "$api_url_file" ]] || die "API_URL ($API_URL) is not in the bundle"
log "Image OK: release $release_version, bundle $main_bundle"

# --- Push ---------------------------------------------------------------------

log "Pushing $IMAGE"
aws ecr get-login-password |
  docker login --username AWS --password-stdin "${ECR_REPOSITORY_URI%%/*}"
docker push "$IMAGE"

# --- Update service -----------------------------------------------------------

current="$(aws ecs describe-services --cluster "$ECS_CLUSTER_ARN" --services "$WEB_SERVICE_ARN" \
  --query 'services[0].taskDefinition' --output text)"
[[ "$current" == arn:* ]] || die "could not find the task definition for $WEB_SERVICE_ARN"
revision="$(register_revision "$current")"

log "Updating $WEB_SERVICE_ARN from $current to $revision"
aws ecs update-service --cluster "$ECS_CLUSTER_ARN" --service "$WEB_SERVICE_ARN" \
  --task-definition "$revision" >/dev/null

# Logged before waiting, so it's in the output even if the wait times out.
log "To roll back:"
log "  aws ecs update-service --cluster $ECS_CLUSTER_ARN --service $WEB_SERVICE_ARN --task-definition $current"

log "Waiting for the rollout (up to ${ROLLOUT_TIMEOUT_SECONDS}s)"
wait_for_rollout "$WEB_SERVICE_ARN" "$revision"

# --- Verify -------------------------------------------------------------------

if [[ "$VERIFY_WEB_URL" == true ]]; then
  log "Checking that $WEB_URL serves $main_bundle"
  # An old task can keep answering for a moment while it drains.
  served=""
  for attempt in 1 2 3 4 5 6; do
    served="$(curl -fsS "${WEB_URL%/}/" | grep -oE 'main\.[0-9a-f]+\.js' | head -1 || true)"
    [[ "$served" == "$main_bundle" ]] && break
    if (( attempt < 6 )); then sleep 10; fi
  done
  [[ "$served" == "$main_bundle" ]] ||
    die "$WEB_URL serves ${served:-no main bundle} instead of $main_bundle; is it routed to $WEB_SERVICE_ARN?"
fi

log "Deployed $IMAGE"
log "  $revision"
