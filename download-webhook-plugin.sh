#!/bin/bash
set -e

VERSION="${1:-0.10.0-rc.1}"
PLUGINS_DIR="plugins"

mkdir -p "$PLUGINS_DIR"
cd "$PLUGINS_DIR"

echo "Downloading Keycloak Webhook Plugin version v${VERSION}..."

curl -L -o keycloak-webhook-provider-core.jar "https://github.com/vymalo/keycloak-webhook/releases/download/v${VERSION}/keycloak-webhook-provider-core-${VERSION}-all.jar"
curl -L -o keycloak-webhook-provider-amqp.jar "https://github.com/vymalo/keycloak-webhook/releases/download/v${VERSION}/keycloak-webhook-provider-amqp-${VERSION}-all.jar"
curl -L -o keycloak-webhook-provider-http.jar "https://github.com/vymalo/keycloak-webhook/releases/download/v${VERSION}/keycloak-webhook-provider-http-${VERSION}-all.jar"
curl -L -o keycloak-webhook-provider-syslog.jar "https://github.com/vymalo/keycloak-webhook/releases/download/v${VERSION}/keycloak-webhook-provider-syslog-${VERSION}-all.jar"

echo "Done! The JARs have been downloaded to the '${PLUGINS_DIR}' directory."
