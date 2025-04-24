import withPWADefault from 'next-pwa';

const withPWA = withPWADefault.default ?? withPWADefault;

/** @type {import('next').NextConfig} */
const baseConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

export default withPWA(pwaConfig)(baseConfig);
