import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { profile } from '@/data/profile'
import styles from './About.module.css'

const INFO_PILLS = [
  { key: 'Status',   value: profile.status },
  { key: 'Location', value: profile.location },
  { key: 'Role',     value: profile.role },
  { key: 'Org',      value: `${profile.org} · ${profile.orgYear}–` },
  { key: 'Edu',      value: `B.E. CompEng · GPA ${profile.gpa}` },
]

export default function About() {
  return (
    <section id="about">
      <SectionHeader title="About." />
      <div className={`${styles.body} reveal`}>
        <p>
          I&apos;m a <strong>DevOps &amp; Cloud Engineer</strong> finishing my Computer Engineering
          degree at Far Western University (GPA {profile.gpa}), currently working at{' '}
          <strong>{profile.org}</strong> where I manage cloud infrastructure across multiple AWS
          accounts for international clients.
        </p>
        <p>
          The <strong>AWS Security – Specialty</strong> certification reflects how I think. IAM
          policies are designed before anything gets deployed. Secrets are managed in pipelines, not
          hardcoded. Compliance isn&apos;t bolted on at the end — it&apos;s part of the architecture.
        </p>
        <p>
          My stack spans <strong>Terraform, Docker, Kubernetes, GitHub Actions</strong>, and the full
          AWS catalogue. Equally at home writing Bash automation, designing cross-account trust
          policies, or debugging a container networking issue at midnight.
        </p>
        <div className={styles.pills}>
          {INFO_PILLS.map((p) => (
            <span key={p.key} className={styles.pill}>
              <span className={styles.pillKey}>{p.key}: </span>
              {p.value}
            </span>
          ))}
        </div>
        <a href="#connect" className="btn-ghost">Let&apos;s Connect ✉</a>
      </div>
    </section>
  )
}
