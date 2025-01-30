"use client"
import styles from "./page.module.css"
import Image from "next/image"
import { Button } from "@mui/material"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"


export default function Header() {
    const router = useRouter()

    return (
        <header className={styles.header}>
            <Image src="/gdsclogo.webp" alt="logo" width={40} height={40} />
            <nav className={styles.navbar}>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#schedule">Schedule</a></li>
                    <li><a href="#prizes">Prizes</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <SignedOut>
                        <Button onClick={() => router.push("/sign-in")} variant="contained" sx={{ borderRadius: "1rem", textTransform: 'none', fontWeight: '500', fontSize: 'large' }}>Login</Button>
                    </SignedOut>

                    <SignedIn>
                    <UserButton
                        appearance={{
                        elements: {
                            userButtonAvatarBox: {
                            width: "48px", // Adjust size
                            height: "48px",
                            },
                        },
                        }}
                    />
                    </SignedIn>
                </ul>
            </nav>
        </header>
    )
}