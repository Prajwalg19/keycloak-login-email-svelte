# acme/keycloak — Keycloak with the custom Acme login theme baked in.
#
# Stage 1: build the keycloakify theme JAR from the Svelte/Vite source.
# Stage 2: copy it into a stock Keycloak image and configure the theme
#          as the default for the acme realm.
#
# Build:
#   docker build -t acme/keycloak:<ver> .
#
# Run:
#   docker run -p 8080:8080 acme/keycloak:<ver>  # plus usual Keycloak env
# ============================================================================

ARG KEYCLOAK_VERSION=26.6.1

# ---- Stage 1: theme build -------------------------------------------------
#
# Keycloakify's `build-keycloak-theme` script produces a Java .jar via
# Maven (Keycloak themes are packaged as JARs). Alpine's default image
# has neither JDK nor Maven, so install both.
FROM node:20-alpine AS theme-builder
WORKDIR /build

# Install deps first so they cache across source changes.
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN apk add --no-cache openjdk17-jre-headless maven curl && \
    (npm ci --ignore-scripts || npm install --ignore-scripts)

# Source + build. keycloakify emits build_dist_keycloak/*.jar.
COPY . .
RUN npm run postinstall && npm run build-keycloak-theme

# The keycloakify build emits JARs under build_dist_keycloak/. We want the one
# Keycloak >= 22 can consume (the *-keycloak-22.jar / *-keycloak-all-other-versions.jar
# suffix depends on keycloakify version; pick the newest).
ARG WEBHOOK_VERSION=0.10.0-rc.1
RUN mkdir -p /out/plugins && \
    curl -sL -o /out/plugins/keycloak-webhook-provider-core.jar https://github.com/vymalo/keycloak-webhook/releases/download/v${WEBHOOK_VERSION}/keycloak-webhook-provider-core-${WEBHOOK_VERSION}-all.jar && \
    curl -sL -o /out/plugins/keycloak-webhook-provider-amqp.jar https://github.com/vymalo/keycloak-webhook/releases/download/v${WEBHOOK_VERSION}/keycloak-webhook-provider-amqp-${WEBHOOK_VERSION}-all.jar && \
    curl -sL -o /out/plugins/keycloak-webhook-provider-http.jar https://github.com/vymalo/keycloak-webhook/releases/download/v${WEBHOOK_VERSION}/keycloak-webhook-provider-http-${WEBHOOK_VERSION}-all.jar && \
    curl -sL -o /out/plugins/keycloak-webhook-provider-syslog.jar https://github.com/vymalo/keycloak-webhook/releases/download/v${WEBHOOK_VERSION}/keycloak-webhook-provider-syslog-${WEBHOOK_VERSION}-all.jar && \
    cp $(ls -t build_dist_keycloak/*.jar | head -n 1) /out/acme-theme.jar

# ---- Stage 2: Keycloak image with theme ----------------------------------
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} AS keycloak

COPY --from=theme-builder /out/acme-theme.jar /opt/keycloak/providers/
# Copy the webhook plugin JARs
COPY --from=theme-builder /out/plugins/*.jar /opt/keycloak/providers/

# Bake the cache-cluster Infinispan config the drumbeat-managed cluster
# needs at build time. Required because:
#   - JDBC_PING (used by drumbeat for cluster discovery in
#     /opt/keycloak/conf/cache-ispn.xml) is incompatible with the
#     default mode=ispn cache stack — Keycloak must be told at build
#     time to read its cache config from a file.
#   - kc.http-relative-path=/auth is the legacy path many client
#     libraries still hard-code (Keycloak 17+ removed it as default).
#     `start --optimized` refuses to override build-time options at
#     runtime, so previously every drumbeat deploy logged a warning
#     loop and exited code 2 because the persisted (build-time) value
#     differed from the keycloak.conf override.
# Same `kc.sh build` flags must match what /etc/keycloak/keycloak.conf
# sets — drumbeat's role pins them via runtime config that is now
# consistent with this build.
# --features=organization: Keycloak Organizations (GA in KC 26) is OFF by
# default and is a BUILD-TIME feature — it must be baked in here because
# drumbeat runs `start --optimized`, which refuses to enable features at
# runtime (a KC_FEATURES env is ignored under --optimized). Burrow's post-A3
# SaaS model creates every tenant as a KC Organization in the shared apps
# realm, so the org-management API must be present in the image.
RUN /opt/keycloak/bin/kc.sh build \
      --db=postgres \
      --http-relative-path=/auth \
      --cache=ispn \
      --cache-config-file=cache-ispn.xml \
      --health-enabled=true \
      --metrics-enabled=true \
      --features=organization

# Theme gets selected per-realm by drumbeat at realm-creation time (KC_SPI_THEME_DEFAULT
# would make it the GLOBAL default; prefer per-realm so non-acme realms stay
# on the stock theme).
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--optimized"]
