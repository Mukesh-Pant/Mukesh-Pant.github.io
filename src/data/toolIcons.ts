const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const AWS = `${BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`

export const toolIcons: Record<string, string> = {
  Python:           `${BASE}/python/python-original.svg`,
  FastAPI:          `${BASE}/fastapi/fastapi-original.svg`,
  PostgreSQL:       `${BASE}/postgresql/postgresql-original.svg`,
  pgvector:         `${BASE}/postgresql/postgresql-original.svg`,
  MongoDB:          `${BASE}/mongodb/mongodb-original.svg`,
  Docker:           `${BASE}/docker/docker-original.svg`,
  'GitHub Actions': `${BASE}/github/github-original.svg`,
  Terraform:        `${BASE}/terraform/terraform-original.svg`,
  'Next.js':        `${BASE}/nextjs/nextjs-original.svg`,
  'Gemini 2.5':     `${BASE}/google/google-original.svg`,
  Boto3:            AWS,
  Lambda:           AWS,
  DynamoDB:         AWS,
  'API Gateway':    AWS,
  STS:              AWS,
  Cognito:          AWS,
  CloudFormation:   AWS,
  VPC:              AWS,
  'ECS Fargate':    AWS,
  SNS:              AWS,
}
