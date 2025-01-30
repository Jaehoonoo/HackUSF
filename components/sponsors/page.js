"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import styles from "./page.module.css";

const sponsors = [
  { src: "/sponsor_logos/microsoft.png", alt: "Microsoft", link: "https://microsoft.com" },
  { src: "/sponsor_logos/moffitt.png", alt: "Moffitt", link: "https://moffitt.org" },
  { src: "/sponsor_logos/standoutstickers.png", alt: "Standout Stickers", link: "https://standoutstickers.com" }
];

export default function Sponsors() {
  return (
    <Box className={styles.container} sx={{mt: 12}}>
      <Typography
        sx={{
          fontSize: "4rem",
          fontWeight: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        Sponsors
      </Typography>
      <Typography fontSize="1.1rem">
        Interested in sponsoring HackUSF 2025? Email us at <a href="mailto:gdscatusf@gmail.com">gdscatusf@gmail.com</a>
      </Typography>
      <Box className={styles.sponsorsList}>
        {sponsors.map((sponsor, index) => (
          <SponsorLogo key={index} {...sponsor} />
        ))}
      </Box>
    </Box>
  );
}

// ✅ Updated SponsorLogo component using `onLoad`
function SponsorLogo({ src, alt, link }) {
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 }); // Default size

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
