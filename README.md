_Infrastructure configuration and setup via GitLab, Ansible, and Pulumi_

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
- [**nodejs**](https://nodejs.org/en/download) for building and using helper tools
- [**ansible**](https://docs.ansible.com/ansible) for server configurations
- [**docker**](https://docs.docker.com/get-docker) for building custom images
- [**pulumi**](https://www.pulumi.com/docs/get-started/install) for deployment automation
- [**changesets**](https://github.com/changesets/changesets) as versioning and publishing tool
- [**turbo**](https://turbo.build/repo/docs) as the monorepo orchestrator

## Structure

- **/images**: unofficial docker images to help cloud environments
- **/packages**: deployment packages to orchestrate environments
- **/environments**: environment configurations for shared resources
- **/servers**: ansible playbooks for bootstrapping servers

## GitOps using GitLab

Custom resources are located in `./environments/<name>/resources` folder as Kubernetes YAML files.  
For the most part this is only used to initialize a pulumi environment.

Details about this feature: https://docs.gitlab.com/ee/user/clusters/agent

## Pulumi

While Terraform and Helm charts are the main tooling that most uses for GitOps, I wanted to explore a different
direction where each of my deployable packages would contain their automation using the same langauge they are written.
By allowing better focus for each product, I am hoping to provide greater flexibility with test coverage.

# Images

| Name                  | Docker | Issues |
|:----------------------|:-------|:-------|
| `adaliszk/duplicity`  | -      | -      |
| `adaliszk/pocketbase` | -      | -      |

# Packages

| Name                           | NPM | Issues |
|:-------------------------------|:----|:-------|
| `@adaliszk/k8s-gsm-essentials` | -   | -      |
| `@adaliszk/k8s-web-essentials` | -   | -      |
| `@adaliszk/k8s-minio`          | -   | -      |
| `@adaliszk/k8s-kafka`          | -   | -      |
| `@adaliszk/k8s-redis`          | -   | -      |
| `@adaliszk/k8s-rabbitmq`       | -   | -      |
| `@adaliszk/k8s-supabase`       | -   | -      |
| `@adaliszk/k8s-postgres`       | -   | -      |
| `@adaliszk/k8s-fission`        | -   | -      |
| `@adaliszk/k8s-pocketbase`     | -   | -      |
| `@adaliszk/k8s-surrealdb`      | -   | -      |

# Contributions

While I'm always open to Pull-Requests, this project is mainly to store examples, and showcase them.
Feel free to open a [discussion](https://github.com/adaliszk/infrastructure/discussions) if you have
any questions or requests.

