
module "client_crt" {
  source = "../../modules/remote-data"
  file   = "/srv/matchbox/etc/client.crt"
  host   = var.premise_host
  user   = var.premise_user
  key    = var.premise_key
}

module "client_key" {
  source = "../../modules/remote-data"
  file   = "/srv/matchbox/etc/client.key"
  host   = var.premise_host
  user   = var.premise_user
  key    = var.premise_key
}

module "ca_crt" {
  source = "../../modules/remote-data"
  file   = "/srv/matchbox/etc/ca.crt"
  host   = var.premise_host
  user   = var.premise_user
  key    = var.premise_key
}


provider "matchbox" {
  endpoint    = "${var.premise_host}:8081"
  client_cert = module.client_crt.content
  client_key  = module.client_key.content
  ca          = module.ca_crt.content
}
