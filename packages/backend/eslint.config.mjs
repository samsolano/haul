import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest
            }
        },
        rules: {
            'no-undef': 'off', // TypeScript handles this
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
        }
    }
);