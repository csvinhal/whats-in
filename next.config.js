module.exports = {
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,POST',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value:
                            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ]
    },
    env: {
        backendUrl:
            process.env.BASE_URL ||
            `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
        mongoUri: process.env.MONGODB_URI,
        omdbApi: process.env.OMDB_API,
    },
    images: {
        domains: ['m.media-amazon.com'],
        deviceSizes: [320, 576, 768, 992, 1200],
    },
}
