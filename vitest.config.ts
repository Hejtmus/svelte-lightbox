import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Component behaviour is covered end to end by playwright, so the unit suite
// deliberately stays on the plain modules behind the components
export default defineConfig({
    resolve: {
        alias: {
            $lib: fileURLToPath(new URL('./src/lib', import.meta.url))
        }
    },
    test: {
        environment: 'jsdom',
        include: ['tests/unit/**/*.test.ts']
    }
})
