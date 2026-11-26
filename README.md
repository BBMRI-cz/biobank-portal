# Biobank Portal

[![CI](https://github.com/BBMRI-cz/biobank-portal/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/BBMRI-cz/biobank-portal/actions/workflows/ci.yml)

A web portal for managing sensitive data in biobanks of BBMRI.cz, the Czech node
of BBMRI-ERIC. Each biobank runs in its own isolated instance on Kubernetes
(CERIT-SC SensitiveCloud). The portal brings the biobank's tools together under
one login: integration of BBMRI services (FHIR module, Bridgehead, Data Quality
Framework), upload and management of datasets, and later an AI assistant.

## Status

Early development. The project is part of a diploma thesis at the Faculty of
Informatics, Masaryk University, in collaboration with BBMRI.cz.

## Tech stack

- Backend: Java 25, Spring Boot 4.1.x
- Frontend: React 19, Vite, TypeScript, React Router, TanStack Query, Zod, Tailwind CSS, shadcn/ui
- Database: PostgreSQL

## Repository layout

| Folder      | Contents                                                        |
|-------------|-----------------------------------------------------------------|
| `backend/`  | Spring Boot REST API (Maven project)                            |
| `frontend/` | React web client                                                |
| `deploy/`   | Kubernetes manifests and Kustomize overlays (planned)           |
| `docs/`     | Architecture and design decisions                               |

## Getting started

### Prerequisites

- Java 25
- Maven 3.9+
- Docker (Testcontainers starts PostgreSQL for tests and local runs)
- Node.js 24 (see `.nvmrc`)

### Backend

```sh
cd backend
mvn verify                 # build and run the tests
mvn spring-boot:test-run   # run the app locally with a throwaway PostgreSQL
mvn fmt:format             # format Java code
```

### Frontend

```sh
cd frontend
cp .env.example .env.local   # then set the backend API address
npm install
npm run dev                  # dev server on http://localhost:5173
npm test                     # unit tests (Vitest)
npm run lint                 # ESLint + Oxlint
npm run format               # Prettier
npm run build                # type-check and production build
```

### Deployment

Coming soon.

## Container image

The backend and frontend ship as one image, `ghcr.io/bbmri-cz/biobank-portal`.
The [`Dockerfile`](Dockerfile) builds the React app, bundles it into the Spring
Boot jar as static resources and runs it on a JRE as a non-root user
(uid 1001) on port 8080. The backend serves the app, its client-side routes
and the API (`/api`) from the same origin.

The [CI/CD pipeline](.github/workflows/ci.yml) publishes the image on every
push to `master` and on every release tag `vX.Y.Z`, after the tests pass
(pull requests only build it). Tags are the full commit SHA, plus `X.Y.Z` for
releases. `latest` is never published, so always deploy a specific tag. Base
images are pinned by digest in the `Dockerfile`.

Images are signed with Cosign (keyless); verify a signature with:

```sh
cosign verify ghcr.io/bbmri-cz/biobank-portal:<tag> \
  --certificate-identity-regexp '^https://github.com/BBMRI-cz/biobank-portal/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

Build and run locally (from the repository root):

```sh
docker build -t biobank-portal:local .
docker run --rm -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/portal \
  -e SPRING_DATASOURCE_USERNAME=portal -e SPRING_DATASOURCE_PASSWORD=portal \
  biobank-portal:local
```

## Documentation

Architecture and design decisions are in [`docs/`](docs/).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[GNU Affero General Public License v3.0](LICENSE)
