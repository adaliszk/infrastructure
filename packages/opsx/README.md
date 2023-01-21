_Enrich Operations CLI tools with environment and package data_

# opsx

A simple command line tool to parse .env and package.json files into
environment variables that appends commonly used operational tools arguments.

### Bash

Collected variables can be substituted in package.json scripts, for example:

```bash
opsx docker build -t your/image:^PKG_VERSION^ .
```

### Docker

Build arguments are passed from `BUILD_<attr>=<value>` and `PKG_<attr>` environment variables, for example:

```bash
export PKG_VERSION="123" # done automatically
opsx docker build -t your/image:tag .
> docker build -t your/image:tag --build-arg PKG_VERSION="1.2.3 ."
```

### Terraform

Backend configuration can be now set by `TF_BACKEND_<attr>=<value>` environment variables, for example:

```bash
export TF_BACKEND_USERNAME="adaliszk"
opsx terraform init
> terraform init -backend-config=username=adaliszk
```

### Ansible

Hosts can be passed via the `ANSIBLE_HOSTS` environment variable, for example:

```bash
export ANSIBLE_HOSTS="127.0.0.1"
opsx ansible-playbook my-automation.yml
> ansible-playbook my-automation.yml -i 127.0.0.1,
```
