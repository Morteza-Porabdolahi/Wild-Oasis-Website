/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dknyxxzpptqbmnefcxkl.supabase.co',
        pathname: '/**',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
        port: ''
      }
    ]
  },
};

export default nextConfig;
