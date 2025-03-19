"use client"

import { Box, Typography, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import QRCode from 'qrcode';
import Image from 'next/image';

export default function Profile() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();
  const [lunchGroup, setLunchGroup] = useState("TBA");
  const [rsvp, setRsvp] = useState(false);
  const [status, setStatus] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [open, setOpen] = useState(false); // State for modal

  useEffect(() => {
    if (userId && isLoaded) {
      QRCode.toDataURL(userId, {
        errorCorrectionLevel: "H",
        width: 200,
        margin: 1,
      })
        .then(setQrCode)
        .catch(error => console.error("QR Code Generation Error:", error));
    }
  }, [userId, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        router.push('/sign-in');
      } else {
        (async () => {
          const result = await fetch(`/api/getStatus?userId=${encodeURIComponent(userId)}`)
            .then(res => res.ok ? res.json() : null)
            .catch(error => console.error('Error getting user status', error));
          if (result?.data?.status) {
            setStatus(result.data.status);
            setRsvp(result.data.rsvp)
          }
        })();
      }
    }
  }, [isLoaded, userId, router]);

  const handleChange = (e) => setRsvp(e.target.value);

  const handleSubmit = async () => {
    if (userId && isLoaded) {
      await fetch('/api/confirmRSVP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, rsvp }),
      }).catch(error => console.error('Error saving application', error));
      setOpen(true); // Open the modal
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
      {status === null ? (
        <CircularProgress />
      ) : status === 'accepted' ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <Box mb={2}>
            <Typography variant="h4">Hacker ID:</Typography>
            {qrCode && <Image src={qrCode} alt="QR Code" width={200} height={200} />}
          </Box>
          <Typography variant="h4" mb={2}>Lunch Group: {lunchGroup}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <FormControl fullWidth>
              <InputLabel>RSVP</InputLabel>
              <Select value={rsvp} label="RSVP" onChange={handleChange}>
                <MenuItem value={true}>I will be there!</MenuItem>
                <MenuItem value={false}>I will NOT be going...</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleSubmit}
              sx={{
                height: '46px', padding: '1.5rem', textTransform: 'none', color: 'black',
                fontWeight: 600, fontSize: '1.2rem', borderRadius: '18px',
                boxShadow: '5px 5px 0px black', border: '3px solid black',
                backgroundColor: '#f8f8f8', transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'translate(3px, 3px)', boxShadow: '0px 0px 0px black' },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      ) : status === 'pending' ? (
        <Typography variant="h4">Pending Acceptance...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Typography variant="h4">Thank you for applying to HackUSF!</Typography>
          <Typography variant="h5">Unfortunately, we could not offer you a spot this time.</Typography>
        </Box>
      )}

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>RSVP Submitted</DialogTitle>
        <DialogContent>
          <Typography>Your RSVP has been recorded successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
