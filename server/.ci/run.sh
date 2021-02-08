#!/usr/bin/env bash

source .ci/config.sh

docker run \
	--rm \
	--name=${APP_NAME} \
	-e GOOGLE_OAUTH_CLIENT_ID="${GOOGLE_OAUTH_CLIENT_ID}" \
	-e GOOGLE_OAUTH_CLIENT_SECRET="${GOOGLE_OAUTH_CLIENT_SECRET}" \
	-e APP_HOST= \
	-p ${PORT}:${PORT} \
	${TARGET_IMAGE}:${VERSION}
