"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import styles from "./page.module.css";

const platinumSponsors = [

];

const goldSponsors = [
  { src: "/sponsor_logos/moffitt.png", alt: "Moffitt - HackUSF", link: "https://moffitt.org" },
  { src: "/sponsor_logos/google.png", alt: "Google - HackUSF", link: "https://about.google/" },
];

const silverSponsors = [

];

const bronzeSponsors = [

];

const partners = [
  { src: "/sponsor_logos/microsoft.png", alt: "Microsoft - HackUSF", link: "https://microsoft.com" },
  { src: "/sponsor_logos/coe.png", alt: "College of Engineering USF - HackUSF", link: "https://www.usf.edu/engineering/"  },
  { src: "/sponsor_logos/cob.png", alt: "Muma College of Business USF - HackUSF", link: "https://usf.edu/business" }
];

export default function Sponsors() {
  return (
    <Box className={styles.container} sx={{ pt: 12 }}>
      <Typography sx={{ fontSize: "4rem", fontWeight: 600, textAlign: "center" }}>Sponsors</Typography>
      <Typography fontSize="1.1rem">
        Interested in sponsoring HackUSF 2025? Email us at <a href="mailto:gdscatusf@gmail.com">gdscatusf@gmail.com</a>
      </Typography>
      
      <SponsorSection sponsors={platinumSponsors} />
      <SponsorSection sponsors={goldSponsors} />
      <SponsorSection sponsors={silverSponsors} />
      <SponsorSection sponsors={bronzeSponsors} />

      <Typography sx={{ fontSize: "4rem", fontWeight: 600, textAlign: "center", mt: 6 }}>Partners</Typography>
      <Box className={styles.sponsorsList}>
        {partners.map((partner, index) => (
          <SponsorLogo key={index} {...partner} />
        ))}
      </Box>
    </Box>
  );
}

function SponsorSection({ title, sponsors }) {
  if (sponsors.length === 0) return null;
  return (
    <>
      <Typography sx={{ fontSize: "2.5rem", fontWeight: 500, textAlign: "center" }}>{title}</Typography>
      <Box className={styles.sponsorsList}>
        {sponsors.map((sponsor, index) => (
          <SponsorLogo key={index} {...sponsor} />
        ))}
      </Box>
    </>
  );
}

function SponsorLogo({ src, alt, link }) {
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
  return (
    <Box className={styles.sponsor}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Image
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          onLoad={(event) => {
            const img = event.target;
            setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
          }}
        />
      </a>
    </Box>
  );
}
