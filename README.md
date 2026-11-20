# Biobank Portal

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
- Frontend: Vue 3, Vite, TypeScript (planned)
- Database: PostgreSQL

## Repository layout

| Folder      | Contents                                                        |
|-------------|-----------------------------------------------------------------|
| `backend/`  | Spring Boot REST API (Maven project)                            |
| `frontend/` | Vue 3 web client (planned, currently empty)                     |
| `deploy/`   | Kubernetes manifests and Kustomize overlays (planned)           |
| `docs/`     | Architecture and design decisions                               |

## Getting started

### Prerequisites

- Java 25
- Maven 3.9+
- Docker (Testcontainers starts PostgreSQL for tests and local runs)
- Node.js LTS (for the frontend, once it exists)

### Backend

```sh
cd backend
mvn verify                 # build and run the tests
mvn spring-boot:test-run   # run the app locally with a throwaway PostgreSQL
```

### Frontend

Coming soon.

### Deployment

Coming soon.

## Documentation

Architecture and design decisions are in [`docs/`](docs/).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[GNU Affero General Public License v3.0](LICENSE)
