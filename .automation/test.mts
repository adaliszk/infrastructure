import { type Client, runPipeline } from '@adaliszk/dagger'

await runPipeline(async (client: Client) =>
{
    const env = client.container().from('node:lts')
    const version = await env.withExec(['node', '--version']).stdout()
    console.log(`Node version: ${version}`)
})
