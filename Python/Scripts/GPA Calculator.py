#!python3
def GPA(m):                        #function which converts marks into gpa
    if(m>=90):
        return 10
    elif(m>=80):
        return 9
    elif(m>=70):
        return 8
    elif(m>=60):
        return 7
    elif(m>=50):
        return 6
if __name__ == '__main__':
    print("---------------------------GPA calculator--------------------------------------\n")
    print("----------------Made for my lazy friends with lots of love---------------------\n")
    print("Theory subjects:")
    m3=int(input("Enter marks or GPA in Maths(M3):"))                          #Taking input from user for Theory subjects
    if(m3>10):
        m3=GPA(m3)
    toc=int(input("Enter marks or GPA Theory of computing(TOC):"))
    if(toc>10):
        toc=GPA(toc)
    fds=int(input("Enter marks or GPA in Fundamentals of digital systems(FDS):"))
    if(fds>10):
        fds=GPA(fds)
    ed=int(input("Enter marks or GPA in Electronic devices(ED):"))
    if(ed>10):
        ed=GPA(ed)
    oop=int(input("Enter marks or GPA in Object oriented programming(OOPS):"))
    if(oop>10):
        oop=GPA(oop)
    ads=int(input("Enter marks or GPA in Advanced data structures(ADS):"))
    if(ads>10):
        ads=GPA(ads)
    print("\nLab subjects:")
    oo_lab=int(input("Enter marks or GPA in Object oriented programming Lab(OOPS Lab):"))          #Taking input from user for lab subjects
    if(oo_lab>10):
        oo_lab=GPA(oo_lab)
    ed_lab=int(input("Enter marks or GPA in Electronic devices Lab(ED Lab):"))
    if(ed_lab>10):
        ed_lab=GPA(ed_lab)
    mat_points=4*m3                                 #Calculating SGPA for each subjects in Theory
    toc_points=4*toc
    fds_points=3*fds
    ed_points=3*ed
    oops_points=3*oop
    ads_points=3*ads
    oops_lab_points=2*oo_lab
    ed_lab_points=2*ed_lab
    sum_of_points=mat_points+toc_points+fds_points+ed_points+oops_points+ads_points+oops_lab_points+ed_lab_points  #Calculating sum of points
    GPA=sum_of_points/24
    print("\nGRADE POINTS ACHIEVED:",GPA)
