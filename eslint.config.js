import neostandard, { plugins, resolveIgnoresFromGitignore } from 'neostandard'
import svelte from 'eslint-plugin-svelte'
import svelteConfig from './svelte.config.js'

// The codebase indents with 4 spaces rather than neostandard's default of 2
const INDENT = 4

export default [
    ...neostandard({
        ts: true,
        env: ['browser', 'node'],
        ignores: resolveIgnoresFromGitignore()
    }),
    {
        rules: {
            '@stylistic/indent': ['error', INDENT]
        }
    },

    ...svelte.configs['flat/recommended'],
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parserOptions: {
                // Components are written in TypeScript, so the script blocks
                // need the TypeScript parser nested inside the svelte one
                parser: plugins['typescript-eslint'].parser,
                extraFileExtensions: ['.svelte'],
                svelteConfig
            }
        },
        rules: {
            // svelte/indent understands markup, @stylistic/indent only sees script blocks
            '@stylistic/indent': 'off',
            'svelte/indent': ['error', { indent: INDENT }]
        }
    }
]
