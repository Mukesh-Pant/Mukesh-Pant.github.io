export interface Cert {
  name: string
  issuer: string
  date: string
  badgeUrl: string
  verifyUrl?: string
}

export const certs: Cert[] = [
  {
    name: 'AWS Security — Specialty (SCS-C03)',
    issuer: 'Amazon Web Services',
    date: 'Feb 2026',
    badgeUrl: 'https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png',
    verifyUrl: 'https://www.credly.com/badges/fe40cb52-c521-4d82-8562-e8d521ece68a/public_url',
  },
  {
    name: 'AWS Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    date: 'Jan 2026',
    badgeUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
  },
]
