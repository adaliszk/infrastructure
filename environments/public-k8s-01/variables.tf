variable "premise_host" {
  type        = string
  description = "SSH Hostname resolving on the runner machine"
}

variable "premise_user" {
  type        = string
  description = "SSH Host username, usually root"
}

variable "premise_key" {
  type        = string
  description = "SSH Host private key"
}


variable "cluster_name" {
  type    = string
  default = "pk1"
}

variable "cluster_gateway_ip" {
  type    = string
  default = "172.16.0.1"
}

variable "cluster_cidr" {
  type    = string
  default = "172.16.0.0/24"
}

variable "os_version" {
  type    = string
  default = "35.20211203.3.0"
}
