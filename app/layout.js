import { Poppins, Abhaya_Libre } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

const abhayaLibre = Abhaya_Libre({
  variable: '--font-abhaya-libre',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
	title: 'HackUSF 2025 - Tampa\'s Hackathon at USF | Innovate & Compete',
	description: 'Join the USF GDSC Hackathon 2025! Code, innovate, and compete at the University of South Florida. Build projects, win prizes, and network. Register now!',
	keywords: ["hack", "hackathon", "usf", "university of south florida", "usf hackathon", "hackusf", "hack usf", "usf hack", "2025", "hackusf 2025"],
  authors: [{ name: "GDSC at USF", url: "https://hackusf.com" }],
  robots: "index, follow",
  openGraph: {
    title: "HackUSF 2025 - Tampa\'s Hackathon at USF | Innovate & Compete",
    description: 'Join the USF GDSC Hackathon 2025! Code, innovate, and compete at the University of South Florida. Build projects, win prizes, and network. Register now!',
    url: "https://hack-usf.vercel.app",
    siteName: "HackUSF",
    images: [
      {
        url: "/fox_collage.png",
        width: 912,
        height: 710,
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${poppins.className}`}>
				<AppRouterCacheProvider>
					<ClerkProvider>{children}</ClerkProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
