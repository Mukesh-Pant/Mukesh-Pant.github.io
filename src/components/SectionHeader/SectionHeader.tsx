import styles from './SectionHeader.module.css'

interface Props {
  title: string
  centered?: boolean
}

export default function SectionHeader({ title, centered }: Props) {
  return (
    <div className={`${styles.secHd} reveal`}>
      <h2 className={`${styles.heading} ${centered ? styles.headingCentered : ''}`}>
        {title}
      </h2>
      <div className={styles.rule} />
    </div>
  )
}
