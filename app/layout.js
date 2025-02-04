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
	title: 'HackUSF 2025',
	description: 'GDSC at USF Offical Hackathon Website',
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
