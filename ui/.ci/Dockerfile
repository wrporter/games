###############################################################################
# Build Static Assets
###############################################################################
FROM alpine:3.12 AS static
LABEL maintainer="wesleyrporter@gmail.com"

RUN apk add --no-cache nodejs nodejs-npm

WORKDIR /src

COPY package*.json ./
RUN npm ci --loglevel=warn

COPY tsconfig.json ./
COPY public /src/public/
COPY src /src/src/
RUN npm run ci

###############################################################################
# Build Static Server
###############################################################################
FROM caddy:2-alpine AS server
LABEL maintainer="wesleyrporter@gmail.com"

COPY .ci/Caddyfile /etc/caddy/Caddyfile
COPY --from=static /src/build /var/www/site
