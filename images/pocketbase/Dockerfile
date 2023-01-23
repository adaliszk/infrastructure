FROM alpine:3.17 as pocketbase-binary
ARG PKG_MIRROR="https://github.com/pocketbase/pocketbase/releases/download"
ARG PKG_VERSION="0.11.3"
ARG TARGETPLATFORM

RUN apk --no-cache add 'wget>=1.21.3-r2' 'unzip>=6.0-r13' 'bash>=5.2.15-r0'
SHELL ["/bin/bash", "-c"]

RUN export ARCH="${TARGETPLATFORM/\//_}" && export ARCH="${ARCH/\/v7/v7}" \
 && wget -O /tmp/pocketbase.zip ${PKG_MIRROR}/v${PKG_VERSION}/pocketbase_${PKG_VERSION}_${ARCH}.zip \
 && unzip /tmp/pocketbase.zip -d /opt \
 && chmod +x /opt/pocketbase



FROM alpine:3.17 as livestream-binary
ARG LIVESTREAM_MIRROR="https://github.com/benbjohnson/litestream/releases/download"
ARG LIVESTREAM_VERSION="0.3.9"
ARG TARGETPLATFORM

RUN apk --no-cache add 'wget>=1.21.3-r2' 'unzip>=6.0-r13' 'bash>=5.2.15-r0'
SHELL ["/bin/bash", "-c"]

RUN export ARCH="${TARGETPLATFORM/\//_}" && export ARCH="${ARCH/\/v7/v7}" \
 && wget -O /tmp/pocketbase.zip ${PKG_MIRROR}/v${PKG_VERSION}/pocketbase_${PKG_VERSION}_${ARCH}.zip \
 && unzip /tmp/pocketbase.zip -d /opt \
 && chmod +x /opt/pocketbase



FROM alpine:3.17 as pocketbase
RUN apk --no-cache add 'bash>=5.2.15-r0'

COPY --from=pocketbase-binary --chown=1001 /opt/pocketbase /opt/pocketbase

ARG PKG_VERSION="0.11.3"
ENV DATA_DIR="/data/database" \
    MIGRATION_DIR="/data/migration" \
    PUBLIC_DIR="/data/static" \
    POCKET_VERSION="${PKG_VERSION}"

COPY docker-entrypoint.sh /pocketbase
RUN addgroup --gid 1001 oci && adduser --uid 1001 --shell /bin/bash -G oci -S oci \
 && mkdir -p /data && chown 1001 -R /data \
 && ln -s /pocketbase /usr/local/bin/pocketbase \
 && chmod +x /pocketbase

ARG TIMESTAMP
ARG PKG_VERSION
ARG PKG_DESCRIPTION
ARG PKG_AUTHOR
ARG PKG_LICENSE
ARG PKG_HOMEPAGE
ARG PKG_REPOSITORY
ARG REF
LABEL \
  org.opencontainers.image.created="${TIMESTAMP}" \
  org.opencontainers.image.title="${PKG_DESCRIPTION}" \
  org.opencontainers.image.description="${PKG_DESCRIPTION}" \
  org.opencontainers.image.authors="${PKG_AUTHOR}" \
  org.opencontainers.image.license="${PKG_LICENSE}" \
  org.opencontainers.image.url="${PKG_HOMEPAGE}" \
  org.opencontainers.image.documentation="${PKG_HOMEPAGE}" \
  org.opencontainers.image.source="${PKG_REPOSITORY}" \
  org.opencontainers.image.version="${PKG_VERSION}" \
  org.opencontainers.image.revision="${REF}" \
  org.opencontainers.image.vendor="AdaLiszk"

EXPOSE 8080
VOLUME ["/data"]
ENTRYPOINT ["pocketbase"]
CMD ["serve", "--http=0.0.0.0:8080"]
USER 1001