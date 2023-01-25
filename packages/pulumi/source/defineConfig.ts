import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import { DeploymentConfig } from './types'

export function defineConfig (config: DeploymentConfig)
{
    const stack = pulumi.getStack()
    if (config?.createNamespace)
    {
        let namespaceDetails = {}
        if (typeof config?.createNamespace === 'string')
        {
            namespaceDetails = {
                metadata: {
                    name: config?.createNamespace
                }
            }
        }

        config.namespace = new k8s.core.v1.Namespace(stack, namespaceDetails)
    }

    // TODO: Export outputs
    for (const resource of config.resources)
        resource(config)
}