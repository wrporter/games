#!/usr/bin/env bash

source .ci/config.sh

docker run \
	--rm \
	--name=${APP_NAME} \
	-v ${PWD}/caddy_data:/data \
	-v ${PWD}/caddy_config:/config \
	-p 3019:80 \
	${TARGET_IMAGE}:${VERSION}
