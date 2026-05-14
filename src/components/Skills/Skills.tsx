import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { skills } from '@/data/skills'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section id="skills">
      <SectionHeader title="Skills." />
      <div className={styles.wrap}>
        <div className={styles.grid}>
          {skills.map((skill) => (
            <div key={skill.name} className={`${styles.iconBox} reveal`} aria-label={skill.name} title={skill.name}>
              <img src={skill.iconUrl} alt={skill.name} width={52} height={52} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
