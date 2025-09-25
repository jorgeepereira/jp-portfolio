# Personal Portfolio Website - JP Portfolio

## Overview
This project is my personal portfolio website, built to showcase my work, skills, and cloud journey. More importantly, it was my first end-to-end project — when I started, I had no experience with frontend development, cloud services, or automation pipelines.

Through building this site, I learned how to:
- Design and code a responsive website from scratch (HTML, CSS, JavaScript).
- Deploy it using AWS services (S3, CloudFront, Route 53, ACM).
- Define infrastructure with Terraform so everything is reproducible.
- Automate deployments with GitHub Actions for CI/CD.

The result is not just a portfolio, but a learning milestone that reflects my growth from complete beginner to someone who can design, deploy, and maintain a production-ready website in the cloud.

**Check out the live website here ->** <a href="https://jorge-pereira.com" target="_blank" rel="noopener noreferrer">JP Portfolio</a>

<img width="1692" height="907" alt="Screenshot 2025-09-25 at 9 29 25 AM" src="https://github.com/user-attachments/assets/008cc2c9-926e-404c-87f5-486537cf0d05" />

## Why I Built It
I primarily wanted to have a central place where recruiters and collaborators can explore my projects and skills. Allowing me to share more information than in a short Resume.

This project also gave me the opportunity to:
- Practice cloud architecture using real tools: AWS, Terraform, and CI/CD pipelines.
- Demonstrate that I can design, deploy, and maintain a production-grade web application.
- Reinforce my belief that simplicity is the prerequisite for reliability — a principle I apply in both design and engineering.

<img width="1683" height="829" alt="Screenshot 2025-09-25 at 9 35 40 AM" src="https://github.com/user-attachments/assets/90aed936-fa2e-4503-bb23-95887a405ed2" />


## Tech Stack

- HTML / CSS / JavaScript
- AWS - S3, CloudFront, Route 53, ACM
- Terraform
- Github Actions

## Build Process

1. **Frontend Development**
- Built with plain HTML, CSS, and JavaScript to emphasize simplicity and reliability.
- Implemented a responsive layout and reusable project cards for scalability.
  
2. **Infrastructure Setup**
   
    **AWS S3 (Static Website Hosting)**
    - The site’s static assets (HTML, CSS, JS, images) are stored in a private S3 bucket with OAC.
    - Configured with public access handled via CloudFront instead of direct bucket access.

    **AWS CloudFront (Content Delivery Network)**
    - Distributes the website globally through edge locations for low latency and high availability.
    - Integrated with ACM certificates to serve the site over HTTPS.

    **AWS Route 53 (DNS Management)**
    - Configured a custom domain with DNS records pointing traffic to CloudFront.
    - Provides reliable routing and domain-level control.

    **AWS ACM (SSL/TLS Certificates)**
    - Managed the SSL certificate for the domain to ensure encrypted HTTPS connections.

    **Terraform (Infrastructure as Code)**
    - All of the above infrastructure (S3, CloudFront, Route 53, ACM) is defined in Terraform scripts.
    - Ensures the setup is repeatable, version-controlled, and scalable.

3. **CI/CD Pipeline**
- Configured GitHub Actions to automatically deploy updates.
- On every push to main, the pipeline runs Terraform commands to validate and apply changes.
- This ensures new code and infrastructure updates are deployed seamlessly.

4. **Deployment**
- Final build automatically distributed via CloudFront edge locations.
- Updates propagate worldwide with low latency and high availability.

## Architecture

<img width="1296" height="661" alt="Screenshot 2025-09-25 at 8 52 12 AM" src="https://github.com/user-attachments/assets/e5a7dbec-03fb-48eb-96cc-046a0b106663" />
                  High-level architecture diagram showing the flow from GitHub Actions → Terraform → AWS resources → end users.

## What I Learned
When I started this project, I had no prior experience with deploying a website or working with cloud infrastructure. Through building this portfolio, I learned:

- Frontend basics: How to structure a site with HTML, style it with CSS, and add interactivity with JavaScript.
- Responsive design: Making the site mobile-friendly.
- Version control with Git/GitHub: How to track changes, push commits, and manage a live project repository.
- Infrastructure as Code (IaC): Writing Terraform scripts to define AWS resources instead of configuring them manually.
- Cloud hosting with AWS:
  - Hosting static files on S3
  - Using CloudFront as a CDN for faster global delivery
  - Configuring Route 53 for domain and DNS setup
  - Applying ACM certificates for HTTPS security
- CI/CD pipelines: Setting up GitHub Actions to automatically deploy new code and infrastructure changes.
- Debugging & problem-solving: From fixing broken CSS layouts to troubleshooting SSL errors, I gained hands-on practice in diagnosing and solving real issues.
  
Most importantly, I learned how all these tools and concepts fit together to take an idea from zero to production, which gave me confidence to keep building more complex projects.

Check out the live website yourself <a href="https://jorge-pereira.com" target="_blank" rel="noopener noreferrer">here</a>.

