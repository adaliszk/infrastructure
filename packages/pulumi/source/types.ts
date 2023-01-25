import { core } from '@pulumi/kubernetes'

export interface StackConfig
{
    namespace?: core.v1.Namespace
    commonAnnotations?: object
    commonLabels?: object
}

export type ComponentDeployment = (config: StackConfig) => object | void | undefined
export type Component = (options?: object) => ComponentDeployment

export interface DeploymentConfig extends StackConfig
{
    createNamespace?: string | boolean
    kubeconfig?: string
    resources: ComponentDeployment[]
}


export interface ResourceAllocation
{
    memory?: string
    cpu?: string
}


export interface ResourceAllocationConfig
{
    requests?: ResourceAllocation,
    limits?: ResourceAllocation,
}
