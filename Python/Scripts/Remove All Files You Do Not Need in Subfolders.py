#delete all mp4 files in the dir
import os
import glob
import shutil


def delete_all():
    print("Delete all mp4 in the folders? " + os.getcwd())
    ask = input("(y/n)>: ")
    if ask == "y":
        folders = [x for x in os.listdir(".") if os.path.isdir(x)]
        print("folders", folders)
        for f in folders:
            files = [x for x in os.listdir(f) if x.endswith(".mp4")]
            tsfiles = [x for x in os.listdir(f) if x.endswith(".ts")]
            print(files)
            if files != []:
                for file in files:
                    os.remove(f + "\\" + file)
                    print("removing: ", file)
            for ts in tsfiles:
                os.remove(f + "\\" + ts)
                print("removing: ", file)
        empty = [fol for fol in folders if os.listdir(fol) == []]
        print("empty", empty)
        for folder in empty:
            os.rmdir(folder)
            print("Removed empty folder:", folder)

    #look_for_mp4()


def look_for_mp4():
    for f in os.listdir():
        if not os.path.isfile(f):
            print(f)
            print(os.listdir(f))
            print("=======\n")

delete_all()