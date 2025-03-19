"use client";

import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from 'react';

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  // Update `value` based on the current pathname
  useEffect(() => {
    if (pathname === '/admin/admission') {
      setValue(0);
    } else if (pathname === '/admin/checkIn') {
      setValue(1);
    } else if (pathname === '/admin/mealIn') {
      setValue(2);
    } else if (pathname === '/admin/stats') {
      setValue(3);
    }
  }, [pathname]);

  const handleNav = (event, newValue) => {
    if (newValue === value) return;
    setValue(newValue);
  };


  return (
    <Box>
      <Box sx={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100vw',
      }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNav}
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
          height: '5rem',
          pb: '1rem'
        }}
      >
        <BottomNavigationAction label="Admission" icon={<InboxIcon />} onClick={() => {router.push('/admin/admission')}} />
        <BottomNavigationAction label="Check-In" icon={<PersonAddIcon/>} onClick={() => {router.push('/admin/checkIn')}} />
        <BottomNavigationAction label="Meal-In" icon={<LocalDiningIcon />} onClick={() => {router.push('/admin/mealIn')}} />
        <BottomNavigationAction label="Stats" icon={<SignalCellularAltIcon />} onClick={() => {router.push('/admin/stats')}} />
      </BottomNavigation>
      </Box>
    </Box>
  );
}