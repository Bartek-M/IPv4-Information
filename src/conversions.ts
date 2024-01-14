export function convertBinary(toConvert: string[], bit: number = 8): string[] {
    let converted: string[] = []

    for (const char of toConvert) {
        let num: string[] = parseInt(char).toString(2).split("")
        let n = bit - num.length

        for (var i = 0; i < n; i++) {
            num.unshift("0")
        }

        converted.push(num.join(""))
    }

    return converted
}

export function convertDecimal(toConvert: string[]): string[] {
    let converted: string[] = []

    for (const char of toConvert) {
        converted.push(String(parseInt(char, 2)))
    }

    return converted
}
