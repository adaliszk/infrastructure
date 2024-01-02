import { Client, connect } from '@dagger.io/dagger'

await connect(
    async (client: Client) =>
    {
        // get host directory
        const project = client.host().directory('.')
        console.log(project)
    },
    { LogOutput: process.stderr },
)
