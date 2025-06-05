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
            'no-undef': 'off', 
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-empty-object-type': 'error',
            '@typescript-eslint/ban-types': ['error', {
                types: {
                    '{}': {
                        message: 'Use Record<string, unknown> instead',
                        fixWith: 'Record<string, unknown>'
                    },
                    'object': {
                        message: 'Use Record<string, unknown> instead',
                        fixWith: 'Record<string, unknown>'
                    }
                }
            }]
        }
    }
);