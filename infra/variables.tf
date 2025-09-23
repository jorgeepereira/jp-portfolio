variable "aws_region" {
  description = "Primary region for S3/Route53 operations"
  type        = string
  default     = "us-east-1"
}

variable "root_domain" {
  description = "Root domain (e.g., example.com)"
  type        = string
}

variable "site_subdomain" {
  description = "Subdomain used for the site (e.g., www)"
  type        = string
  default     = "www"
}
