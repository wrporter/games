#!/usr/bin/env bash

source .ci/config.sh

docker run \
	--rm \
	--name=${APP_NAME} \
	-v ${PWD}/caddy_data:/data \
	-p 3019:80 \
	-p 3020:443 \
	${TARGET_IMAGE}:${VERSION}
