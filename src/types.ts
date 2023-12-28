export type Network = {
    ip: number[]
    mask: number[]

    networkAddr?: string[]
    broadcastAddr?: string[]
    networkClass?: string

    minHost?: number[]
    maxHost?: number[]

    subnetHosts?: number
    subnets?: number
}
