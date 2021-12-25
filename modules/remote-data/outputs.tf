output "content" {
  value = data.remote_file.file.content
  sensitive = true
}
