import { Project } from '@/data/projects'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.label}>{project.label}</div>
      <div className={styles.title}>{project.title}</div>
      <div className={styles.overviewLabel}>Overview:</div>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.tools}>
        <div className={styles.toolsLabel}>Tools:</div>
        <div className={styles.pills}>
          {project.tools.map((t) => <span key={t} className={styles.pill}>{t}</span>)}
        </div>
      </div>
      <div className={styles.actions}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGh}>Live ↗</a>
        )}
        <a
          href={project.repoUrl} target="_blank" rel="noopener noreferrer"
          className={styles.btnGh}
          style={project.liveUrl ? {} : { flex: 'unset', width: '100%' }}
        >
          View on GitHub ⌥
        </a>
      </div>
    </div>
  )
}
