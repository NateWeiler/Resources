#IMPORTING MODULES
import os
import pickle
import time

#### CLASS CUSTOMER ####

class customer:                                     
    def __init__(self):
        #instance variables
        self.id=str(time.time())
        self.name='ABC'
        self.age=0
        self.sex='NA'
        
    def Input(self):
        self.name=raw_input('Enter name:')
        self.age=input("enter age")
        self.sex=raw_input("enter sex")
                
    def show(self):
        print '\n' ,"customer details",'\n'
        print "Id" ,"\t",self.id             
        print "Name",'\t',  self.name
        print "age" ,'\t', self.age
        print "sex", '\t',self.sex

##Functions related to class customer##

def customer1():
    ans=raw_input('Are you a new customer?')
    if ans.upper()=='YES':
        p1=customer()
        p1.Input()
        fw=open('Customer.dat','ab')
        #taking values for new customer and storing it to file
        pickle.dump(p1,fw)
        p1.show()
        fw.close()
        print "new customer added to file"
                      
    elif ans.upper()=='NO':
        keyname=raw_input('enter your name')
        found=0
        fr=open('Customer.dat','rb')
        try:
            while True:
                      p1=pickle.load(fr)
                      if p1.name==keyname:
                          print "Hello", keyname
                          p1.show()
                          #displaying the records for regular customer
                          found=1
                          break
        except EOFError:
            fr.close()
        if found==0:
            print "Old record not found"
            print "Sorry For Inconvinience"
            print "Please fill all entries again"
            p1=customer()
            p1.Input()
            fw=open('Customer.dat','ab')                                                               
            pickle.dump(p1,fw)
            p1.show()
            fw.close()
            print "new customer added to file"
                

#### CLASS ACADEMICS ####
            
class academics():
    def __init__(self):
        #instance variables
        self.bname='na'
        self.price=0
        self.qty=0
        self.bid=0
        self.grade="I"
        
    def Input(self):
        self.bid=input('Enter book id')
        self.bname=raw_input('Enter book name :')
        self.price=input("Enter price")
        self.qty=input('Enter quantity')
        self.grade=raw_input("Enter the grade the book is for :")
        
    def show(self):
        print '\n',"Book details",'\n'
        print "Book id",'\t', self.bid
        print "Name",'\t',  self.bname
        print "Price" ,'\t', self.price
        print "For Grade ",'\t',self.grade
        print "Quantity", '\t',self.qty

    def modify(self):
        self.price=input('Enter new price of book')

## Functions related to class academics ##
def academics1():
    a1=academics()
    a1.Input()
    fw=open('Academics.dat','ab')                                                               
    pickle.dump(a1,fw)
                                                                                                        #storing the books of academics section
    fw.close()
    print "Book added to file"

def VeiwAcademics():
    fr=open('Academics.dat','rb')
    try:
        while True:
            a1=pickle.load(fr)
            a1.show()                                                                                   #showing the books stored in academic section
    except EOFError:
       fr.close()

def VeiwSelected():
    answer=raw_input('Enter the grade/class for which you want the book : ( Enter grade from I to XII)')
    fr=open('Academics.dat','rb')
    
    try:
        while True:                                                                                 #filtering on the basis of grades
            a1=pickle.load(fr)
            if a1.grade==answer.upper():
                a1.show()
                
           
    except EOFError:
        fr.close()

def updateAcademics(b_id):                                                              #FOR ADMIN
    fr=open("Academics.dat",'rb')
    fw=open('temp.dat','wb')                                                                 #updating the books of admin section
    found=0
    try:
        while True:
            a1=pickle.load(fr)
            if a1.bid==b_id:
                found=1
                a1.modify()
                pickle.dump(a1,fw)
            else:
                pickle.dump(a1,fw)
    except EOFError:
        fr.close()
    fw.close()
    os.remove('Academics.dat')
    os.rename('temp.dat','Academics.dat')
    if found==0:
        print "No matching record"


def BuyAcademics(book_id):
    fr=open("Academics.dat",'rb')
    fw=open('temp.dat','wb')
    found=0
    try:                                                                                                                      #FOR CUSTOMER
        while True:
            a1=pickle.load(fr)                                                                                         #function for buying the books
            if a1.bid==book_id:
                if a1.qty<=0:
                    print "Sorry, book is out of stock"
                else:
                    found+=1
                    print "Please pay", a1.price, "for the book", a1.bname
                    a1.qty-=1
                pickle.dump(a1,fw)
                
            else:
                pickle.dump(a1,fw)
    
    except EOFError:
        fr.close()
    fw.close()
    os.remove('Academics.dat')
    os.rename('temp.dat',"Academics.dat")
    if found==0:
        print "Wrong Id entered"

                
        
###### CLASS CGN(comics and graphics novels) #######

class CGN():
    def __init__(self):
        #instance variables
        self.bname='na'
        self.price=0
        self.qty=0
        self.bid=0
        
    def Input(self):
        self.bid=input('Enter book id')
        self.bname=raw_input('Enter book name :')
        self.price=input("Enter price")
        self.qty=input('Enter quantity')
                
    def show(self):
        print '\n',"Book details",'\n'
        print "Book id", '\t',self.bid
        print "Name",'\t',  self.bname
        print "Price" ,'\t', self.price
        print "Quantity", '\t',self.qty

    def modify(self):
        self.price=input('Enter new price of book')
        

## Functions related to class CGN ##
def CGN1():
    a1=CGN()
    a1.Input()
    fw=open('CGN.dat','ab')                                                               
    pickle.dump(a1,fw)
    #storing the books of comics and graphic novels section
    fw.close()
    print "Book added to file"

def VeiwCGN():
    #viewing the books of cgn section
    fr=open('CGN.dat','rb')
    try:
        while True:
            a1=pickle.load(fr)
            a1.show()
    except EOFError:
       fr.close()

def updateCGN(b_id):
    fr=open("CGN.dat",'rb')                                                                        #FOR ADMIN
    fw=open('temp.dat','wb')                                                                        #updating a book
    found=0
    try:
        while True:
            a1=pickle.load(fr)
            if a1.bid==b_id:
                found=1
                a1.modify()
                pickle.dump(a1,fw)
            else:
                pickle.dump(a1,fw)
    except EOFError:
        fr.close()
    fw.close()
    os.remove('CGN.dat')
    os.rename('temp.dat','CGN.dat')
    if found==0:
        print "No matching record"

def BuyCGN(book_id):
    fr=open("CGN.dat",'rb')
    fw=open('temp.dat','wb')
    found=0                                                                                        #FOR CUSTOMER
    bill=0
    try:                                                                                                 #buying book 
        while True:
            a1=pickle.load(fr)
            if a1.bid==book_id:
                if a1.qty<=0:
                    print "Sorry, book is out of stock"
                else:
                    found+=1
                    print "Please pay", a1.price, "for the book", a1.bname
                    a1.qty-=1
                pickle.dump(a1,fw)
                
            else:
                pickle.dump(a1,fw)
    except EOFError:
        fr.close()
    fw.close()
    os.remove('CGN.dat')
    os.rename('temp.dat',"CGN.dat")
    if found==0:
        print "Wrong Id entered"


#### CLASS LITFIC (literature and fiction) ####

class LitFic():                                                            
    def __init__(self):
        #instance variables
        self.bname='na'
        self.price=0
        self.qty=0
        self.bid=0
        self.author='na'
        self.category='na'
        
    def Input(self):
        self.bid=input('Enter book id')
        self.bname=raw_input('Enter book name :')
        self.author=raw_input("Enter the author :")
        self.price=input("Enter price")
        self.qty=input('Enter quantity')
        self.category=raw_input('Enter Category')
                
    def show(self):
        print '\n',"Book details",'\n'
        print "Book id :", '\t',self.bid
        print "Name :",'\t',  self.bname
        print "Author :",'\t',self.author
        print "Price :" ,'\t', self.price
        print "Quantity :", '\t',self.qty
        print "Category :",'\t',self.category

    def modify(self):
        self.price=input('Enter new price of book')
        

## Functions related to class LitFic ##
def LitFic1():
    a1=LitFic()
    a1.Input()
    fw=open('LitFic.dat','ab')                                                              
    pickle.dump(a1,fw)
    #storing the books of literature and fiction section
    fw.close()
    print "Book added to file"

def VeiwLitFic():
    #to view books in literature and fiction section
    fr=open('LitFic.dat','rb')
    try:
        while True:
            a1=pickle.load(fr)
            a1.show()
    except EOFError:
       fr.close()

def VeiwSelected2():
    l=['ROMANCE','SUSPENCE AND THRILLER','CLASSICS']
    print l                                                                                                                                  #filtering
    answer=raw_input('Enter the category from which you want to select the book :')
    fr=open('LitFic.dat','rb')
    try:
        while True:
            a1=pickle.load(fr)
            if a1.category==answer.upper():
                a1.show()
    except EOFError:
        fr.close()

def updateLitFic(b_id):
    fr=open("LitFic.dat",'rb')
    fw=open('temp.dat','wb')                                                                                                    #FOR ADMIN
    found=0                                                                                                                          #updating a book
    try:
        while True:
            a1=pickle.load(fr)
            if a1.bid==b_id:
                found=1
                a1.modify()
                pickle.dump(a1,fw)
            else:
                pickle.dump(a1,fw)
    except EOFError:
        fr.close()
    fw.close()
    os.remove('LitFic.dat')
    os.rename('temp.dat','LitFic.dat')
    if found==0:
        print "No matching record"

def BuyLitFic(book_id):
    fr=open("LitFic.dat",'rb')
    fw=open('temp.dat','wb')                                                                                             #FOR CUSTOMER
    found=0
    try:                                                                                                                             #buying book
        while True:
            a1=pickle.load(fr)
            if a1.bid==book_id:
                if a1.qty<=0:
                    print "Sorry, book is out of stock"
                else:
                    found+=1
                    print "Please pay", a1.price, "for the book", a1.bname
                    a1.qty-=1
                pickle.dump(a1,fw)
                
            else:
                pickle.dump(a1,fw)
    except EOFError:
        fr.close()
    fw.close()
    os.remove('LitFic.dat')
    os.rename('temp.dat',"LitFic.dat")
    if found==0:
        print "Wrong Id entered"

        

##### CLASS BIOG (biographies and autobiographies) #####

class Biog():
    def __init__(self):
        #instance variables
        self.bname='na'
        self.price=0
        self.qty=0
        self.bid=0
        self.author='na'
        
    def Input(self):
        self.bid=input('Enter book id')
        self.bname=raw_input('Enter book name :')
        self.author=raw_input("Enter the author :")
        self.price=input("Enter price")
        self.qty=input('Enter quantity')
        
    def show(self):
        print '\n',"Book details",'\n'
        print "Book id", '\t',self.bid
        print "Name",'\t',  self.bname
        print "Author :",'\t',self.author
        print "Price" ,'\t', self.price
        print "Quantity", '\t',self.qty

    def modify(self):
        self.price=input('Enter new price of book')
        

## Functions related to class Biog ##
def Biog1():
    a1=Biog()
    a1.Input()
    fw=open('Biog.dat','ab')                                                               
    pickle.dump(a1,fw)
    #storing the books of autobiographies and biographies section
    fw.close()
    print "Book added to file"

def VeiwBiog():
    #to view the books of biographies and autobiographies section
    fr=open('Biog.dat','rb')
    try:
        while True:
            a1=pickle.load(fr)
            a1.show()
    except EOFError:
       fr.close()

def updateBiog(b_id):
    fr=open("Biog.dat",'rb')
    fw=open('temp.dat','wb')
    found=0                                                                                                    #FOR ADMIN
    try:                                                                                                            #to update a book
        while True:
            a1=pickle.load(fr)
            if a1.bid==b_id:
                found=1
                a1.modify()
                pickle.dump(a1,fw)
            else:
                pickle.dump(a1,fw)
    except EOFError:
        fr.close()
    fw.close()
    os.remove('Biog.dat')
    os.rename('temp.dat','Biog.dat')
    if found==0:
        print "No matching record"

def BuyBiog(book_id):
    fr=open("Biog.dat",'rb')
    fw=open('temp.dat','wb')
    found=0                                                                                         #FOR CUSTOMER
    try:
        while True:                                                                                 #buying a book
            a1=pickle.load(fr)
            if a1.bid==book_id:
                if a1.qty<=0:
                    print "Sorry, book is out of stock"
                else:
                    found+=1
                    print "Please pay", a1.price, "for the book", a1.bname
                    a1.qty-=1
                pickle.dump(a1,fw)
                
            else:
                pickle.dump(a1,fw)
    except EOFError:
        fr.close()
    fw.close()
    os.remove('Biog.dat')
    os.rename('temp.dat',"Biog.dat")
    if found==0:
        print "Wrong Id entered"

        


######## GENERAL FUNCTIONS ########
        
## function for searching a book ##
def search():
    L=['Academics.dat','CGN.dat','LitFic.dat','Biog.dat']
    bookname=raw_input('Enter the name of the book you want to search for')
    found=0
    for i in L:
        s=os.path.isfile(i)
        if s<>True:
            print "sorry !! File does not exist!!"
            return
        else:
            fr=open(i,'rb')
            try:
                while True:
                    a=pickle.load(fr)
                    if a.bname==bookname:
                        a.show()
                        found=1
                        break        
            except EOFError:
                fr.close()
    if found==0:
        print "Sorry, Book not found"


## funtion for deleting a book ##
def Delete():
    L=['Academics.dat','CGN.dat','LitFic.dat','Biog.dat']
    bookname=raw_input('Enter the name of the book you want to delete')
    found=0
    for i in L:
        s=os.path.isfile(i)
        if s<>True:
            print "sorry !! File does not exist!!"
            return
        else:
            fr=open(i,'rb')
            fw=open('temp3.dat','wb')
            try:
                while True:
                    a=pickle.load(fr)
                    if a.bname==bookname:
                        pass
                        found=1
                        print "Book Deleted"
                    else:
                        pickle.dump(a,fw)
            except EOFError:
                fr.close()
            fw.close()
            os.remove(i)
            os.rename('temp3.dat',i)
    if found==0:
        print "No matching record"
        print "Sorry, Book not found"

# MAIN FUNCTION: CUSTOMER
# displaying the categories of books
# asking the customr which book he/she wants to buy
#displaying the bill to the customer
def buy():
        print '\n',"-------WHICH OF THE FOLLOWING CATEGORIES WOULD YOU LIKE TO SEE?----------- ",'\n'
        print "Choose option as per following :"
        print "1. Academics"
        print "2. Comics and Graphic Novels"
        print "3. Literature and fiction"                                       
        print "4. Biographies and Autobiographies"                                                                          
        choice=raw_input('Enter choice number')
        if choice=='1':
             #filtering on the basis of grades
            answer=raw_input('Do you want to see books for a particular grade/class? Yes/No ?')
            if answer.upper()=="YES":
                VeiwSelected()
            else:
                VeiwAcademics()
            n=input('Enter how many books you want to buy from this section')
            if n==0:
                    print "Thanks for visiting. Hope to see you again. :) "
            else:
                for i in range(n):
                    buybookcode=input("Enter id of the book you want to buy")
                    BuyAcademics(buybookcode)
            if n!=0:
                print "You bought",n,"books from Academics section"
            
        elif choice=='2':
            VeiwCGN()
            n=input('Enter how many books you want to buy from this section')
            if n==0:
                    print "Thanks for visiting. Hope to see you again. :) "
            else:
                for i in range(n):
                    buybookcode=input("Enter id of the book you want to buy")
                    BuyCGN(buybookcode)
            if n!=0:
                print "You bought",n,"books from Comics and Graphic Novels section"
                
        elif choice=='3':
            answer=raw_input('Do you want to see books from a particular genre? Yes/No ?')
            if answer.upper()=="YES":
                VeiwSelected2()
            else:
                VeiwLitFic()
            n=input('Enter how many books you want to buy from this section')
            if n==0:
                    print "Thanks for visiting. Hope to see you again. :) "
            else:
                for i in range(n):
                    buybookcode=input("Enter id of the book you want to buy")
                    BuyLitFic(buybookcode)
            if n!=0:
                print "You bought",n,"books from Literature and Fiction section"
                
        elif choice=='4':
            VeiwBiog()
            n=input('Enter how many books you want to buy from this section')
            if n==0:
                    print "Thanks for visiting. Hope to see you again. :) "
            else:
                for i in range(n):
                    buybookcode=input("Enter id of the book you want to buy")
                    BuyBiog(buybookcode)
            if n!=0:
                print "You bought",n,"books from Biographies section"
            '''a=raw_input("do u want to buy books from here:[y/n]")
            if a=='n':
                print "Thanks for visiting. Hope to see you again. :) "
            else:
                buybookcode=input("Enter id of the book you want to buy")
                BuyBiog(buybookcode)'''
    

# MAIN FUNCTION: ADMIN
#displaying the categories to the admin
#asking the admin which operation he wants to buy
def Admin():
    print '\n',"WHICH OF THE FOLLOWING CATEGORIES WOULD YOU LIKE TO SEE? " ,'\n'
    print "Choose option as per following :"
    print "1. Academics"
    print "2. Comics and Graphic Novels"
    print "3. Literature and fiction"
    print "4. Biographies and Autobiographies"
    c1=raw_input('enter choice no.')
    print "Which operation do you want to perform?"
    print "1. Update a book"
    print "2. Enter a new book to the store"
    print "3. Search for a particular book"
    print "4. Remove a book from store"
    c2=raw_input('Enter choice no.')
    if c1=='1' and c2=='1':
        b_id=input('Enter id of book to be updated')
        updateAcademics(b_id)
        VeiwAcademics()
    elif c1=='1' and c2=='2':
        n=input('Enter how many new books do you want to add to the store?')
        for i in range(n):
            academics1()
        VeiwAcademics()
    elif c1=='2' and c2=='1':
        b_id=input('Enter id of book to be updated')
        updateCGN(b_id)
        VeiwCGN()
    elif c1=="2" and c2=='2':
        n=input('Enter how many new books do you want to add to the store?')
        for i in range(n):
            CGN1()
        VeiwCGN()
    elif c1=='3' and c2=='1':
        b_id=input('Enter id of book to be updated')
        updateLitFic(b_id)
        VeiwLitFic
    elif c1=='3' and c2=='2':
        n=input('Enter how many new books do you want to add to the store?')
        for i in range(n):
            LitFic1()
        VeiwLitFic()
    elif c1=='4' and c2=='1':
        b_id=input('Enter id of book to be updated')
        updateBiog(b_id)
        VeiwBiog()
    elif c1=='4' and c2=='2':
        n=input('Enter how many new books do you want to add to the store?')
        for i in range(n):
            Biog1()
        VeiwBiog()
    elif c2=='3':
        search()
    elif c2=='4':
        Delete()
        

###### MAIN LOOP ######                                  
c="YES"
while c=="YES":
    print "--------------Namaskar. Welcome to LEXICON - THE BOOK STORE---------------",'\n'
    print "Enter 1 if you are the Administrator"
    print "Enter 2 if you are a Customer"
    ans=raw_input('Enter your choice')
    if ans=="2":
        customer1()
        buy()
        q=raw_input('Do you want to buy more books?')
        if q.upper()=="YES":
            buy()                                                                                                      
        
        else:
            print "Thanks for visiting. Hope to see you again. :) "
    elif ans=="1":
        password="ADMIN123"                                  
        passkey=raw_input("Please enter password")
        if passkey==password:
            print "Welcome, Administrator"
            Admin()
        else:
            print "Wrong password"
    else:
        print "Wrong Entry"
    cc=raw_input('Do you want to continue? Yes or no?')
    c=cc.upper()

