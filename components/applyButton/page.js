import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@mui/material';

export default function ApplyButton() {
  const router = useRouter();
  const { isSignedIn } = useUser(); // Get user's sign-in status

  const handleClick = () => {
    if (!isSignedIn) {
      // If user is not signed in, redirect them to the sign-in page
      router.push('/sign-in');
    } else {
      // If user is signed in, proceed to the apply page
      router.push('/profile/apply');
    }
  };

  const buttonText = () => {
    if (!isSignedIn) {
      return 'Sign In to Apply';
    } else {
      return 'Apply Now';
    }
  };

  return (
    <Button
      sx={{
        width: 'max(200px, 20vw)',
        textTransform: 'none',
        color: 'black',
        fontWeight: 700,
        fontSize: {
          xs: '1.2rem',
          sm: '1.4rem',
        },
        borderRadius: '18px',
        boxShadow: '5px 5px 0px black',
        border: '3px solid black',
        backgroundColor: '#f8f8f8',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

        '&:hover': {
          transform: 'translate(3px, 3px)',
          boxShadow: '0px 0px 0px black',
          border: '3px solid black',
        },
      }}
      onClick={handleClick} // Trigger routing on click
    >
      {buttonText()}
    </Button>
  );
};

