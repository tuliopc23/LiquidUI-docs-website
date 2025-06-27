module.exports = {
    ci: {
        collect: {
            url: [
                'http://localhost:3000',
                'http://localhost:3000/getting-started',
                'http://localhost:3000/components',
                'http://localhost:3000/components/button',
                'http://localhost:3000/components/card',
                'http://localhost:3000/examples',
                'http://localhost:3000/theming',
            ],
            startServerCommand: 'npm run start',
            startServerReadyPattern: 'ready on',
            numberOfRuns: 3,
        },
        assert: {
            assertions: {
                'categories:performance': ['warn', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.95 }],
                'categories:best-practices': ['warn', { minScore: 0.9 }],
                'categories:seo': ['warn', { minScore: 0.9 }],
                'categories:pwa': 'off',
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
}; 