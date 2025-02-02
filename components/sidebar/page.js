import { Box, Button } from '@mui/material';
import { UserButton } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import styles from './page.module.css';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  return (
    <Box
      sx={{
        height: '100%',
        width: '280px',
        borderRight: '5px solid black',
        position: 'fixed',
        backgroundColor: 'white',
        zIndex: 1000,
        transform: { xs: 'translateX(-100%)', lg: 'translateX(0)' }, // Hide on mobile, show on larger screens
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Box
        className={styles.links}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          p: 2,
          mt: 2
        }}
      >
        <Box pb={2}>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: 70,
                  height: 70,
                },
              },
            }}
          />
        </Box>
        <Button
          className={styles.link}
          onClick={() => router.push('/profile/apply')}
          sx={{
            backgroundColor: pathname === '/profile/apply' ? '#88AAEE' : 'white', // Highlight active button
            padding: '1rem',
            fontSize: '1rem',
            color: 'black',
            border: '3px solid black',
            borderRadius: '10px',
            boxShadow: pathname === '/profile/apply' ? '0px 0px 0px black' : '4px 4px 0px black', // Remove shadow if active
            transform: pathname === '/profile/apply' ? 'translate(3px, 3px)' : 'none', // Keep button pressed if active
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:active': {
              transform: 'translate(3px, 3px)', // Move button down & right when clicked
              boxShadow: '0px 0px 0px black', // Shrink shadow slightly
              border: '3px solid black',
            },
          }}
        >
          Application
        </Button>
        <Button
          className={styles.link}
          onClick={() => router.push('/profile')}
          sx={{
            backgroundColor: pathname === '/profile' ? '#88AAEE' : 'white', // Highlight active button
            padding: '1rem',
            fontSize: '1rem',
            color: 'black',
            border: '3px solid black',
            borderRadius: '10px',
            boxShadow: pathname === '/profile' ? '0px 0px 0px black' : '4px 4px 0px black', // Remove shadow if active
            transform: pathname === '/profile' ? 'translate(3px, 3px)' : 'none', // Keep button pressed if active
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:active': {
              transform: 'translate(3px, 3px)', // Move button down & right when clicked
              boxShadow: '0px 0px 0px black', // Shrink shadow slightly
              border: '3px solid black',
            },
          }}
        >
          Profile
        </Button>
        <Button
          className={styles.link}
          onClick={() => router.push('/')}
          sx={{
            backgroundColor: pathname === '/' ? '#88AAEE' : 'white', // Highlight active button
            padding: '1rem',
            fontSize: '1rem',
            color: 'black',
            border: '3px solid black',
            borderRadius: '10px',
            boxShadow: pathname === '/' ? '0px 0px 0px black' : '4px 4px 0px black', // Remove shadow if active
            transform: pathname === '/' ? 'translate(3px, 3px)' : 'none', // Keep button pressed if active
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:active': {
              transform: 'translate(3px, 3px)', // Move button down & right when clicked
              boxShadow: '0px 0px 0px black', // Shrink shadow slightly
              border: '3px solid black',
            },
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
