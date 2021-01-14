'''
   53-Print Today’s Date For Humans
   print today's date in
   a proper readable format.
   Example output: "19-February-2019"

'''

import datetime

current_date = datetime.date.today()
current_date = current_date.strftime("%d-%B-%Y")

print(current_date)
