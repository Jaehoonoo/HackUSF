"use client"

import styles from "./page.module.css"
import { FaDiscord, FaInstagram, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.title}>
          <h1>HackUSF 2025</h1>
          <div className={styles.logos}>
            <FaDiscord onClick={() => window.open("https://discord.com", "_blank", "noopener,noreferrer")} />
            <FaInstagram onClick={() => window.open("https://www.instagram.com/usfgdsc/", "_blank", "noopener,noreferrer")} />
            <FaLinkedinIn onClick={() => window.open("https://www.linkedin.com/company/usfgdsc/posts/?feedView=all", "_blank", "noopener,noreferrer")} />
          </div>
        </div>

        <div className={styles.resources}>
          <h3>Resources</h3>
          <p><a href="https://gdscusf.com" target="_blank">gdscusf.com</a></p>
          <p><a href="https://notion.com" target="_blank">Hacker Guide</a></p>
          <p><a href="https://sites.google.com/view/forms-workspace/" target="_blank">Misconduct Reporting</a></p>
          <p><a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank">Code of Conduct</a></p>
        </div>
      </div>
      <p>Made with 🖤  By The GDSC Team</p>
    </footer>
  )
}