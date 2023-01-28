import type {Deployment, DeploymentConfig} from './types'
import * as pulumi from '@pulumi/pulumi'
import * as k8s from '@pulumi/kubernetes'


export function defineConfig(config: Deployment)
{
    const stack = pulumi.getStack()
    if (typeof config === 'function')
        config = config(stack) ?? {} as DeploymentConfig

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

    config.stack = stack

    // TODO: Export outputs
    for (const resource of config.resources)
        resource(config)
}