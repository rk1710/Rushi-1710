#!/bin/bash
set -euo pipefail

DOCKER_IMAGE="$1"
IMAGE_TAG="$2"
YAML_FILE="deploy.yml"

cd menifest

# Set correct Git remote
git remote set-url origin git@github.com:TahaRamkda/menifest.git

# Update the image tag in the YAML
sed -i "s|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:${IMAGE_TAG}|" "$YAML_FILE"

# Git commit and push
git config user.name "jenkins"
git config user.email "jenkins@ci.local"
git commit -am "Update image tag to ${IMAGE_TAG}"
git push origin main
