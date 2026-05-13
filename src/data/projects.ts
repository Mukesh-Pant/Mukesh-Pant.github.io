export interface Project {
  id: string
  label: string
  title: string
  description: string
  tools: string[]
  liveUrl?: string
  repoUrl: string
}

export const projects: Project[] = [
  {
    id: '01',
    label: 'Featured · Live SaaS',
    title: 'ServerControl — Multi-Account EC2 Platform',
    description:
      'Fully serverless SaaS portal for centralised EC2 control across multiple AWS accounts via STS cross-account role assumption. RBAC through Cognito user groups with DynamoDB audit trail. Eliminated idle compute waste for 3 clients — $200+/month saved via CloudWatch-triggered auto-stop.',
    tools: ['Python', 'Boto3', 'Lambda', 'DynamoDB', 'API Gateway', 'STS', 'Cognito'],
    liveUrl: 'https://app.onecloudutopia.com',
    repoUrl: 'https://github.com/Mukesh-Pant/ec2-control-center',
  },
  {
    id: '02',
    label: 'Featured · Final Year Project',
    title: 'IoT Smart Agriculture Decision Support System',
    description:
      'End-to-end pipeline from ESP32 sensor firmware → MQTT broker → FastAPI backend, feeding 4 co-located ML models served via Next.js dashboard. Containerised full stack with zero-touch GitHub Actions deployments on every merge to main.',
    tools: ['FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions', 'ESP32'],
    repoUrl: 'https://github.com/Mukesh-Pant/smart-agriculture-iot',
  },
  {
    id: '03',
    label: 'Featured · IaC Lab',
    title: 'AWS Cloud Lab — Terraform & CloudFormation',
    description:
      '9 isolated AWS workloads across 8 Terraform modules + 1 CloudFormation template. Every resource, IAM policy, and service wiring explicit from scratch. Reusable config.yaml layer keeps full runs under USD 2.',
    tools: ['Terraform', 'CloudFormation', 'VPC', 'ECS Fargate', 'Lambda', 'SNS'],
    repoUrl: 'https://github.com/Mukesh-Pant/cloud-computing-fwu-labs',
  },
  {
    id: '04',
    label: 'Featured · AI / RAG',
    title: 'NITI-SATHI — AI Legal Chatbot for Nepali Law',
    description:
      'Hybrid RAG pipeline: BM25 (0.3) + pgvector semantic search (0.7), Cohere reranking of top-20 candidates, streaming SSE with bilingual English & Nepali (Devanagari) responses. JWT auth, admin/user RBAC, PDF/DOCX ingestion UI.',
    tools: ['FastAPI', 'Next.js', 'pgvector', 'Gemini 2.5', 'Cohere', 'Docker'],
    repoUrl: 'https://github.com/Mukesh-Pant/NITI-SATHI',
  },
]
