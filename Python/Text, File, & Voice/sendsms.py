#!/python3

import subprocess

# Add Entries to the address book dictionary. Key = Name, Value = Phone Number
addressbook= {"Amber Lemon" : "717#######", "April Lemon" : "717#######", "Cindy Young" : "717#######"
        }
# Loop through the addressbook dictionary and send each number the message
for (k,v) in addressbook.items():

    # SMS Message Template (try to keep to within 150 characters)
    smsmessage = str("Hi " + k + "7" + v)

    # Use Subprocess Run Function to send SMS
    subprocess.run(["termux-sms-send", "-n", phonenumber, smsmessage])

    # Print confirmation of each send
    print("Sent Message to " + k + " via " + v)


# Print end of process message

print("Message sending complete")
