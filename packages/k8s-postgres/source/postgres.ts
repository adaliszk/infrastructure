import {k8s, random, StackConfig, Component, ComponentDeployment} from '@adaliszk/pulumi'
import {PostgresChartOptions, PostgresOptions} from './types'


export const postgres: Component = (options?: PostgresOptions) =>
{
    const component: ComponentDeployment = (config: StackConfig) =>
    {
        if (!config.namespace) throw new Error('Namespace is required')

        const passwordOptions = {
            length: 32,
            special: true,
            overrideSpecial: '&%+?!*@=~'
        }

        const rootPassword = new random.RandomPassword('root-password', passwordOptions)
        const postgresPassword = new random.RandomPassword('postgres-password', passwordOptions)
        const repmgrPassword = new random.RandomPassword('repmgr-password', passwordOptions)

        const secret = new k8s.core.v1.Secret(`postgres-secret`, {
            metadata: {
                namespace: config.namespace.metadata.name,
                name: `psql-credentials`,
            },
            data: {
                'password': rootPassword.result.apply(v => Buffer.from(v).toString('base64')),
                'postgres-password': postgresPassword.result.apply(v => Buffer.from(v).toString('base64')),
                'repmgr-password': repmgrPassword.result.apply(v => Buffer.from(v).toString('base64')),
            }
        }, {dependsOn: [config.namespace, rootPassword, postgresPassword, repmgrPassword]})

        const values: PostgresChartOptions = {
            nameOverride: 'database',
            ...(options ?? {}),
            auth: {
                existingSecret: secret.metadata.name,
            }
        }

        const chart = new k8s.helm.v3.Release(`postgres-stack`, {
            name: 'psql',
            chart: 'postgresql',
            version: '12.1.11',
            namespace: config.namespace.metadata.name,
            repositoryOpts: {
                repo: 'https://charts.bitnami.com/bitnami'
            },
            waitForJobs: true,
            timeout: 600,
            values,
        }, {dependsOn: [config.namespace, secret]})
    }

    return component
}