from random import random
from random import randint
from random import randrange


def rnd():
    guess = []
    for i in range(3):
        n = randrange(1, 10)
        guess.append(n)
    return guess 


a = rnd()
a = [str(x) for x in a]
a = "".join(a)

score = 10
for t in range(10):
    print("\nTry n." + str(t+1))
    print("=======")
    print("What were the numbers?")
    answer = input("> ")

    if answer == a:
        print("\n***********\n")
        print("Good, you guessed")
        print("Your score is " + str(score))
        break
    else:
        count = 0
        pos = 0
        for n, i in enumerate(a):
            if a[n] == answer[n]:
                count += 1
            elif a[n] in answer:
                pos += 1
        print("_______")
        print(str(count) + " numbers right")
        print(str(pos) + " numbers" + " are not in the right position")
        score -= 1

print("The solution was:" + a)
print("Your last try was:" + answer)