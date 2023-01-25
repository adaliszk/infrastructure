import type { ResourceAllocationConfig } from '@adaliszk/pulumi'

export interface PostgresOptions
{
    postgresql?: {
        replicaCount?: number
        nodeSelector?: object
        resources?: ResourceAllocationConfig
        annotations?: object
        labels?: object
    }
    metrics?: {
        enabled: boolean
        resources?: ResourceAllocationConfig
        annotations?: object
        labels?: object
    }
    persistence?: {
        enabled: boolean
        storageClass?: string
        size?: string
        annotations?: object
        labels?: object
    }
    networkPolicy?: {
        enabled: boolean
        allowExternal?: boolean
    }
}