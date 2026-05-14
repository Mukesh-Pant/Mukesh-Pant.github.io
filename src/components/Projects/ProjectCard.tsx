import { Project } from '@/data/projects'
import { toolIcons } from '@/data/toolIcons'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }: { project: Project }) {
  const seen = new Set<string>()
  const dedupedTools = project.tools.filter((t) => {
    const url = toolIcons[t]
    if (!url) return true
    if (seen.has(url)) return false
    seen.add(url)
    return true
  })

  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.label}>{project.label}</div>
      <div className={styles.title}>{project.title}</div>
      <div className={styles.overviewLabel}>Overview:</div>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.tools}>
        <div className={styles.toolsLabel}>Tools:</div>
        <div className={styles.pills}>
          {dedupedTools.map((t) => {
            const iconUrl = toolIcons[t]
            return iconUrl ? (
              <span key={t} className={styles.iconPill} title={t}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconUrl} alt={t} width={24} height={24} />
              </span>
            ) : (
              <span key={t} className={styles.pill}>{t}</span>
            )
          })}
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
