module.exports = {
    env: {
        baseUrl:
            process.env.process.env.VERCEL_URL ||
            process.env.process.env.BASE_URL,
    },
    images: {
        domains: ['m.media-amazon.com'],
        deviceSizes: [320, 576, 768, 992, 1200],
    },
}
