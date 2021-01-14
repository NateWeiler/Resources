'''Check if string is a palindrome'''

TEST_STRING = "stop pots"

if TEST_STRING == TEST_STRING[::-1]:

    print("Yes, this string is a palindrome: ", TEST_STRING)

else:
    print("No, this string is not a palindrome:", TEST_STRING)
