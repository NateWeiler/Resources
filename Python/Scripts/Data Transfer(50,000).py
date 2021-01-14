read_file='rockyou.txt'
write_file='50,000.txt'
read_data=open(read_file,'r')
write_data=open(write_file,'w')
count=0
for i in read_data:
    write_data.write(i)
    count=count+1
    if(count==50000):
        break
print("Done writing data to file")
