'''
   57-send Email with attachment
   using gmail smtp,
   You may need to pip install yagmail
'''
import yagmail

# Set up your gmail credentials.
# Any problems could be gmail blocking you
# or wrong password etc. I had to allow unsafe apps
# in my gmail security settings to get
# this to work.

YAG_SMTP = yagmail.SMTP(user="nateweiler84@gmail.com",  \
password="MasonPaulWeiler11311", host='smtp.gmail.com')

# email subject
SUBJECT = 'Yagmail Test'

# email content with attached file from current dir,
# or state file location.
CONTENTS = ['Hi Dude', 'image attached.', 'some-image.jpg']

# send mail
YAG_SMTP.send('person@anymail.com', SUBJECT, CONTENTS)
