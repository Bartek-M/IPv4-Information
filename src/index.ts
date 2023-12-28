// IPv4 Information
import { main } from "./network.js"

const hello: string = "IPv4 Information"
console.log(hello)

console.log(main("192.168.0.1".split("."), "255.255.255.0".split(".")))