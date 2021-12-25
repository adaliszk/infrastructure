terraform {
  required_version = ">= 1.0"

  required_providers {
    remote = {
      source = "tenstad/remote"
      version = ">= 0.0"
    }
  }
}

provider "remote" {
  conn {
    host = var.host
    port = var.port
    user = var.user
    private_key_path = var.key
  }
}
