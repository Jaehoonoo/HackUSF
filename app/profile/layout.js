'use client'
import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css"
import { useState } from "react";

export default function Layout({children}) {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar isOpened={menuOpen} handleMenu={handleMenu} />
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
