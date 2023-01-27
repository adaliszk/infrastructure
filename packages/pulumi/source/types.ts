import {core} from '@pulumi/kubernetes'

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
    resources: ComponentDeployment[]
}

export type DeploymentFn = (stack: string) => DeploymentConfig | void | undefined

export type Deployment = DeploymentFn | DeploymentConfig

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

export interface BitnamiPersistentVolumeClaim
{
    storageClass?: string
    subPath?: string
    accessModes?: string[]
    size?: string
    annotations?: object
}

export interface BitnamiIngress
{
    hostname: string
    controller: string
    annotations?: object
    tls?: boolean
}

export interface BitnamiVolumePermissions
{
    enabled?: boolean
    resources?: ResourceAllocationConfig
    containerSecurityContext?: {
        enabled?: boolean
        runAsUser?: number
    }
}

export interface BitnamiMetrics
{
    enabled?: boolean
    resources?: ResourceAllocationConfig
    annotations?: object
    labels?: object
}

export interface BitnamiImage
{
    registry?: string
    repository?: string
    tag?: string
    digest?: string
    pullPolicy?: 'Always' | 'Never' | 'IfNotPresent'
    pullSecrets?: string[]
    debug?: boolean
}

export interface BitnamiProbeConfig
{
    enabled?: boolean
    initialDelaySeconds?: number
    periodSeconds?: number
    timeoutSeconds?: number
    failureThreshold?: number
    successThreshold?: boolean
}

export interface BitnamiPodSecurityContext
{
    enabled?: boolean
    fsGroup?: number
}

export interface BitnamiContainerSecurityContext
{
    enabled?: boolean
    runAsUser?: number
    runAsNonRoot?: boolean
}