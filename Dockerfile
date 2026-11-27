# syntax=docker/dockerfile:1

FROM node:26.13.1-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS frontend-build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY frontend/ ./
ENV VITE_API_BASE_URL=/api
RUN npm run build-only

FROM maven:3-eclipse-temurin-26-noble@sha256:69a6c37f0a91fca2c9d0cdd684c9c0ea7b1bc00d4196749c24440b2e02ad163d AS backend-build
WORKDIR /app/backend

COPY backend/pom.xml ./
RUN mvn -B -ntp -q dependency:go-offline

COPY backend/src/main ./src/main
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN mvn -B -ntp -q package -Dmaven.test.skip=true \
 && cp target/*.jar /app/app.jar

FROM eclipse-temurin:26.0.2.1_1-jre-noble@sha256:adfd44c114916dc79fa9a24087fbac34252096edb9892d1c2d9d82db3f8947b3

ARG VERSION=dev
ARG REVISION=unknown
LABEL org.opencontainers.image.title="biobank-portal" \
      org.opencontainers.image.source="https://github.com/BBMRI-cz/biobank-portal" \
      org.opencontainers.image.licenses="AGPL-3.0-only" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${REVISION}"

RUN groupadd --system --gid 1001 app \
 && useradd --system --uid 1001 --gid app --no-create-home --shell /usr/sbin/nologin app

WORKDIR /app
COPY --from=backend-build /app/app.jar ./app.jar

USER 1001:1001
EXPOSE 8080
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
