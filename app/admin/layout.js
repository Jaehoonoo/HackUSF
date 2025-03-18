'use client'
import BottomNav from "@/components/bottomNav/page";
import { Box } from "@mui/material";


export default function AdminLayout({children}) {
    return (
        <Box
          height="100vh"
        >
          {children}
          <BottomNav />
        </Box>
    )
}
