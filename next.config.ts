import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilita o modo standalone para deploy com Docker
  output: "standalone",
  // Habilita o React Compiler
  reactCompiler: true,
  // Configuração de imagens para domínio externo da API
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pet-manager-api.geia.vip",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
