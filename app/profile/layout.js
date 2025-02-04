'use client'
import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css"
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Box } from "@mui/material";

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
                <Box onClick={handleMenu} sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    cursor: 'pointer',
                    padding: '1.1rem',
                    zIndex: 1000,
                    display: {lg: 'none'}
                }}>
                    <IoMenu size={45} />
                </Box>
            </div>
        </div>
    )
}
