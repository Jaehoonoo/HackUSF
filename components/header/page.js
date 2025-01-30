'use client';
import styles from './page.module.css';
import Image from 'next/image';
import { Button } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Header() {
	const router = useRouter();

	return (
		<header className={styles.header}>
			<Image src="/gdsclogo.webp" alt="logo" width={40} height={40} />
			<nav className={styles.navbar}>
				<ul>
					<li>
						<a href="#about">About</a>
					</li>
					<li>
						<a href="#schedule">Schedule</a>
					</li>
					<li>
						<a href="#prizes">Prizes</a>
					</li>
					<li>
						<a href="#faq">FAQ</a>
					</li>
					<SignedOut>
						<Button
							onClick={() => router.push('/sign-in')}
							variant="contained"
							sx={{
								borderRadius: '1rem',
								textTransform: 'none',
								fontWeight: '500',
								fontSize: 'large',
								boxShadow: '4px 4px 0px black', // Strong offset shadow
								transition:
									'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
								'&:hover': {
									transform: 'translate(2px, 2px)', // Move button down & right
									boxShadow: '1px 1px 0px black', // Shrink shadow slightly
								},
							}}
						>
							Login
						</Button>
					</SignedOut>

					<SignedIn>
						<UserButton
							appearance={{
								elements: {
									userButtonAvatarBox: {
										width: '48px', // Adjust size
										height: '48px',
									},
								},
							}}
						/>
					</SignedIn>
				</ul>
			</nav>
		</header>
	);
}
