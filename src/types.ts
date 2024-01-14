export type Network = {
    ip: Address
    mask: Address
    shortMask: number

    network: Address
    broadcast: Address
    networkClass: NetworkClass | null

    minHost: Address
    maxHost: Address

    subnets: number
    subnetHosts: number
    totalHosts: number
}

export type NetworkClass = {
    name: string

    start: number
    end: number

    maskShort?: number
    maskLong?: string
}

export type Address = {
    dec: string[]
    bin: string[]
}

export type NetworkBroadcast = {
    network: Address
    broadcast: Address
}

export type MinMaxHost = {
    minHost: Address,
    maxHost: Address
}

export type HostSubnets = {
    subnets: number
    subnetHosts: number
    totalHosts: number
}