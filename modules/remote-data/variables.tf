variable "host" {
  type        = string
  description = "SSH Hostname resolving on the runner machine"
}

variable "port" {
  type        = number
  description = "SSH Port for custom setups"
  default     = 22
}

variable "user" {
  type        = string
  description = "SSH Host username, usually root"
  default     = "root"
}

variable "key" {
  type        = string
  description = "SSH Host private key"
  default     = "~/.ssh/id_ed25519"
}

variable "file" {
  type        = string
  description = "Path to the file on the remote"
}
