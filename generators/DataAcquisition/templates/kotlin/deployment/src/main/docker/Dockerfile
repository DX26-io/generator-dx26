FROM openjdk:11-jre-slim

ARG BUILD_VERSION
ARG APP_NAME
ARG ORGANISATION
ARG MAINTAINER

LABEL application=$APP_NAME \
      maintainer=$MAINTAINER \
      buildVersion=$BUILD_VERSION \
      organisation=$ORGANISATION

ENV SERVER_PORT=2025
ENV MONITORING_PORT=2024
ENV JAVA_OPTS=""
ENV CONFIG_LOCATION="classpath:profiles/application-test.yml"

COPY ./application-*.jar /app/application.jar

RUN groupadd -r iamnotroot && useradd -r -g iamnotroot iamnotroot && \
    chown -R iamnotroot:iamnotroot /app && \
    chmod -R 755 /app

WORKDIR /app

EXPOSE $SERVER_PORT
EXPOSE $MONITORING_PORT

VOLUME [ "/app/secrets", "/app/config" ]

USER iamnotroot

ENTRYPOINT java $JAVA_OPTS -jar application.jar --spring.config.location=$CONFIG_LOCATION
