import random

finalMarbles = {"R": 0, "G":0, "B":0}
turnCounter = 0
while turnCounter < 10000:
    red = 3
    blue = 5
    green = 7
    bag = ["R"] * 3 + ["B"] * 5 + ["G"] * 7

    random.shuffle(bag)

    while red > 0 and blue > 0 and green > 0:
        currentMarble = bag.pop()
        if currentMarble == "R":
            red -= 1
            if red == 0:
                finalMarbles["R"] += 1
                break
        if currentMarble == "B":
            blue -= 1
            if blue == 0:
                finalMarbles["B"] += 1
                break
        if currentMarble == "G":
            green -= 1
            if green == 0:
                finalMarbles["G"] += 1
                break
    print(bag)
    turnCounter += 1

print(finalMarbles)
print(finalMarbles["R"] + finalMarbles["G"] + finalMarbles["B"])
print(finalMarbles["R"] / (finalMarbles["R"] + finalMarbles["G"] + finalMarbles["B"]))