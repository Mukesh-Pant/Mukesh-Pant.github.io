import styles from './SectionHeader.module.css'

interface Props {
  title: string
}

export default function SectionHeader({ title }: Props) {
  return (
    <div className={`${styles.secHd} reveal`}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.rule} />
    </div>
  )
}
