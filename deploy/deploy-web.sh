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
# Every setting below can be overridden by an environment variable of the same
# name. The build configuration has no defaults: it must come from the target
# environment. Run by .github/workflows/deploy-web.yml; can also be run by hand.
#
# Requires aws (v2), docker, jq, git and curl. The AWS caller needs:
#   - ecr:GetAuthorizationToken, and push access to the ECR repository
#   - ecs:DescribeServices, ecs:DescribeTaskDefinition,
#     ecs:RegisterTaskDefinition, ecs:UpdateService
#   - iam:PassRole on the execution and task roles of the web task definition

set -euo pipefail

# --- Config -------------------------------------------------------------------

AWS_REGION="${AWS_REGION:-us-east-2}"
ECR_REPOSITORY_URI="${ECR_REPOSITORY_URI:-905418359193.dkr.ecr.us-east-2.amazonaws.com/cias-web}"
ECS_CLUSTER_ARN="${ECS_CLUSTER_ARN:-arn:aws:ecs:us-east-2:905418359193:cluster/cias-test}"
WEB_SERVICE_ARN="${WEB_SERVICE_ARN:-arn:aws:ecs:us-east-2:905418359193:service/cias-test/cias-test-web}"
IMAGE_TAG_PREFIX="${IMAGE_TAG_PREFIX:-test}"
# After deploying, check that WEB_URL serves this image's bundle. Set to false
# while WEB_URL still points elsewhere, e.g. at Dokku before the DNS cutover.
VERIFY_WEB_URL="${VERIFY_WEB_URL:-true}"

# Build configuration, read from the environment and baked into the bundle.
# Required: API_URL (https://...), WEBSOCKET_URL (wss://<api host>/cable),
# WEB_URL (https://...), APP_STAGE (dev or prod) and SENTRY_ENV.
required_build_vars=(API_URL WEBSOCKET_URL WEB_URL APP_STAGE SENTRY_ENV)
# Optional, but empty is not neutral: it disables LogRocket, Sentry and the
# feature flags, and an empty DISABLED_SMS_CAMPAIGN enables SMS campaigns for
# everyone. Carry each environment's values over.
optional_build_vars=(LOGROCKET_ENV SENTRY_DSN INTERVENTION_EXPORT_FEATURE_ENABLED
  HFHS_INTEGRATION_FEATURE_ENABLED DISABLED_SMS_CAMPAIGN
  ALLOWED_USERS_FOR_SMS_CAMPAIGNS ADDITIONAL_ORIGIN_SECURE_TOKEN)
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
# The app only recognises these two; "production" would silently act as neither.
[[ "$APP_STAGE" == dev || "$APP_STAGE" == prod ]] || die "APP_STAGE must be dev or prod"
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
if [[ -n "$(git -C "$CIAS_WEB_DIR" status --porcelain)" ]]; then
  die "$CIAS_WEB_DIR has uncommitted changes; commit or stash them first"
fi
if [[ -z "$IMAGE_TAG" ]]; then
  IMAGE_TAG="$(git -C "$CIAS_WEB_DIR" rev-parse --short=8 HEAD)"
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
  )"
  # Without a match the new revision would be identical and the deploy a no-op.
  jq -e --arg image "$IMAGE" 'any(.containerDefinitions[]; .image == $image)' \
    <<<"$definition" >/dev/null ||
    die "no container in $task_definition runs an image from $ECR_REPOSITORY_URI"
  aws ecs register-task-definition --cli-input-json "$definition" \
    --query taskDefinition.taskDefinitionArn --output text
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

build_args=(--platform linux/amd64 --build-arg SOURCE_VERSION="$IMAGE_TAG")
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
image_check="$(
  docker run --rm --platform linux/amd64 --entrypoint sh -e API_URL "$IMAGE" -c '
    cat /release-version
    ls build | grep -E "^main\.[0-9a-f]+\.js$" | head -1
    grep -rlF "$API_URL" build | head -1'
)"
release_version="$(sed -n 1p <<<"$image_check")"
main_bundle="$(sed -n 2p <<<"$image_check")"
api_url_file="$(sed -n 3p <<<"$image_check")"
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

log "Waiting for the service to stabilize"
aws ecs wait services-stable --cluster "$ECS_CLUSTER_ARN" --services "$WEB_SERVICE_ARN"

# services-stable also returns after the deployment circuit breaker has rolled
# the service back, so check it really settled on the new revision.
running="$(aws ecs describe-services --cluster "$ECS_CLUSTER_ARN" --services "$WEB_SERVICE_ARN" \
  --query 'services[0].taskDefinition' --output text)"
[[ "$running" == "$revision" ]] ||
  die "the service settled on $running instead of $revision (rolled back?)"

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
