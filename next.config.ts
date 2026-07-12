import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // La vitrine a déménagé de /accueil vers la racine du site
      { source: "/accueil", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
