import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { certs } from '@/data/certs'
import styles from './Certs.module.css'

export default function Certs() {
  return (
    <section id="certs">
      <SectionHeader title="Certified." />
      <div className={styles.wrap}>
        <div className={`${styles.row} reveal`}>
          {certs.map((cert) => (
            <div key={cert.name} className={styles.box}>
              <div className={styles.iconBox}>{cert.icon}</div>
              <div>
                <div className={styles.name}>{cert.name}</div>
                <div className={styles.date}>
                  {cert.date}
                  {cert.verifyUrl && (
                    <>{' · '}<a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">Credly verified ↗</a></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
