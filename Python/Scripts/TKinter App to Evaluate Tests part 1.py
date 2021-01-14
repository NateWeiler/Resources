import tkinter as tk


root = tk.Tk()


def name_it(frame_root):
    "Label and entry with the name"
    frame1 = frame_root
    lab_name = tk.Label(frame1, text="Name:")
    lab_name.pack(side="left")
    name = tk.Entry(frame1)
    name.pack()
    return frame1


v = []
counter = -1


def entry(frame1):
    global counter
    counter += 1
    v.append(tk.IntVar())
    return tk.Entry(frame1, textvariable=v[counter]).pack(side="left")


def question(frame_root, num):
    "Questions frame"
    frame1 = frame_root
    lab_name = tk.Label(frame1, text="Question {}:".format(num))
    lab_name.pack(side="left")
    for n in range(3):
        entry(frame1)
    return frame1


def calculate():
    values = [n.get() for n in v]
    sumval = sum(values)
    print(sumval)
    print("In a scale of 10: ", sumval / 4)


frame1 = name_it(tk.Frame(root))
frame1.pack()

for n in range(4):
    question(tk.Frame(root), n + 1).pack()


button = tk.Button(root, text="Calculate points", command=calculate)
button.pack()

root.mainloop()