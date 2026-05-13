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
            <div key={skill.name} className={`${styles.iconBox} reveal`}>
              <img src={skill.iconUrl} alt={skill.name} width={48} height={48} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
