# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:24.22.3-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5
ARG MAVEN_IMAGE=maven:3.10.0-eclipse-temurin-25-noble@sha256:e3760e0213ee8274e8b7926e5ecfcbabcbef93414c5561c4ecb657e435865329
ARG JRE_IMAGE=eclipse-temurin:25.0.5.1_2-jre-noble@sha256:2ec98aa522c472deadfd2b7c5b39bca680e33ef522a53a72f10789bdf89a6bb5

FROM ${NODE_IMAGE} AS frontend-build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY frontend/ ./
ENV VITE_API_BASE_URL=/api
RUN npm run build-only

FROM ${MAVEN_IMAGE} AS backend-build
WORKDIR /app/backend

COPY backend/pom.xml ./
RUN mvn -B -ntp -q dependency:go-offline

COPY backend/src/main ./src/main
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN mvn -B -ntp -q package -Dmaven.test.skip=true \
 && cp target/*.jar /app/app.jar

FROM ${JRE_IMAGE}

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
