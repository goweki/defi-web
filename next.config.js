/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pictures-kenya.jijistatic.com",
      },
    ],
  },
};

module.exports = nextConfig;
