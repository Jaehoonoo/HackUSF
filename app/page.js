import Header from '@/components/header/page';
import FAQ from '@/components/faq/page';
import Sponsors from '@/components/sponsors/page';
import Footer from '@/components/footer/page';
import ApplyButton from '@/components/applyButton/page';
import AuthClient from '@/components/authClient/page';

import styles from './page.module.css';
import Image from "next/image";

import { Box, Typography } from '@mui/material/';
import PrizeSection from '@/components/prizes/PrizeSection';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';


export default function Home() {
	// const { isSignedIn, userId } = useAuth();

	// useEffect(() => {
	// 	// Function to adjust scroll position with offset
	// 	const adjustScrollPosition = (event) => {
	// 		// Only handle click events for anchor links
	// 		const targetId = event.target.getAttribute('href');
	// 		if (targetId && targetId.startsWith('#') && !targetId.endsWith('about')) {
	// 			event.preventDefault(); // Prevent default anchor link behavior
	// 			const targetElement = document.querySelector(targetId);
	// 			if (targetElement) {
	// 				window.scrollTo({
	// 					top: targetElement.offsetTop - 80, // Adjust this value to match your header height
	// 					behavior: 'smooth',
	// 				});
	// 			}
	// 		}
	// 	};

	// 	// Add event listener for anchor links
	// 	const links = document.querySelectorAll('a[href^="#"]');
	// 	links.forEach((link) => {
	// 		link.addEventListener('click', adjustScrollPosition);
	// 	});

	// 	// Cleanup the event listeners when component unmounts
	// 	return () => {
	// 		links.forEach((link) => {
	// 			link.removeEventListener('click', adjustScrollPosition);
	// 		});
	// 	};
	// }, []);

	return (
		<div>
				{/* <Box
					sx={{
						display: "block",
						position: "fixed",
						top: "0px",
						right: { xs: "auto", sm: "20px", md: "20px", lg: "20px" }, // Adjust right position per screen size
						left: {xs: "110px", sm: "auto"},
						maxWidth: "100px",
						minWidth: "60px",
						width: "10%",
						zIndex: 10000,
					}}
				>
					<a
						id="mlh-trust-badge"
						href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
						target="_blank"
					>
						<Image
							src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-black.svg"
							alt="Major League Hacking 2025 Hackathon Season"
							width={180}
							height={180}
							layout="responsive"
							objectFit="contain"
							loading="lazy"
						/>
					</a>
				</Box> */}


			<Header />
			<AuthClient />

			<div className={styles.container}>
				<Box className={styles.hero} sx={{
					width: "100%",
					mt: {xs: "60px", sm: "140px", md: "0px", lg: "0px"},
					"@media (min-width:450px) and (max-width:599px)": {
						mt: "140px", // Custom size between xs and sm
					},
					display: 'flex',
					flexDirection: {xs: "column", md: "row"},
					alignItems: 'center',
					justifyContent: 'center',
					gap: {md: '6rem', lg: "8rem"},
					height: '100vh',
					position: 'relative',
				}}>
					<div className={styles.overlay}>
						<div className={styles.title}>
							<Typography variant="h1" sx={{
								fontSize: {
									xs: '1.2rem',
									md: '1.3rem',
									lg: '1.4rem',
									xl: '1.5rem',
								},
							}}>GDSC x Build with AI Proudly Presents</Typography>
							<Typography
								variant="h2"
								sx={{
									fontWeight: 700,
									textTransform: 'uppercase',
									textAlign: 'center',
									color: 'black',
									letterSpacing: '2px',
									fontSize: {
											xs: '3rem',
											md: '3rem',
											lg: '3.5rem',
											xl: '4rem',
										},
								}}
							>
								HackUSF
							</Typography>
							<Typography
								variant="h3"
								sx={{
									fontWeight: 700,
									pb: 1.2,
									textAlign: 'center',
									color: 'black',
									letterSpacing: '1px',
									fontSize: {
											xs: '2rem',
											md: '2rem',
											lg: '2.5rem',
										},
								}}
							>
								April 5-6, 2025
							</Typography>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									gap: '1rem',
									justifyContent: 'center',
									alignItems: 'center',  // Center the boxes vertically
								}}
							>
								{/* <Box
									sx={{
										fontSize: {
											xs: '14px',
											sm: '16px',
										},
										borderRadius: '20px',
										border: '2px solid black',
										padding: '0.75rem',
										'&:hover': {
										backgroundColor: '#FF6B6B'
										},
									}}
								>
									April 5-6
								</Box> */}
								<Box
									sx={{
										fontSize: {
											xs: '14px',
											sm: '16px',
										},
										borderRadius: '20px',
										border: '2px solid black',
										padding: '0.75rem',
										'&:hover': {
										backgroundColor: '#A388ED'
										},
									}}
								>
									Tampa, FL
								</Box>
								<Box
									sx={{
										fontSize: {
											xs: '14px',
											sm: '16px',
										},
										borderRadius: '20px',
										border: '2px solid black',
										padding: '0.75rem',
										'&:hover': {
										backgroundColor: '#FD9745'
										},
									}}
								>
									24 Hours
								</Box>
							</Box>
						</div>
						<div className={styles.herolinks}>
							<ApplyButton />
							<p>
								Join the{' '}
								<a href="https://hackusf.devpost.com/" target="_blank">
									Devpost
								</a>{' '}
								and{' '}
								<a href="https://discord.gg/HfUZZpEJHE" target="_blank">
									Discord
								</a>
								!


							</p>
							<p>
								All the information here:{' '}
								<a href="https://mina-meowmeow.notion.site/USF-Hack-Hacker-Guide-18f761666cf580989f49dbeca7f606c3" target="_blank">
									Hacker&apos;s Guide
								</a>
							</p>
						</div>
					</div>

					<Box 
						sx={{
							width: '100%',
							maxWidth: { xs: '90%', sm: '65%', md: '50%', lg: '40%' },
							height: 'auto', // Ensures the container's height adjusts with the image
							display: 'flex', 
							justifyContent: 'center', // Center horizontally
							alignItems: 'center', // Center vertically
							position: 'relative', // Keeps the image positioned correctly
						}}
					>
						<Image
							src="/fox_collage.png"
							alt="Fox Collage - HackUSF"
							width={600} // Image width for aspect ratio
							height={600} // Image height for aspect ratio
							layout="responsive"
							objectFit="contain"
							quality={100}
							loading="lazy"
						/>
					</Box>

					
				</Box>

				<Box
					id="about"
					sx={{
						width: '100vw',
						pt: {xs: '10rem', sm: '8rem', md: '0rem', lg: '4rem'},
						pb: {xs: '12rem', sm: '10rem', md: '0rem', lg: '4rem'},
						height: '100vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: {
							xs: '1rem',
							lg: '4rem'
						},
						flexDirection: { xs: 'column', md: 'row' },
						backgroundImage: 'url("/scrap_bg.png")', // Corrected with `url()`
						backgroundSize: '100% 95%', // Ensures full coverage
						backgroundPosition: 'center', // Centers the image
						backgroundRepeat: 'no-repeat' // Prevents repeating
					}}
				>

					<Box
						sx={{
							width: {
								xs: '90%',
								md: '40%',
							},
							textAlign: 'center',
							fontSize: {
								xs: '1.2rem',
								sm: '1.4rem',
								md: '1.4rem',
								lg: '1.6rem',
							},
						}}
					>
						<Box mb={3}
							sx={{
								width: '100%',
								height: 'auto', // Ensures the container's height adjusts with the image
								display: 'flex',
								justifyContent: 'center', // Center horizontally
								alignItems: 'center', // Center vertically
								position: 'relative', // Keeps the image positioned correctly
							}}
						>
							<Image
								src="/about.png"
								alt="about - HackUSF"
								width={480} // Adjusted image width for a smaller size
								height={480} // Adjusted image height for the aspect ratio
								layout="intrinsic" // Keeps the aspect ratio and scales the image
								objectFit="contain" // Keeps the whole image visible within the container
								quality={100}
								loading="lazy"
							/>
						</Box>

						<p>
							The Google Developer Student Club at USF is hosting its first-ever{' '}
							<b>24-hour Hackathon</b>, bringing students from all universities together to innovate,
							build, and compete.
						</p>
					</Box>
					<Box bgcolor="#f5f5f5"
						sx={{

							fontSize: '1.4rem',
							borderRadius: '20px',
							border: '3px solid black',
							boxShadow: '5px 5px 0px black',
							padding: {xs: '1rem', md: '1.8rem'},
							pt: '4rem',
							pb: '4rem',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: {xs: '0.5rem', md: "0.8rem", lg: '1.2rem'}
						}}
					>
						<Typography variant="h3" fontWeight="bold" sx={{
							fontSize: {
									xs: '1.8rem',
									sm: '2rem',
									md: '2.2rem',
									lg: '2.4rem',
								},
						}}>
							Location
						</Typography>
						<div>
							<Box sx={{
								fontSize: {
									xs: '1.15rem',
									sm: '1.2rem',
									md: '1rem',
									lg: '1.4rem',
								},
							}}>
								<Link
									href="https://www.google.com/maps/place/ENB+-+Engineering+Building+II/@28.0586369,-82.418115,17z/data=!3m1!5s0x88c2c7b965c77a61:0x6d775b457200a0a9!4m10!1m2!2m1!1senb+usf!3m6!1s0x88c2c7b963af1e73:0x885216ce5072fc9b!8m2!3d28.0585491!4d-82.4156104!15sCgdlbmIgdXNmkgESZW5naW5lZXJpbmdfc2Nob29s4AEA!16s%2Fg%2F11clyt2m6n?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D"
									target="_blank"
									style={{
										color: 'inherit',
										textDecoration: 'underline',
										fontWeight: '500',
									}}
								>
									ENB - Engineering Building II
								</Link>
								<div>3820 USF Alumni Drive, Tampa, FL 33620</div>
							</Box>
						</div>
						<Box>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.8816865715253!2d-82.41811502452003!3d28.05863692598297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c7b963af1e73%3A0x885216ce5072fc9b!2sENB%20-%20Engineering%20Building%20II!5e0!3m2!1sen!2sus!4v1738160243407!5m2!1sen!2sus"
								style={{ border: 0, width: '100%', height: '100%' }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</Box>
					</Box>
				</Box>

        {/* <div id="prizes" className={styles.prizes}>
          <PrizeSection />
        </div> */}

				<Box id="faq" className={styles.faq} sx={{
					padding: {xs: '2rem', sm: '3rem', md: '10rem', lg: '8rem'},
					pt: {xs: '14rem', sm: '10rem', md: '10rem'},
					pb: {xs: '16rem', sm: '16rem', md: '10rem', lg: '12rem'},
					backgroundImage: 'url("/tornpaper2.png")', // Corrected with `url()`
					backgroundSize: '100% 95%', // Ensures full coverage
					backgroundPosition: 'center', // Centers the image
					backgroundRepeat: 'no-repeat', // Prevents repeating
				}}>
					<Box mb={3}
							sx={{
								width: '100%',
								height: 'auto', // Ensures the container's height adjusts with the image
								display: 'flex',
								justifyContent: 'center', // Center horizontally
								alignItems: 'center', // Center vertically
								position: 'relative', // Keeps the image positioned correctly
							}}
						>
							<Image
								src="/faq.png"
								alt="faq - HackUSF"
								width={300} // Adjusted image width for a smaller size
								height={300} // Adjusted image height for the aspect ratio
								layout="intrinsic" // Keeps the aspect ratio and scales the image
								objectFit="contain" // Keeps the whole image visible within the container
								quality={100}
								loading="lazy"
							/>
						</Box>
					<Typography sx={{ fontSize: {xs: '1.1rem', sm: '1.2rem', md: '1.4rem'}, mb: 3 }}>
						Everything you need to know about participating in HackUSF. If you
						have any other questions,{' '}
						<a href="mailto:gdscatusf@gmail.com">Contact Us!</a>
					</Typography>
					<FAQ />
				</Box>

				<Box id="sponsors" className={styles.sponsors}>
					<Sponsors />
				</Box>

				<Box className={styles.footer}>
					<Footer />
				</Box>
			</div>
		</div>
	);
}
