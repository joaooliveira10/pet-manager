import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilita o modo standalone para deploy com Docker
  output: "standalone",
  // Habilita o React Compiler
  reactCompiler: true,
  // Configuração de imagens para domínios externos
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pet-manager-api.geia.vip",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3dev.pjc.mt.gov.br",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
