import smtplib
from random import choice
import os

# change the password as you see in the last post
password = "xxxxxxxxxxxxxxxxxxxx"

pss = {
    "dDApofsfdsflito": "010",
    "wGdiordsdfsasaano": "001",
    "fGuaafrisdfglia": "100",

    }


destinatari = [
    "dfsdf@gmail.com",
    "sdfsd.dfsdf@hotmail.it",
    "sdfsdfsdfghh@icloud.com",
]


schema = """
Your code is {}

Write what is {} x {}

The exercise is here
https://formazione.github.io/Programmi20192020/text_5bs/quiz/risposta_email_02.html
"""
def new_schema(schema):
    numeri = [1, 3, 5, 7]
    messaggi = []
    soluzioni = []


    for s in pss:
        num1, num2 = choice(numeri), choice(numeri)
        traccia = schema.format(pss[s], num1, num2)
        messaggi.append(traccia)
        soluzioni.append(s + "\n" + traccia + "[S: " + str(num1 * num2) + "]\n\n")


    with open("soluzioni.txt", "w") as file:
        file.write("".join(soluzioni))
    print(*soluzioni)
    os.startfile("soluzioni.txt")




def manda_email():
    for n, mess in enumerate(messaggi):
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login("fssgh.gidfsdo@gmail.com", password)
        server.sendmail(
            "fssgh.gidfsdo@gmail.com",
            destinatari[n],
            messaggi[n])
        server.quit()


def send():
    manda_email()


import tkinter as tk


root = tk.Tk()

label = tk.Label(
    root,
    text="Click the button to send \nthe personal code to the stundets",
    bg="gold")
label.pack()
button = tk.Button(root, text="Send the email", command=send)
button.pack()

button2 = tk.Button(root, text="See new schema", command=lambda: new_schema(text.get("0.0", tk.END)))
button2.pack()

text = tk.Text(root)
text.pack()
text.insert("0.0", schema)

new_schema(text.get("0.0", tk.END))

root.mainloop()