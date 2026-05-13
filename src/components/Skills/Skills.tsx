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
            <div key={skill.category} className={`${styles.box} reveal`}>
              <div className={styles.cat}>{skill.category}</div>
              <div className={styles.name}>{skill.name}</div>
              <div className={styles.tags}>
                {skill.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
