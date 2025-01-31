import React from 'react';
import PrizeListing from './PrizeListing';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4,
	},
	wordsPerSentence: {
		max: 16,
		min: 4,
	},
});

const YapContent = () => {
	return (
		<Box
			sx={{
				width: 'min(400px, 80vw)',
				paddingX: '2rem',
				paddingY: '1rem',
				display: {
					xs: 'none',
					md: 'block',
				},
			}}
		>
			<Typography>{lorem.generateParagraphs(1)}</Typography>
		</Box>
	);
};

{
	/* <PrizeListing
				prizeName="1st place"
				prizeDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velitconsequatur explicabo quasi. Magni amet ut quo! Quis modi pariatur quo
				eius, quos, rem quaerat voluptatibus unde quasi fugit corrupti"
			/>
			<PrizeListing
				prizeName="2nd place"
				prizeDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velitconsequatur explicabo quasi. Magni amet ut quo! Quis modi pariatur quo"
			/>
			<PrizeListing
				prizeName="3rd place"
				prizeDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velitconsequatur explicabo quasi. Magni amet ut quo! Quis modi pariatur quo
				eius, quos, rem quaerat voluptatibus unde quasi fugit corrupti psum dolor sit amet, consectetur adipisicing elit. Velitconsequatur explicabo quasi. Magni amet ut quo!"
			/> */
}
const PrizeSection = () => {
	return (
		<>
			<Typography variant="h1" fontWeight={'bold'} marginBottom={'2rem'}>
				Prizes
			</Typography>
			<Grid container>
				<Grid item="true" xs={12} md={6} lg={3}>
					<YapContent />
					<YapContent />
					<PrizeListing
						prizeName="1st place"
						prizeDescription={lorem.generateParagraphs(1)}
					/>
					<YapContent />
				</Grid>
				<Grid item="true" xs={12} md={6} lg={3}>
					<PrizeListing
						prizeName="1st place"
						prizeDescription={lorem.generateParagraphs(1)}
					/>
					<YapContent />
					<PrizeListing
						prizeName="1st place"
						prizeDescription={lorem.generateParagraphs(1)}
					/>
				</Grid>
				<Grid item="true" xs={12} md={6} lg={3}>
					<YapContent />
					<PrizeListing
						prizeName="1st place"
						prizeDescription={lorem.generateParagraphs(1)}
					/>
					<YapContent />
					<PrizeListing
						prizeName="1st place"
						prizeDescription={lorem.generateParagraphs(1)}
					/>
				</Grid>
				<Grid item="true" xs={12} md={6} lg={3}>
					<PrizeListing
						prizeName="1st place"
						prizeDescription={lorem.generateParagraphs(1)}
					/>
					<YapContent />
					<YapContent />
				</Grid>
			</Grid>
		</>
	);
};

export default PrizeSection;
