# Contributing

Thanks for contributing to the Biobank Portal. This document describes how we
work with branches, commits and pull requests.

## Workflow in short

1. Open (or pick) an issue that describes the change.
2. Create a branch from `master` (see naming below).
3. Commit in small, focused steps using Conventional Commits.
4. Open a pull request against `master`, fill in the template, link the issue.
5. Get at least one approving review and a green CI run.
6. Squash-merge; the branch is deleted after merging.

`master` is protected: no direct pushes, no force pushes.

## Branch naming

```
<type>/<issue-number>-<short-description>
```

- `type` – one of the commit types below (`feat`, `fix`, `docs`, `chore`, …)
- `issue-number` – the GitHub issue the branch addresses (omit if there is none)
- `short-description` – lowercase, words separated by hyphens

Examples:

```
feat/12-sample-search-endpoint
fix/34-null-biobank-name
docs/architecture-overview
chore/upgrade-spring-boot
```

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <summary>

<optional body: what and why, wrapped at 72 characters>

<optional footer: Closes #123, BREAKING CHANGE: …>
```

**Types**

| Type       | Use for                                              |
|------------|------------------------------------------------------|
| `feat`     | a new feature                                        |
| `fix`      | a bug fix                                            |
| `docs`     | documentation only                                   |
| `refactor` | code change that neither fixes a bug nor adds a feature |
| `test`     | adding or fixing tests                               |
| `build`    | build system or dependencies (Maven, npm)            |
| `ci`       | CI configuration                                     |
| `chore`    | other maintenance (config, tooling)                  |
| `perf`     | performance improvement                              |

**Scopes** (optional): `backend`, `frontend`, `docs`, or a narrower module name.

**Rules**

- Summary in the imperative mood ("add", not "added"/"adds"), no trailing
  period, at most ~72 characters.
- One logical change per commit.
- Reference issues in the footer (`Closes #12`).
- Mark breaking changes with `!` after the type (`feat(backend)!: …`) and a
  `BREAKING CHANGE:` footer.

Examples:

```
feat(backend): add endpoint for listing biobanks
fix(frontend): show error when search request times out
docs: describe Beam query flow
```

## Pull requests

- Target `master`. Keep PRs small and focused; split large changes.
- Title follows the commit message format – it becomes the squash commit.
- Fill in the PR template: what changed, why, how it was tested, linked issue.
- **Review:** at least one approving review is required before merging. The
  author does not approve their own PR. Resolve all review conversations
  before merging.
- **CI:** the `CI result` check (build, tests, linting, formatting) must pass. Do not merge a red
  build; fix it or ask for help.
- Keep the branch up to date with `master` (rebase or merge) before merging.
- Update documentation (`README.md`, `docs/`) when behaviour or setup changes.
- Never commit secrets (tokens, passwords, kubeconfigs, `.env` files).

## Code style

- Backend: code is formatted with google-java-format via the
  [fmt-maven-plugin](https://github.com/spotify/fmt-maven-plugin). Run
  `mvn fmt:format` in `backend/` before committing; `mvn fmt:check` verifies
  it. Add tests for new behaviour (`mvn verify` must pass).
- Frontend: conventions will be added once the stack is set up.

## Reporting bugs and requesting features

Use the issue templates on GitHub (**New issue → Bug report / Feature
request**).
