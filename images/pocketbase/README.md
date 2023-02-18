[![Docker Pulls](https://img.shields.io/docker/pulls/adaliszk/pocketbase?label=Docker%20Pulls&style=for-the-badge)](https://hub.docker.com/r/adaliszk/valheim-server)
![Docker Stars](https://img.shields.io/docker/stars/adaliszk/pocketbase?style=for-the-badge)
[![Image Size](https://img.shields.io/docker/image-size/adaliszk/pocketbase/latest?label=Image%20Size&style=for-the-badge)](https://hub.docker.com/r/adaliszk/valheim-server)
![GitHub issues by-label](https://img.shields.io/github/issues/adaliszk/infrastructure/pocketbase?label=Issues&style=for-the-badge)

_Unofficial PocketBase SaaS backend prepared for secure kubernetes deployment_

# PocketBase Kubernetes-ready OCI

[PocketBase](https://github.com/pocketbase/pocketbase) is an open-source backend consisting of an embedded database
(SQLite) with real-time subscriptions, and built-in auth management, convenient dashboard UI and simple REST-ish API.
This image provides PocketBase in a secure Kubernetes-ready manner using Alpine and non-root user.

PocketBase does not have a High-Availability or Horizontal scaling supported, therefore the main use-case here is to
deploy a single container besides your application and use it as your lightweight SaaS backend.

## Features

- Multi-arch image for x86 and ARM environments
- Non-root user to mitigate potential vulnerabilities
- Shared data path through environment variables
- Automatic encryption secret generation

# Quick start

![Quick Start Intro](https://github.com/adaliszk/infrastructure/blob/main/images/pocketbase/intro.gif?raw=true)

Docker-Compose (recommended):

```yaml
version: "3.8"
services:
  pocketbase:
    image: adaliszk/pocketbase
    ports:
      - "8080:8080"
```

or Docker CLI:

```bash
docker run -p 8080:8080 adaliszk/pocketbase
```

# Supported Architectures

The image utilises the docker manifest for multi-platform awareness, therefore, the main tags will retrieve the correct
platform image without needing to specify your platform.

| Architecture | Available | Tag                     |
|:-------------|:----------|:------------------------|
| x86-64       | ✅         | `<version>` or `latest` |
| arm64        | ✅         | `<version>` or `latest` |
| arm/v7       | ✅         | `<version>` or `latest` |

# Version Tags

The tags are automatically generated when

| Tag       | Available | Description                                                                                                 |
|:----------|:----------|:------------------------------------------------------------------------------------------------------------|
| `latest`  | ✅         | The latest version with multi-arch support                                                                  |
| `0.12.3`  | ✅         | [PocketBase v0.12.3](https://github.com/pocketbase/pocketbase/releases/tag/v0.12.3) with multi-arch support |
| `0.12.2`  | ✅         | [PocketBase v0.12.2](https://github.com/pocketbase/pocketbase/releases/tag/v0.12.2) with multi-arch support |
| `0.11.3`  | ✅         | [PocketBase v0.11.3](https://github.com/pocketbase/pocketbase/releases/tag/v0.11.3) with multi-arch support |
| `develop` | ✅         | Automatic build from GitHub that links the source on Dockerhub                                              |

# Configuration

The image uses the PocketBase binary as its entrypoint with a slight layer in front that allows a couple of variables to
be set instead of command-line arguments:

| Variable        | Overwrites       | Default           |
|:----------------|:-----------------|:------------------|
| `DATA_DIR`      | `--dir`          | `/data/database`  |
| `MIGRATION_DIR` | `--migrationDir` | `/data/migration` |
| `PUBLIC_DIR`    | `--publicDir`    | `/data/static`    |

By default, the serve command will be executed with `--http=0.0.0.0:8080` arguments.

# Persisted Data

As described above, all data is configured to exist under `/data`; therefore, to persist them, you need to attach a
volume to that location:

```bash
docker create volume pocketbase_data
docker run -p 8080:8080 -v pocketbase_data:/data adaliszk/pocketbase
```

or

```yaml
version: "3.8"
volumes:
  data: { }
services:
  pocketbase:
    image: adaliszk/pocketbase
    volumes:
      - data:/data
    ports:
      - "8080:8080"
```
