#!/usr/bin/env bash

# First run .ci/build.sh to build the image before release.

set -e
source .ci/config.sh

BASE_SERVER_PATH=/home/x-wing/www/
SSH_USERNAME=x-wing
SERVER=x-wing

scp $(pwd)/.ci/docker-compose.yml ${SSH_USERNAME}@${SERVER}:${BASE_SERVER_PATH}${APP_NAME}/docker-compose.yml

docker save -o $(pwd)/${APP_NAME}.tar "${TARGET_IMAGE}:latest"

scp $(pwd)/${APP_NAME}.tar ${SSH_USERNAME}@${SERVER}:${BASE_SERVER_PATH}${APP_NAME}.tar
rm -f $(pwd)/${APP_NAME}.tar

ssh ${SSH_USERNAME}@${SERVER} "docker rm -f ${APP_NAME} || true"
ssh ${SSH_USERNAME}@${SERVER} "docker load -i ${BASE_SERVER_PATH}${APP_NAME}.tar"
ssh ${SSH_USERNAME}@${SERVER} "rm -f ${BASE_SERVER_PATH}${APP_NAME}.tar"
ssh ${SSH_USERNAME}@${SERVER} "cd ${BASE_SERVER_PATH}${APP_NAME} && docker-compose up --detach --build ${APP_NAME}"
