import { url } from "inspector";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "*.supabase.co", 
        pathname: '/storage/v1/object/public/Paintings/**',
      },
    ],
  },
};

export default nextConfig;
