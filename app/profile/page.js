"use client"

import { Box, Typography, Button } from "@mui/material";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import styles from './page.module.css';

export default function Profile() {
  const router = useRouter();

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        height: '100vh',
    }}>
      <UserButton 
        appearance={{
          elements: {
            avatarBox: {
              width: 120,
              height: 120,
            }
          },
        }} 
      />

      <Button variant="outlined" onClick={()=> router.push("/")}>Back to Homepage</Button>

    </Box>
  )
}