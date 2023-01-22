_Unofficial PocketBase SaaS backend prepared for secure kubernetes deployment_

# PocketBase Kubernetes-ready OCI

PocketBase is an open-source backend consisting of an embedded database (SQLite) with real-time subscriptions, and
built-in auth management, convenient dashboard UI and simple REST-ish API. This image provides PocketBase in a secure
Kubernetes-ready manner using Alpine and non-root user.

PocketBase does not have a High-Availability or Horizontal scaling supported, therefore the main use-case here is to
deploy a single container besides your application and use it as your lightweight SaaS backend.

## Features

- Multi-arch image for x86 and ARM environments
- Non-root user to mitigate potential vulnerabilities
- Shared data path through environment variables
- Automatic encryption secret generation

## Quick start

```bash
docker run -p 8080:8080 -e POCKET_SECRET="secret-of-32-length" adaliszk/pocketbase
```

## Configuration

The image uses the PocketBase binary as its entrypoint with a slight layer in front that allows a couple of variables to
be set instead of command-line arguments:

| Variable        | Overwrites       | Default           |
|:----------------|:-----------------|:------------------|
| `DATA_DIR`      | `--dir`          | `/data/database`  |
| `MIGRATION_DIR` | `--migrationDir` | `/data/migration` |
| `PUBLIC_DIR`    | `--publicDir`    | `/data/static`    |

By default, the serve command will be executed with `--http=0.0.0.0:8080` arguments.
