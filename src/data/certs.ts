export interface Cert {
  icon: string
  name: string
  date: string
  verifyUrl?: string
}

export const certs: Cert[] = [
  {
    icon: '🛡️',
    name: 'AWS Security — Specialty (SCS-C03)',
    date: 'Feb 2026',
    verifyUrl: 'https://www.credly.com/badges/fe40cb52-c521-4d82-8562-e8d521ece68a/public_url',
  },
  {
    icon: '☁️',
    name: 'AWS Cloud Practitioner (CLF-C02)',
    date: 'Jan 2026',
  },
]
