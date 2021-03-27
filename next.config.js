module.exports = {
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
