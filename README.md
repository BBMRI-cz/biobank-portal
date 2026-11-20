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
- Frontend: Vue 3, Vite, TypeScript, Vue Router, Pinia, PrimeVue
- Database: PostgreSQL

## Repository layout

| Folder      | Contents                                                        |
|-------------|-----------------------------------------------------------------|
| `backend/`  | Spring Boot REST API (Maven project)                            |
| `frontend/` | Vue 3 web client                                                |
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

## Documentation

Architecture and design decisions are in [`docs/`](docs/).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[GNU Affero General Public License v3.0](LICENSE)
