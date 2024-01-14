import { main } from "./network"
import { Network } from "./types"

function setText(id: string, text: any) {
    document.getElementById(id)!.innerHTML = String(text)
}

function setInformation(network: Network, currentSet: "radioDecimal" | "radioBinary") {
    const format = currentSet == "radioDecimal" ? "dec" : "bin" 

    setText("calculated-ip", network.ip[format].join("&#8203."))
    setText("calculated-mask", network.mask[format].join("&#8203."))

    setText("calculated-network", network.network[format].join("&#8203."))
    setText("calculated-broadcast", network.broadcast[format].join("&#8203."))

    setText("calculated-minHost", network.minHost[format].join("&#8203."))
    setText("calculated-maxHost", network.maxHost[format].join("&#8203."))

    setText("calculated-subnets", network.subnets)
    setText("calculated-subnetHosts", network.subnetHosts)
    setText("calculated-totalHosts", network.totalHosts)
}

var information = main("10.10.0.1".split("."), "255.0.0.0".split("."))
var currentSet: "radioDecimal" | "radioBinary" = "radioDecimal"

document.getElementById("btn-calculate")!.addEventListener("click", () => {
    setInformation(information, currentSet)
})

document.getElementsByName("radioDecBin")?.forEach((el) => el.addEventListener("click", () => {
    if (currentSet == el.id || (el.id != "radioDecimal" && el.id != "radioBinary")) return

    currentSet = el.id
    setInformation(information, currentSet)
}))