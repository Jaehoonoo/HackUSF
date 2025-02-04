'use client';
import styles from './page.module.css';
import Image from "next/image";
import { Button } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';

export default function Header() {
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);

	// Function to handle menu toggle
	const handleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		<header className={styles.header}>
			<Image src="/gdsclogo.webp" alt="logo" width={40} height={40} />

			<IoMenu className={styles.menuIcon} size={40} onClick={handleMenu} />

			<div className={`${styles.navbar} ${menuOpen ? styles.open : ''}`}>
				<ul>
					<li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
					{/* <li><a href="#prizes" onClick={() => setMenuOpen(false)}>Prizes</a></li> */}
					<li><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></li>
					<li><a href="#sponsors" onClick={() => setMenuOpen(false)}>Sponsors</a></li>
				
					<SignedOut>
						<Button
							onClick={() => {
								router.push('/sign-in');
								setMenuOpen(false);
							}}
							variant="contained"
							sx={{
								borderRadius: '18px',
								border: '3px solid black',
								color: 'black',
								textTransform: 'none',
								fontWeight: '500',
								fontSize: '1.2rem',
								boxShadow: '4px 4px 0px black', // Strong offset shadow
								transition:
									'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
								'&:hover': {
									transform: 'translate(3px, 3px)', // Move button down & right
									boxShadow: '0px 0x 0px black', // Shrink shadow slightly
									border: '3px solid black',
								},
								backgroundColor: '#88AAEE'
							}}
						>
							Login
						</Button>
					</SignedOut>

					<SignedIn>
					<Button onClick={() => {
							router.push('/profile');
							setMenuOpen(false);
						}}
						sx={{
							paddingLeft: '2rem',
							paddingRight: '2rem',
							textTransform: 'none',
							color: 'black',
							fontWeight: 600,
							fontSize: '1.2rem',
							borderRadius: '18px',
							boxShadow: '3px 3px 0px black',
							border: '3px solid black',
							backgroundColor: '#FF6B6B',
							transition:
								'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

							'&:hover': {
								transform: 'translate(3px, 3px)', // Move button down & right
								boxShadow: '0px 0px 0px black', // Shrink shadow slightly
								border: '3px solid black',
							},
						}}
							>
							Profile
						</Button>
					</SignedIn>
				</ul>
				
			</div>
		</header>
	);
}
