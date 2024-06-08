/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api/gcp/:path*",
        destination: "https://storage.googleapis.com/:path*",
      },
    ];
  },
};

export default nextConfig;
