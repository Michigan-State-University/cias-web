# syntax=docker/dockerfile:1.7

# Single web image used by one ECS task definition (cias-web), built ONCE PER ENVIRONMENT:
#   - cias-web:v1.2.3-rc1 → staging URLs baked into the JS bundle at build time
#   - cias-web:v1.2.3     → production URLs baked into the JS bundle at build time
#
# Local dev does NOT use this image — `npm start` with webpack-dev-server handles dev.
#
# Why per-env builds: webpack's Dotenv plugin (with systemvars: true) substitutes env vars
# directly into the JS bundle via DefinePlugin. A bundle built for staging URLs cannot be
# repointed to production without rebuilding. Same constraint as the cias-api migration plan
# §0.3 — chose Option A (separate builds per environment).

ARG NODE_VERSION=22

# ---------- builder ----------
FROM node:${NODE_VERSION}-slim AS builder

WORKDIR /web

# Build-time env vars baked into the JS bundle by webpack's Dotenv plugin.
# CI passes these via --build-arg; values differ per environment.
ARG API_URL
ARG WEBSOCKET_URL
ARG WEB_URL
ARG APP_STAGE
ARG LOGROCKET_ENV
ARG SENTRY_DSN
ARG SENTRY_ENV
ARG SENTRY_AUTH_TOKEN
ARG INTERVENTION_EXPORT_FEATURE_ENABLED
ARG HFHS_INTEGRATION_FEATURE_ENABLED
ARG DISABLED_SMS_CAMPAIGN
ARG ALLOWED_USERS_FOR_SMS_CAMPAIGNS
ARG ADDITIONAL_ORIGIN_SECURE_TOKEN
# SOURCE_VERSION must be set during BUILD — webpack's internals/webpack/utils.js uses it
# both as an `onHeroku` flag and as the commit-hash source in `getCommitHash()`. Without it,
# webpack falls through to GitRevisionPlugin → reads .git → fails (we exclude .git via .dockerignore).
ARG SOURCE_VERSION=unspecified

# Expose ARGs as ENV so webpack-dotenv's systemvars:true picks them up.
ENV API_URL=${API_URL} \
    WEBSOCKET_URL=${WEBSOCKET_URL} \
    WEB_URL=${WEB_URL} \
    APP_STAGE=${APP_STAGE} \
    LOGROCKET_ENV=${LOGROCKET_ENV} \
    SENTRY_DSN=${SENTRY_DSN} \
    SENTRY_ENV=${SENTRY_ENV} \
    SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN} \
    INTERVENTION_EXPORT_FEATURE_ENABLED=${INTERVENTION_EXPORT_FEATURE_ENABLED} \
    HFHS_INTEGRATION_FEATURE_ENABLED=${HFHS_INTEGRATION_FEATURE_ENABLED} \
    DISABLED_SMS_CAMPAIGN=${DISABLED_SMS_CAMPAIGN} \
    ALLOWED_USERS_FOR_SMS_CAMPAIGNS=${ALLOWED_USERS_FOR_SMS_CAMPAIGNS} \
    ADDITIONAL_ORIGIN_SECURE_TOKEN=${ADDITIONAL_ORIGIN_SECURE_TOKEN} \
    SOURCE_VERSION=${SOURCE_VERSION} \
    NODE_ENV=production

# Install dependencies first for layer-cache friendliness.
# patch-package runs in postinstall and needs patches/ available — copy it before npm ci.
# .npmrc carries `legacy-peer-deps=true` — required because npm 10+ is strict about peer deps
# and this codebase has known peer-dep conflicts the team works around via legacy mode.
COPY package.json package-lock.json .npmrc ./
COPY patches/ ./patches/
COPY internals/scripts/npmcheckversion.js ./internals/scripts/npmcheckversion.js
RUN npm ci --prefer-offline --no-audit --progress=false

# Now copy the rest and build
COPY . .

# `npm run build` runs: webpack prod build → postbuild removes *.js.map source maps
RUN npm run build

# ---------- runtime ----------
FROM node:${NODE_VERSION}-slim AS runtime

# Defaults baked into the image; ECS task def can override if ever needed.
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4200

# ALB owns health checks; disable any inherited HEALTHCHECK from the base image
HEALTHCHECK NONE

# Runtime packages:
#   tini → PID 1 signal handling (graceful Express shutdown on ECS task stop)
#   ca-certificates → outbound HTTPS (defensive; small)
RUN apt-get update -qq && apt-get install -y --no-install-recommends \
        ca-certificates \
        tini \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1000 app \
    && useradd  --system --uid 1000 --gid app --create-home --home-dir /home/app app \
    && mkdir -p /web \
    && chown -R app:app /web

WORKDIR /web

# Production-only deps (no dev deps in runtime). patches/ is needed because
# postinstall runs patch-package again — keep it consistent with builder.
# .npmrc carries `legacy-peer-deps=true`, same as builder stage.
COPY --chown=app:app package.json package-lock.json .npmrc ./
COPY --chown=app:app patches/ ./patches/
COPY --chown=app:app internals/scripts/npmcheckversion.js ./internals/scripts/npmcheckversion.js
RUN npm ci --omit=dev --prefer-offline --no-audit --progress=false \
    && npm cache clean --force

# Built SPA assets + Express server source
COPY --from=builder --chown=app:app /web/build ./build
COPY --chown=app:app server/ ./server/

# Bake the release tag into the image for traceability.
# SOURCE_VERSION was declared in the builder stage (needed by webpack/utils.js); re-declare
# here to make it available to runtime ENV. Inspect via `cat /release-version` at runtime.
ARG SOURCE_VERSION=unspecified
ENV SOURCE_VERSION=${SOURCE_VERSION}
RUN echo "${SOURCE_VERSION}" > /release-version

USER app

EXPOSE 4200

# CMD bypasses `npm run start:prod` (which uses cross-env, a devDependency we strip out).
# NODE_ENV is already set via ENV above. `node server` resolves to server/index.js.
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server"]
