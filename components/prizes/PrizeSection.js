import React from 'react';
import PrizeListing from './PrizeListing';
import { Box } from '@mui/material';

const PrizeSection = () => {
	return (
		<Box>
			<PrizeListing
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
			/>
		</Box>
	);
};

export default PrizeSection;
