import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const pwaConfig = withPWA({
  dest: "public",
  dynamicStartUrl: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/hackusf.com/,
        handler: 'NetworkFirst',
      },
    ],
});

export default pwaConfig(nextConfig);

