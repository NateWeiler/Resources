#!/usr/bin/python3

# Python Program to Convert Kilometers to Miles

# Since 1 kilometer is equal to 0.621371 miles, we can get the equivalent miles by multiplying kilometers with this factor.

# Taking kilometers input from the user
kilometers = float(input("Enter value in kilometers: "))

# conversion factor
conv_fac = 0.621371

# calculate miles
miles = kilometers * conv_fac
print('%0.2f kilometers is equal to %0.2f miles' %(kilometers,miles))

# Output

# Enter value in kilometers: 3.5

# 3.50 kilometers is equal to 2.17 miles

# Here, the user is asked to enter kilometers. This value is stored in the kilometers variable.

# Since 1 kilometer is equal to 0.621371 miles, we can get the equivalent miles by multiplying kilometers with this factor.

# kilometers = miles / conv_fac
