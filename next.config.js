/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "_next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pictures-kenya.jijistatic.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },
};

module.exports = nextConfig;
