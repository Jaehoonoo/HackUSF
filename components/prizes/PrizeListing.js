import React from 'react';
import { Box, Typography } from '@mui/material';

const PrizeListing = ({ prizeName, prizeImgSrc, prizeDescription }) => {
	return (
		<Box
			sx={{
				border: '5px solid black',
				boxShadow: '5px 5px 0 black',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '2rem',
				margin: '2rem',
				minHeight: '350px',
				width: 'min(400px, 80vw)',
			}}
		>
			<Typography variant="h3" fontWeight="bold">
				{prizeName}
			</Typography>
			<Box
				sx={{
					width: '90%',
					height: '180px',
					backgroundColor: 'red',
					margin: '1rem',
				}}
			></Box>
			<Typography>{prizeDescription}</Typography>
		</Box>
	);
};

export default PrizeListing;
