# --- S3 bucket ---
resource "aws_s3_bucket" "site" {
  bucket = "jp-portfolio-s3"
  # leave out region, Terraform detects it
  # You already have versioning, encryption, and bucket policy in place

  lifecycle {
    prevent_destroy = true
  }
}

# --- CloudFront Origin Access Control ---
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "cf-oac-jpportfolio"
  description                       = "OAC for jp-portfolio CloudFront"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [name, description]
  }
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_All"
  wait_for_deployment = true
  default_root_object = "index.html"

  aliases = [
    "jorge-pereira.com",
    "www.jorge-pereira.com"
  ]

  # Origin must use the exact origin_id CloudFront currently has
  origin {
    domain_name              = "jp-portfolio-s3.s3.us-east-1.amazonaws.com"
    origin_id                = "jp-portfolio-s3.s3.us-east-1.amazonaws.com-meiuz1xw2cp"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = "jp-portfolio-s3.s3.us-east-1.amazonaws.com-meiuz1xw2cp"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6" # AWS Managed CachingOptimized
    compress               = true

    function_association {
      event_type   = "viewer-request"
      function_arn = "arn:aws:cloudfront::060602669488:function/redirect-www-to-root"
    }

  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
    # IMPORTANT: do not set minimum_protocol_version here
  }

  tags = {
    Name = "jp-portfolio-distribution"
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes = [
      viewer_certificate[0].minimum_protocol_version
    ]
  }
}

# --- ACM Certificate (already issued in us-east-1) ---
resource "aws_acm_certificate" "cert" {
  provider    = aws.us_east_1
  domain_name = var.root_domain

  lifecycle {
    prevent_destroy = true
    ignore_changes  = all
  }
}

# --- Route53 Hosted Zone ---
resource "aws_route53_zone" "root" {
  name = var.root_domain

  lifecycle {
    prevent_destroy = true
    ignore_changes  = all
  }
}

# --- Route53 Records ---
resource "aws_route53_record" "apex" {
  zone_id = aws_route53_zone.root.zone_id
  name    = var.root_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes  = all
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.root.zone_id
  name    = "${var.site_subdomain}.${var.root_domain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes  = all
  }
}

# ---- Import blocks (Terraform v1.5+) ----
import {
  # Replace the ID values with YOUR actual IDs/names
  to = aws_s3_bucket.site
  id = "jp-portfolio-s3"
}

import {
  to = aws_cloudfront_origin_access_control.oac
  id = "E1ASX2S8F6DJL3"
}

import {
  to = aws_cloudfront_distribution.cdn
  id = "E2A9Y9VGE3EBG1"
}

import {
  to = aws_acm_certificate.cert
  id = "arn:aws:acm:us-east-1:060602669488:certificate/d73d1f00-4b48-420d-974f-1668d3864e8f"
}

import {
  to = aws_route53_zone.root
  id = "Z075860830V4N76Q7KUH6"
}

#www
import {
  to = aws_route53_record.www
  id = "Z075860830V4N76Q7KUH6_www.jorge-pereira.com_A"
}

#apex
import {
  to = aws_route53_record.apex
  id = "Z075860830V4N76Q7KUH6_jorge-pereira.com_A"
}

# If you also have an apex record, add another import block accordingly.
