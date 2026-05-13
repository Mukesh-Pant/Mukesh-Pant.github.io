export interface Skill {
  name: string
  iconUrl: string
}

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const skills: Skill[] = [
  { name: 'AWS', iconUrl: `${BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: 'Terraform', iconUrl: `${BASE}/terraform/terraform-original.svg` },
  { name: 'Docker', iconUrl: `${BASE}/docker/docker-original.svg` },
  { name: 'Kubernetes', iconUrl: `${BASE}/kubernetes/kubernetes-original.svg` },
  { name: 'Ansible', iconUrl: `${BASE}/ansible/ansible-original.svg` },
  { name: 'GitHub Actions', iconUrl: `${BASE}/github/github-original.svg` },
  { name: 'Jenkins', iconUrl: `${BASE}/jenkins/jenkins-original.svg` },
  { name: 'Python', iconUrl: `${BASE}/python/python-original.svg` },
  { name: 'Linux', iconUrl: `${BASE}/linux/linux-original.svg` },
  { name: 'Git', iconUrl: `${BASE}/git/git-original.svg` },
  { name: 'Prometheus', iconUrl: `${BASE}/prometheus/prometheus-original.svg` },
  { name: 'Grafana', iconUrl: `${BASE}/grafana/grafana-original.svg` },
]
