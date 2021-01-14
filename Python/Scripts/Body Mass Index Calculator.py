'''
96-Body Mass Index Calculator

Tested on Python V3.6 on Windows 7 and Linux Mint 19.1.

Good page here lets you convert anything to anything:
https://www.metric-conversions.org/

https://en.wikipedia.org/wiki/Body_mass_index
'''

weight = float (input("Weight in kilograms:"))
height = float (input("Height in centimeters:"))
bmi = round((weight / ((height / 100) ** 2)), 2)

print("--------------------------")
print ("Body Mass Index = ", bmi)
print("--------------------------")
print("The World Health Organisation says that a BMI of:")
print()
print("Less than 18.5 as underweight.")
print("More than 24 is considered overweight.")
print("More than 30 is considered obese.")
