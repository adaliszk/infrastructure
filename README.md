_Infrastructure configuration and setup via GitLab, Ansible, Flux, and Pulumi_

# Infrastructure

With the many various requirements over the year, I have been fine-tuning, evolving my own setup to deploy environments
and applications. This repository contains my frequently used abstractions and configurations alongside of a few tools
and framework extensions that aims to aid efficient workflows.

The idea here is to provide modular packages that can deploy a whole environment stack for a particular application
or environment. Separate each use-case into their scope and allow customisation through an exposed configuration.
Essentially, creating a deployment ecosystem like how vite creates a compiler ecosystem.

Pulumi enables these setups to be packaged up and shared through NPM, PyPi,
and [eventually Crates](https://github.com/pulumi/pulumi/issues/11882). It also allows
greater flexibility as the deployments can be manipulated based on common programming structures while keeping it stable
with deep and accurate testing support.

## Prerequisites

- [**yarn**](https://yarnpkg.com)  for managing the workspaces within the project
- [**ansible**](https://docs.ansible.com/ansible) for server configurations
- [**flux**](https://fluxcd.io/flux/installation) as gitops automation for all environments
- [**gitlab**](https://about.gitlab.com/features/continuous-integration) as gitops automation for packages
- [**docker**](https://docs.docker.com/get-docker) for building custom images
- [**pulumi**](https://www.pulumi.com/docs/get-started/install) for deployment automation

## Structure

- **/ansible**: ansible playbooks for bootstrapping servers
- **/environments**: environment configurations for shared resources
- **/images**: unofficial docker images to help cloud environments
- **/packages**: deployment packages to orchestrate environments

## GitOps

Currently, there are four layers of automation within the project:

1. Flux CD: synchronise the baseline setup to all clusters
2. GitLab Cluster Agent: synchronise custom resources to individual clusters
3. Pulumi: deployment modules and cluster configurations to be executed
4. GitLab CI: automation tool for the whole code lifecycle

# Images and Charts

| Name                                       | Docker                                                                                                                        | GitHub | Quay | Issues |
|:-------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------|:-------|:-----|:-------|
| `adaliszk/duplicity`                       | -                                                                                                                             | -      | -    | -      |
| [`adaliszk/pocketbase`](images/pocketbase) | [![Pulls](https://img.shields.io/docker/pulls/adaliszk/pocketbase?label=Pulls)](https://hub.docker.com/r/adaliszk/pocketbase) | -      | -    | -      |

# Packages

| Name                                                    | NPM                                                                                                                                                             | Issues                                                                                                                                                                                                                                       |
|:--------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`@adaliszk/pulumi`](packages/pulumi)                   | [![NPM](https://img.shields.io/npm/v/@adaliszk/pulumi.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@adaliszk/pulumi)                   | [![Issues for ESLint](https://img.shields.io/github/issues-search?logo=github&label=&style=flat-square&query=repo%3Aadaliszk%2Finfrastructure%20label%3Apulumi)](https://github.com/adaliszk/infrastructure/labels/pulumi)                   |
| [`@adaliszk/opsx`](packages/opsx)                       | [![NPM](https://img.shields.io/npm/v/@adaliszk/opsx.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@adaliszk/opsx)                       | [![Issues for ESLint](https://img.shields.io/github/issues-search?logo=github&label=&style=flat-square&query=repo%3Aadaliszk%2Finfrastructure%20label%3Aopsx)](https://github.com/adaliszk/infrastructure/labels/opsx)                       |

# Contributions

While I'm always open to Pull-Requests, this project is mainly to store examples, and showcase them.
Feel free to open a [discussion](https://github.com/adaliszk/infrastructure/discussions) if you have
any questions or requests.

