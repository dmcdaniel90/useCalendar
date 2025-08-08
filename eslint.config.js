module.exports = {
    root: true,
    ignorePatterns: ['node_modules/*', 'dist/*'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/tslint/config': 'off',
            },
        },
    ],
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
    parserOptions: {
        project: './tsconfig.json',
    },
};
