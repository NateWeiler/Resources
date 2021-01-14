from math import sqrt
def real_equal(a,b,c):
    root=(-b)/(2*a)
    print("Root is")
    print(root)

def real_unequal(a,b,c):
    root1=(-(b+(sqrt((b*b)-(4*a*c)))))/(2*a)
    root2=(-(b-(sqrt((b*b)-(4*a*c)))))/(2*a)
    print("Roots are\n")
    print(root1)
    print(root2)

def condition_check(a,b,c):
    cond=((b**2)-(4*a*c))
    if(cond>0):
        print("Determinent is more then 0\n"+"So roots are real and unequal")
        real_unequal(a,b,c)
    if(cond==0):
        print("Determinent is equal to 0\n"+"So roots are real and equal")
        real_equal(a,b,c)
    if(cond<0):
        print("Determinent is less then 0\n"+"So roots are imaginary")

if __name__ == '__main__':
    print("All quadratic equation is in form ax2+bx+c=0\n"+"To find roots of quadratic equation we need a,b,c values")
    try:
        a = int(input("Enter value of a :"))
        b = int(input("Enter value of b :"))
        c = int(input("Enter value of c :"))
    except:
        print("Enter correct values")
        exit()
    if(a == 0):
        print("It's not a quadratic equation")
        exit()
    condition_check(a,b,c)
