'''
27-Profanity Checker
(replacement for google address snippet)
pip install profanity-check

From authors page here:
https://victorzhou.com/blog/better-profanity-detection-with-scikit-learn/
and
https://github.com/vzhou842/profanity-check

Only changes I made was to round the np array to 3 decimal
places to be more readable. and the friendly outputs.
'''

from profanity_check import predict, predict_prob

# Your input string.
check_string = "dirty sanchez"

result = (predict_prob([check_string])).round(2)

# All this guff is for this demo.
print("0 = Clean, 1 = profanity, or a prediction is is made 0.01 to 0.99")
print()
print("Profanity check on:" ,check_string)
print("Rating: ", result)
