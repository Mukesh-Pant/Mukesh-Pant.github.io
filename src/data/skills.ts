export interface Skill {
  category: string
  name: string
  tags: string[]
}

export const skills: Skill[] = [
  {
    category: 'Cloud & IaC',
    name: 'AWS · Azure · Terraform',
    tags: ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda', 'CloudFormation', 'ECR', 'STS', 'Terraform', 'Ansible'],
  },
  {
    category: 'CI / CD',
    name: 'Pipelines & Automation',
    tags: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'GitLab CI'],
  },
  {
    category: 'Containers',
    name: 'Docker · Kubernetes',
    tags: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm'],
  },
  {
    category: 'Observability & Security',
    name: 'Monitor · Protect · Comply',
    tags: ['Prometheus', 'Grafana', 'Datadog', 'CloudWatch', 'IAM Policy', 'SSL/TLS', 'SAST/DAST'],
  },
  {
    category: 'Languages',
    name: 'Scripting & Backend',
    tags: ['Python', 'Bash', 'PowerShell', 'SQL', 'Java', 'C / C++'],
  },
  {
    category: 'Tooling',
    name: 'Ecosystem',
    tags: ['Git', 'Boto3', 'REST API', 'Postman', 'Helm Charts', 'PM2'],
  },
]
