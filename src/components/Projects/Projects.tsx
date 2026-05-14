import SectionHeader from '@/components/SectionHeader/SectionHeader'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section id="projects">
      <SectionHeader title="Projects." />
      <div className={styles.wrap}>
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} variant={i % 2 === 1 ? 'accent' : 'default'} />
          ))}
        </div>
      </div>
    </section>
  )
}
