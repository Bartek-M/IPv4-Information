import { main } from "./network"
import { Network } from "./types"

const setText = (id: string, text: any) => (document.getElementById(id)!.innerHTML = String(text))

function setInformation(network: Network, currentSet: "radioDecimal" | "radioBinary") {
    const format = currentSet == "radioDecimal" ? "dec" : "bin"

    setText("calculated-ip", network.ip[format].join("&#8203."))
    setText("calculated-mask", network.mask[format].join("&#8203.") + (format == "dec" ? ` (/${network.shortMask})` : ""))

    setText("calculated-class", network.networkClass?.name)
    setText("calculated-range", `${network.networkClass?.start} - ${network.networkClass?.end}`)
    setText("calculated-short-mask", network.networkClass?.maskShort ? `/${network.networkClass?.maskShort}` : "-")

    setText("calculated-network", network.network[format].join("&#8203."))
    setText("calculated-broadcast", network.broadcast[format].join("&#8203."))

    setText("calculated-minHost", network.minHost[format].join("&#8203."))
    setText("calculated-maxHost", network.maxHost[format].join("&#8203."))

    setText("calculated-subnets", network.subnets)
    setText("calculated-subnetHosts", network.subnetHosts)
    setText("calculated-totalHosts", network.totalHosts)
}

var information = main("192.168.0.1".split("."), "255.255.255.0".split("."))
var currentSet: "radioDecimal" | "radioBinary" = "radioDecimal"

document.getElementById("btn-calculate")!.addEventListener("click", () => {
    var ip: string[] = []
    var mask: string[] = []

    document.getElementsByName("ip").forEach((el) => ip.push((el as HTMLInputElement).value))
    document.getElementsByName("mask").forEach((el) => mask.push((el as HTMLInputElement).value))

    information = main(ip, mask)
    setInformation(information, currentSet)
})

document.getElementsByName("radioDecBin")?.forEach((btn) =>
    btn.addEventListener("click", () => {
        if (currentSet == btn.id || (btn.id != "radioDecimal" && btn.id != "radioBinary")) return

        currentSet = btn.id
        setInformation(information, currentSet)
    })
)
