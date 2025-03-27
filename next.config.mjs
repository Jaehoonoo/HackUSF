import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: "public",
  dynamicStartUrl: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/hackusf.com/,
      handler: "NetworkFirst",
    },
  ],
});

export default pwaConfig(nextConfig);
