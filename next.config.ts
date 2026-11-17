import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Fotos enviadas pelo painel ficam na pasta pública do Supabase
    remotePatterns: [
      new URL(
        'https://tbtxmnxjeciuzxrgoluf.supabase.co/storage/v1/object/public/**',
      ),
    ],
  },
};

export default nextConfig;
