import { core } from '@pulumi/kubernetes'

export interface StackConfig
{
    stack: string
    namespace?: core.v1.Namespace
    commonAnnotations?: Record<string, string>
    commonLabels?: Record<string, string>
}

export type ComponentDeployment = (config: StackConfig) => object | void | undefined
export type Component = (options?: object) => ComponentDeployment

export interface DeploymentConfig extends StackConfig
{
    createNamespace?: string | boolean
    resources: (ComponentDeployment | Component)[]
}

export type DeploymentFn = (stack: string) => DeploymentConfig | void | undefined

export type Deployment = DeploymentFn | DeploymentConfig
