terraform {
  required_version = ">= 1.0"

  backend "http" {
    address        = "https://gitlab.com/api/v4/projects/30897473/terraform/state/public-k8s1"
    retry_wait_min = "5"

    lock_address   = "https://gitlab.com/api/v4/projects/30897473/terraform/state/public-k8s1/lock"
    lock_method    = "POST"

    unlock_address = "https://gitlab.com/api/v4/projects/30897473/terraform/state/public-k8s1/lock"
    unlock_method  = "DELETE"
  }

  required_providers {
    matchbox = {
      source = "poseidon/matchbox"
      version = ">= 0.5"
    }
    ct = {
      source  = "poseidon/ct"
      version = ">= 0.9"
    }
  }
}
