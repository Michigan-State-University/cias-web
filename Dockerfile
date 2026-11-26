# syntax=docker/dockerfile:1.7

# cias-web image, built once per environment: webpack bakes API_URL, WEB_URL and
# the feature flags into the JS bundle, so an image only works in the environment
# it was built for. deploy/deploy-web.sh builds and deploys it; local dev uses
# `npm start`.

# The base image is pinned by digest and updated by Dependabot, which can't read
# image names built from ARGs.

# ---------- builder ----------
FROM node:22-bookworm-slim@sha256:e9f565d32859f0cbfb52125eafe8be39390f24dac302dc3cdf566e8ba3ab21ee AS builder

# sentry-cli's source-map upload (in `npm run build`) verifies TLS against the
# system CA bundle, which node:*-slim doesn't ship.
RUN apt-get update -qq && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /web

# patch-package runs in postinstall, so patches/ must be in place before npm ci.
# .npmrc sets legacy-peer-deps=true, which npm ci needs for this dependency tree.
# NODE_ENV stays unset: with NODE_ENV=production `npm ci` skips devDependencies,
# so the patch-package postinstall fails. The build script sets NODE_ENV itself.
COPY package.json package-lock.json .npmrc ./
COPY patches/ ./patches/
COPY internals/scripts/npmcheckversion.js ./internals/scripts/npmcheckversion.js
RUN npm ci --prefer-offline --no-audit --progress=false

# The build configuration comes after npm ci: every build has its own values, and
# declaring them earlier would make the dependency layer uncacheable.
ARG API_URL
ARG WEBSOCKET_URL
ARG WEB_URL
ARG APP_STAGE
ARG LOGROCKET_ENV
ARG SENTRY_DSN
ARG SENTRY_ENV
ARG INTERVENTION_EXPORT_FEATURE_ENABLED
ARG HFHS_INTEGRATION_FEATURE_ENABLED
ARG DISABLED_SMS_CAMPAIGN
ARG ALLOWED_USERS_FOR_SMS_CAMPAIGNS
# internals/webpack/utils.js needs SOURCE_VERSION for the commit hash; without it
# webpack falls back to reading .git, which .dockerignore excludes.
ARG SOURCE_VERSION=unspecified

# webpack's Dotenv plugin (systemvars) reads these from the environment.
ENV API_URL=${API_URL} \
    WEBSOCKET_URL=${WEBSOCKET_URL} \
    WEB_URL=${WEB_URL} \
    APP_STAGE=${APP_STAGE} \
    LOGROCKET_ENV=${LOGROCKET_ENV} \
    SENTRY_DSN=${SENTRY_DSN} \
    SENTRY_ENV=${SENTRY_ENV} \
    INTERVENTION_EXPORT_FEATURE_ENABLED=${INTERVENTION_EXPORT_FEATURE_ENABLED} \
    HFHS_INTEGRATION_FEATURE_ENABLED=${HFHS_INTEGRATION_FEATURE_ENABLED} \
    DISABLED_SMS_CAMPAIGN=${DISABLED_SMS_CAMPAIGN} \
    ALLOWED_USERS_FOR_SMS_CAMPAIGNS=${ALLOWED_USERS_FOR_SMS_CAMPAIGNS} \
    SOURCE_VERSION=${SOURCE_VERSION}

COPY . .

# SENTRY_AUTH_TOKEN arrives as a BuildKit secret, so it never lands in the image.
# Without it the source-map upload is skipped and the build still succeeds.
RUN --mount=type=secret,id=sentry_auth_token \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token 2>/dev/null || true)" npm run build

# Keep only production dependencies, with the patches already applied.
RUN npm prune --omit=dev

# ---------- runtime ----------
FROM node:22-bookworm-slim@sha256:e9f565d32859f0cbfb52125eafe8be39390f24dac302dc3cdf566e8ba3ab21ee AS runtime

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4200

# The ALB does the health checks.
HEALTHCHECK NONE

# tini runs as PID 1: it passes an ECS task stop's SIGTERM on to node, which exits
# right away (server/ has no shutdown handler), and it reaps zombie processes.
# upgrade: Debian fixes released since the pinned base image was built.
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        tini \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /web

# Everything stays owned by root: the server only reads these files, so the node
# user can't change the code or the bundle it serves.
# Reuse the builder's pruned, patched node_modules: running npm ci here would run
# the patch-package postinstall without patch-package installed.
COPY --from=builder /web/node_modules ./node_modules
COPY --from=builder /web/package.json /web/package-lock.json ./
COPY --from=builder /web/build ./build
COPY server/ ./server/

# The release tag, readable at runtime with `cat /release-version`.
ARG SOURCE_VERSION=unspecified
ENV SOURCE_VERSION=${SOURCE_VERSION}
RUN echo "${SOURCE_VERSION}" > /release-version

# The node image's built-in non-root user (UID/GID 1000); creating another would
# clash on GID 1000.
USER node

EXPOSE 4200

# Runs the server directly rather than through `npm run start:prod`; NODE_ENV is
# set above.
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server"]
