'use client';
import Header from '@/components/header/page';
import FAQ from '@/components/faq/page';
import Sponsors from '@/components/sponsors/page';
import Footer from '@/components/footer/page';

import { useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

import { Box, Button, Typography } from '@mui/material/';
import PrizeSection from '@/components/prizes/PrizeSection';
import Link from 'next/link';
<div></div>;

export default function Home() {
	useEffect(() => {
		// Function to adjust scroll position with offset
		const adjustScrollPosition = (event) => {
			// Only handle click events for anchor links
			const targetId = event.target.getAttribute('href');
			if (targetId && targetId.startsWith('#') && !targetId.endsWith('about')) {
				event.preventDefault(); // Prevent default anchor link behavior
				const targetElement = document.querySelector(targetId);
				if (targetElement) {
					window.scrollTo({
						top: targetElement.offsetTop - 80, // Adjust this value to match your header height
						behavior: 'smooth',
					});
				}
			}
		};

		// Add event listener for anchor links
		const links = document.querySelectorAll('a[href^="#"]');
		links.forEach((link) => {
			link.addEventListener('click', adjustScrollPosition);
		});

		// Cleanup the event listeners when component unmounts
		return () => {
			links.forEach((link) => {
				link.removeEventListener('click', adjustScrollPosition);
			});
		};
	}, []);

	return (
		<div>
			<Header />

			<div className={styles.container}>
				<div className={styles.hero}>
					<div className={styles.overlay}>
						<div className={styles.title}>
							<Typography>GDSC x Build with AI Proudly Presents</Typography>
							<Typography
								variant="h1"
								sx={{
									fontWeight: 700,
									fontSize: {
										xs: '3rem',
										md: '5rem',
									},
									marginTop: '1rem',
									fontWeight: '900',
									textTransform: 'uppercase',
									textAlign: 'center',
									color: 'black',
									letterSpacing: '2px',
									lineHeight: '1.1',
								}}
							>
								HackUSF 2025
							</Typography>
							<Box
								sx={{
									display: 'flex',
									gap: '1rem',
								}}
							>
								<Box
									sx={{
										fontSize: '16px',
										borderRadius: '20px',
										border: '2px solid black',
										padding: '0.75rem',
									}}
								>
									April 5-6
								</Box>
								<Box
									sx={{
										fontSize: '16px',
										borderRadius: '20px',
										border: '2px solid black',
										padding: '0.75rem',
									}}
								>
									Tampa, FL
								</Box>
								<Box
									sx={{
										fontSize: '16px',
										borderRadius: '20px',
										border: '2px solid black',
										padding: '0.75rem',
									}}
								>
									24 Hours
								</Box>
							</Box>
						</div>
						<div className={styles.herolinks}>
							<Button
								sx={{
									width: 'max(200px, 20vw)',
									textTransform: 'none',
									color: 'black',
									fontWeight: 700,
									fontSize: '1.4rem',
									borderRadius: '18px',
									boxShadow: '5px 5px 0px black',
									border: '3px solid black',
									backgroundColor: '#f8f8f8',
									transition:
										'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

									'&:hover': {
										transform: 'translate(3px, 3px)', // Move button down & right
										boxShadow: '0px 0px 0px black', // Shrink shadow slightly
										border: '3px solid black',
									},
								}}
							>
								Apply Now
							</Button>

							<p>
								Join the{' '}
								<a href="https://devpost.com/" target="_blank">
									Devpost
								</a>{' '}
								and{' '}
								<a href="https://discordapp.com/" target="_blank">
									Discord
								</a>
								!
							</p>
						</div>
					</div>
				</div>

				<Box
					id="about"
					sx={{
						minHeight: '100vh',
						// width: '90%',
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						gap: '2rem',
						flexDirection: { xs: 'column', md: 'row' },
					}}
				>
					<Box
						sx={{
							width: {
								xs: '100%',
								md: '40%',
							},
							textAlign: 'center',
							fontSize: '1.8rem',
						}}
					>
						<p>
							The Google Developer Student Club at USF is hosting its first-ever{' '}
							<b>24-hour Hackathon</b>, bringing students together to innovate,
							build, and compete.
						</p>
					</Box>
					<Box
						className={styles.location}
						sx={{
							width: {
								xs: '100%',
								md: '40%',
							},
							textAlign: 'center',
							height: '70%',
							fontSize: '1.4rem',
							borderRadius: '20px',
							border: '3px solid black',
							boxShadow: '5px 5px 0px black',
							padding: '1.6rem',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<Typography variant="h2" fontWeight="bold">
							Location
						</Typography>
						<div>
							<Box>
								<Link
									href="https://www.google.com/maps/place/ENB+-+Engineering+Building+II/@28.0586369,-82.418115,17z/data=!3m1!5s0x88c2c7b965c77a61:0x6d775b457200a0a9!4m10!1m2!2m1!1senb+usf!3m6!1s0x88c2c7b963af1e73:0x885216ce5072fc9b!8m2!3d28.0585491!4d-82.4156104!15sCgdlbmIgdXNmkgESZW5naW5lZXJpbmdfc2Nob29s4AEA!16s%2Fg%2F11clyt2m6n?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D"
									target="_blank"
									style={{
										color: 'inherit',
										textDecoration: 'underline',
										fontWeight: '500',
									}}
								>
									ENB - Engineering Building II on USF Campus
								</Link>
								<div>3820 USF Alumni Drive, Tampa, FL 33620</div>
							</Box>
						</div>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.8816865715253!2d-82.41811502452003!3d28.05863692598297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c7b963af1e73%3A0x885216ce5072fc9b!2sENB%20-%20Engineering%20Building%20II!5e0!3m2!1sen!2sus!4v1738160243407!5m2!1sen!2sus"
							style={{ border: 0, width: 'min(100%, 600px)', height: '400px' }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</Box>
				</Box>

        <div id="prizes" className={styles.prizes}>
          <PrizeSection />
        </div>

				<div id="faq" className={styles.faq}>
					<Typography sx={{ fontSize: '4rem', fontWeight: 600 }}>
						FAQ
					</Typography>
					<Typography sx={{ fontSize: '1.2rem', mb: 3 }}>
						Everything you need to know about participating in HackUSF. If you
						have any other questions,{' '}
						<a href="mailto:gdscatusf@gmail.com">Contact Us!</a>
					</Typography>
					<FAQ />
				</div>

				<div id="sponsors" className={styles.sponsors}>
					<Sponsors />
				</div>

				<div className={styles.footer}>
					<Footer />
				</div>
			</div>
		</div>
	);
}
