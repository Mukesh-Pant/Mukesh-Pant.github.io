import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.foot}>
      © {new Date().getFullYear()} Mukesh Pant. All rights reserved.
    </footer>
  )
}
