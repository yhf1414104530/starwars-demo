/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'file.kkx88.cn',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
