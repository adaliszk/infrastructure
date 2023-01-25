import { postgres } from './dist/bundle.js'
import { defineConfig } from '@adaliszk/pulumi'

export default defineConfig({
    createNamespace: true,
    resources: [
        postgres(),
    ]
})