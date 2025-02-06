"use client"

import styles from "./page.module.css"
import { FaDiscord, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Typography } from "@mui/material";


export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.title}>
          <Typography variant="h4" fontWeight="600">HackUSF 2025</Typography>
          <div className={styles.logos}>
            <FaDiscord onClick={() => window.open("https://discord.gg/Zdx4Hkt33W", "_blank", "noopener,noreferrer")} />
            <FaInstagram onClick={() => window.open("https://www.instagram.com/usfgdsc/", "_blank", "noopener,noreferrer")} />
            <FaLinkedinIn onClick={() => window.open("https://www.linkedin.com/company/usfgdsc/posts/?feedView=all", "_blank", "noopener,noreferrer")} />
          </div>
        </div>

        <div className={styles.resources}>
          <h3>Resources</h3>
          <p><a href="https://gdscusf.com" target="_blank">gdscusf.com</a></p>
          <p><a href="https://mina-meowmeow.notion.site/USF-Hack-Hacker-Guide-18f761666cf580989f49dbeca7f606c3" target="_blank">Hacker Guide</a></p>
          <p><a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank">Code of Conduct</a></p>
        </div>
      </div>
      <p style={{fontSize: '1.2rem'}}>Made with 🖤  By The GDSC Team</p>
    </footer>
  )
}