"use client"
import styles from "./page.module.css"
import Image from "next/image"
import { Button } from "@mui/material"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation"


export default function Header() {
  const router = useRouter()

  return (
    <header className={styles.header}>
      <Image src="/gdsclogo.webp" alt="logo" width={40} height={40} />
      <nav className={styles.navbar}>
        <ul>
          <li><a href="#about">About</a></li>
          {/* <li><a href="#schedule">Schedule</a></li> */}
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#sponsors">Sponsors</a></li>
          <SignedOut>
            <Button onClick={() => router.push("/sign-in")} variant="contained" sx={{ borderRadius: "1rem", textTransform: 'none', fontWeight: '500', fontSize: 'large' }}>Login</Button>
          </SignedOut>

          <SignedIn>
            <Button 
              onClick={() => router.push("/profile")}
              sx={{ 
                textTransform: 'none', 
                color: 'black',
                fontWeight: 600,
                fontSize: "1.2rem",
                borderRadius: "18px",
                boxShadow: '3px 3px 0px black',
                border: '3px solid black',
                backgroundColor: '#f8f8f8',
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",

                '&:hover': {
                  transform: "translate(3px, 3px)", // Move button down & right
                  boxShadow: "0px 0px 0px black", // Shrink shadow slightly
                  border: '3px solid black',
                },
              }}
            >
              Profile
            </Button>
          </SignedIn>
        </ul>
      </nav>
    </header>
  )
}