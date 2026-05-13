import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { certs } from '@/data/certs'
import styles from './Certs.module.css'

export default function Certs() {
  return (
    <section id="certs">
      <SectionHeader title="Certified." />
      <div className={styles.wrap}>
        <div className={`${styles.grid} reveal`}>
          {certs.map((cert) => {
            const inner = (
              <>
                <img
                  src={cert.badgeUrl}
                  alt={cert.name}
                  className={styles.badge}
                  width={80}
                  height={80}
                />
                <div className={styles.name}>{cert.name}</div>
                <div className={styles.meta}>{cert.issuer} · {cert.date}</div>
              </>
            )
            return cert.verifyUrl ? (
              <a
                key={cert.name}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {inner}
              </a>
            ) : (
              <div key={cert.name} className={styles.card}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
