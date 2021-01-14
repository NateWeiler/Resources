"""
Python code snippets vol 35:
172-Encrypt and decrypt a string
stevepython.wordpress.com

pip3 install cryptography

source:
https://stackoverflow.com/questions/27335726/
how-do-i-encrypt-and-decrypt-a-string-in-python

"""
from cryptography.fernet import Fernet

key = Fernet.generate_key() #this is your "password"
cipher_suite = Fernet(key)

# Enter text to encode here.
encoded_text = cipher_suite.encrypt(b"Your darkest secret")
print("encoded text:\n", encoded_text)

#save to text file if you want, or comment out.
with open("enc-text.txt", "wb") as text_file:
    text_file.write(encoded_text)

# Print decoded text into shell if required.
decoded_text = cipher_suite.decrypt(encoded_text)
print("\n\ndecoded text:", decoded_text)
