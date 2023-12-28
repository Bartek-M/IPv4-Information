import { Network } from "./types"
import { convertBinary, convertDecimal } from "./conversions.js"

const networkClasses = {
    A: [0, 126, 8, "255.0.0.0"],
    B: [128, 191, 16, "255.255.0.0"],
    C: [192, 223, 24, "255.255.255.0"],
    D: [224, 239, 0],
    E: [240, 254, 0],
    LOCAL: [127, 127, 8, "255.0.0.0"],
}

function getAddr(ip: string[], mask: string[]): [string[], string[]] {
    let networkAddr: string[] = []
    let broadcastAddr: string[] = []

    for (let i = 0; i < ip.length; i++) {
        let networkCurrent = ""
        let broadcastCurrent = ""

        for (let j = 0; j < ip[i].length; j++) {
            networkCurrent += parseInt(mask[i][j]) === 1 ? ip[i][j] : "0"
            broadcastCurrent += parseInt(mask[i][j]) === 1 ? ip[i][j] : "1"
        }

        networkAddr.push(networkCurrent)
        broadcastAddr.push(broadcastCurrent)
    }

    return [convertDecimal(networkAddr), convertDecimal(broadcastAddr)]
}

export function main(ip: string[], mask: string[]): Network {
    const ipBin = convertBinary(ip, 8)
    const maskBin = convertBinary(mask, 8)

    const addr = getAddr(ipBin, maskBin)

    return {
        ip: [192, 168, 0, 1],
        mask: [255, 255, 255, 0],
        networkAddr: addr[0],
        broadcastAddr: addr[1]
    }
}
