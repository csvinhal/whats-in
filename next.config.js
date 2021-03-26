module.exports = {
    env: {
        backendUrl:
            process.env.BASE_URL ||
            `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    },
    images: {
        domains: ['m.media-amazon.com'],
        deviceSizes: [320, 576, 768, 992, 1200],
    },
}
