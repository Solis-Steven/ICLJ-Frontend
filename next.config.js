/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
          {
            source: '/',
            destination: '/users/home',
            permanent: true,
          },
        ]
    },
}

module.exports = nextConfig
