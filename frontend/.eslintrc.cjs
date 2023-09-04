module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'latest', // Update to the desired React version
        },
    },
    plugins: ['react-refresh', 'react', '@typescript-eslint'], // Include TypeScript ESLint plugin
    rules: {
        'react-refresh/only-export-components': 'warn',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Turn off rule for TS
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
};
