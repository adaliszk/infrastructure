_Infrastructure configuration and setup via Terraform and GitLab_

# Infrastructure Setups

With the many various requirements over the year, I have been fine-tuning, evolving my own setup
to deploy environments and applications. Within this repo, you can find my go-to configuration, 
and templates for many tools and products. Complete examples how to set up even a bare-metal
environment, and automate their deployment via GitLab (for now).

## Prerequisites
- [**yarn**](https://yarnpkg.com)  for managing the workspaces within the project
- [**terraform**](https://terraform.io) for development so that you don't need the local packages
- [**docker**](https://docs.docker.com/get-docker) for building custom images
- [**nodejs**](https://nodejs.org/en/download) for building helper tools

### Project structure 
- **/charts**: Helm charts for deploying Workloads
- **/containers**: Custom container Images using Docker
- **/deployments**: Configuration and Automation for Workloads
- **/environments**: Environment setups and Automation
- **/modules**: Re-usable modules for the environments
- **/tools**: Local tooling for easier development


## GitOps using GitLab
Custom deployments are located in `./deployments/<stack>/<env>` folder as Kubernetes YAML files.  
For the most part this is for custom resources that cannot be done using Terraform

Details about this feature: https://docs.gitlab.com/ee/user/clusters/agent


## Collaboration
While I'm always open to Pull-Requests, this project is mainly to store examples, and showcase them.
Feel free to open a [discussion](https://github.com/adaliszk/infrastructure/discussions) if you have 
any questions or requests. Issues are in general tracked [in GitLab](https://gitlab.com/adaliszk/infrastructure/-/issues) 
as that is the main space I maintain the repo.