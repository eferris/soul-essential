# Import smtplib for the actual sending function
import smtplib

# Import the email modules we'll need
from email.message import EmailMessage

filename = "route.data"
# Open the plain text file whose name is in filename for reading.
with open(filename) as fp:
    # Create a text/plain message
    msg = EmailMessage()
    msg.set_content(fp.read())

me = "redhairedlion@gmail.com"
you = "ferris.eric@gmail.com"
msg['Subject'] = f"The contents of {filename}"
msg['From'] = me
msg['To'] = you

# Send the message via our own SMTP server.
s = smtplib.SMTP('smtp.gmail.com')
s.send_message(msg)
s.quit()