import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com","avatars.githubusercontent.com","lh3.googleusercontent.com"],
  },
  eslint:{
    ignoreDuringBuilds:true,
  }
  
};

export default nextConfig;
