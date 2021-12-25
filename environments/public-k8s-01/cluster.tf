module "ssh_key" {
  source = "../../modules/remote-data"
  file   = "/srv/matchbox/keys/id_${var.cluster_name}-adaliszk-net_ed25519"
  host   = var.premise_host
  user   = var.premise_user
  key    = var.premise_key
}

module "cluster" {
  source = "git::https://github.com/poseidon/typhoon//bare-metal/fedora-coreos/kubernetes?ref=v1.23.0"

  cluster_name = var.cluster_name

  os_version = var.os_version
  os_stream  = "stable"

  k8s_domain_name    = "${var.cluster_name}.adaliszk.net"
  ssh_authorized_key = module.ssh_key.content

  matchbox_http_endpoint = "http://172.16.0.1:8080"

  controllers = [
    {
      name   = "pk1cp1"
      domain = "pk1cp1.adaliszk.net"
      mac    = "96:c9:60:1d:59:ed"
    }
  ]

  workers = []
}
