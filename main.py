import os
from textwrap import wrap
os.system("cls")


# Getting data
ip = input("Put an IP address > ")
ip = {"bin": [], "decimal": ip.split(".")}

mask = input("Put an mask (leave blank for default) >")

# Converting to decimal
def convert_decimal(to_convert):
    decimal_output = []

    for i in range(len(to_convert)):
        num = 0
        decimal = 0
        converting = to_convert[i][::-1]

        for item in list(converting):
            if item == "1":
                decimal += 2 ** num

            num += 1

        decimal_output.append(str(decimal))

    return decimal_output

# Converting to binary
def convert_binary(to_convert, bit=0):
    bin_output = []

    for i in range(len(to_convert)):
        number = list(str(bin(int(to_convert[i]))).replace("0b", ""))

        for _ in range(bit - len(number)):
            number.insert(0, "0")

        number = "".join(number)
        bin_output.append(number)

    return bin_output


# Get mask
if "/" in mask:
    mask = int(mask.strip().replace("/", ""))
    mask = mask * "1" + ((32 - mask) * "0")
    mask = ".".join(convert_decimal(wrap(mask, 8)))



# Getting network class
first_num = int(ip["decimal"][0])

network_classes = {
    "A":[0, 126, 8, "255.0.0.0"], 
    "B":[128, 191, 16, "255.255.0.0"], 
    "C":[192, 223, 24, "255.255.255.0"], 
    "D":[224, 239, 0], 
    "E":[240, 254, 0], 
    "LOCAL":[127, 127, 8, "255.0.0.0"]
}
current_class = ""

for key in network_classes:
    if key == "LOCAL" and (first_num == network_classes[key][0]):
        current_class = key
        break

    if network_classes[key][0] <= first_num <= network_classes[key][1]:
        current_class = key

        if mask == "0":
            if key == "D" or key == "E":
                print("You have to specify mask")
                mask = "0.0.0.0"
                break

            mask = network_classes[key][3]

        break

if mask == "0":
    print("You have to specify mask")
    exit()

# Converting to ip and mask to binary
mask = {"bin":[], "decimal":mask.split(".")}
ip["bin"] = convert_binary(ip["decimal"], 8)
mask["bin"] = convert_binary(mask["decimal"], 8)


# Getting network address
network_address = {"bin":[], "decimal":[]}

for i in range(len(ip["bin"])):
    number = ""

    for j in range(len(ip["bin"][i])):
        if int(list(mask["bin"][i])[j]) == 1:
            number += list(ip["bin"][i])[j]
            continue
        
        number += "0"

    network_address["bin"].append(number)

network_address["decimal"] = convert_decimal(network_address["bin"])


# Getting broadcast
broadcast = {"bin":[], "decimal":[]}

for i in range(len(ip["bin"])):
    number = ""

    for j in range(len(ip["bin"][i])):
        if int(list(mask["bin"][i])[j]) == 1:
            number += list(ip["bin"][i])[j]
            continue
        
        number += "1"

    broadcast["bin"].append(number)

broadcast["decimal"] = convert_decimal(broadcast["bin"])


# Getting number of hosts and subnets
min_host = [network_address["decimal"][0], network_address["decimal"][1], network_address["decimal"][2], str(int(network_address["decimal"][3]) + 1)]
max_host = [broadcast["decimal"][0], broadcast["decimal"][1], broadcast["decimal"][2], str(int(broadcast["decimal"][3]) - 1)]

num_host = 2 ** ".".join(mask["bin"]).count("0") - 2
num_subnet = 2 ** int("".join(mask["bin"]).count("1") - network_classes[current_class][2]) 

total_hosts = f"  ||  Number of all usable hosts = {num_host * num_subnet}" if num_subnet != 1 else ""

# Outputting information
print(f"""
Python IPv4 Calculator
=======================
    IP = {'.'.join(ip['decimal'])}  ||  {'.'.join(ip['bin'])}
    Mask = {'.'.join(mask['decimal'])} (/{str(''.join(mask['bin'])).count('1')})  ||  {'.'.join(mask['bin'])}

    Class = {current_class}  ||  Range: {network_classes[current_class][0]} - {network_classes[current_class][1]}; Default Mask: /{network_classes[current_class][2]}

    Network address = {'.'.join(network_address['decimal'])}  ||  {'.'.join(network_address['bin'])}
    Broadcast = {'.'.join(broadcast['decimal'])}  ||  {'.'.join(broadcast['bin'])}

    Min host = {'.'.join(min_host)}
    Max host = {'.'.join(max_host)}

    Number of usable hosts per subnet = {num_host}{total_hosts}
    Number of subnets = {num_subnet}

[  128  |  64  |  32  |  16  |  8  |  4  |  2  |  1  ]  
""")