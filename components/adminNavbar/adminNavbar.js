import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        {/* Navigation Links (Evenly Spaced) */}
        <Button component={Link} href="/admin" sx={{ flex: 1, textAlign: 'center', color: '#333', fontWeight: 1000, textTransform: 'none', border: '1px solid #000000', margin: '10px' }}>
          Admission
        </Button>
        <Button component={Link} href="/admin/checkin" sx={{ flex: 1, textAlign: 'center', color: '#555', fontWeight: 1000, textTransform: 'none', border: '1px solid #000000', margin: '10px' }}>
          Check-In
        </Button>
        <Button component={Link} href="/admin/meal" sx={{ flex: 1, textAlign: 'center', color: '#555', fontWeight: 1000, textTransform: 'none', border: '1px solid #000000', margin: '10px' }}>
          Meal
        </Button>
        <Button component={Link} href="/admin/stats" sx={{ flex: 1, textAlign: 'center', color: '#555', fontWeight: 1000, textTransform: 'none', border: '1px solid #000000', margin: '10px' }}>
          Stats
        </Button>
      </Toolbar>
    </AppBar>
  );
}
