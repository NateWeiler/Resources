# Sum Numbers

# In a given text you need to sum the numbers while excluding any digits that form part of a word.

# The text consists of numbers, spaces and letters from the English alphabet.

# Input: A string.

# Output: An int.

# Example:

sum_numbers('hi') == 0
sum_numbers('who is 1st here') == 0
sum_numbers('my numbers is 2') == 2
sum_numbers('This picture is an oil on canvas '
 'painting by Danish artist Anna '
 'Petersen between 1845 and 1910 year') == 3755
sum_numbers('5 plus 6 is') == 11
sum_numbers('') == 0
