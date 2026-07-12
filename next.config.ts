import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* WebP uniquement : l'encodage AVIF des grandes photos (ex. les portraits
       Pexels de ~4000 px) prend > 60 s et laisse les images vides à l'écran. */
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      // La vitrine a déménagé de /accueil vers la racine du site
      { source: "/accueil", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
