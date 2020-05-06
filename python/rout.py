from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from apiclient import errors
from httplib2 import Http
from email.mime.text import MIMEText
import base64
from google.oauth2 import service_account
from flask import Flask

app = Flask(__name__)

@app.route('/rout/<info>')
def hello_world(info):
    argulist = info.split(':')
        
    # If modifying these scopes, delete the file token.pickle.
    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

    # Email variables. Modify this!
    EMAIL_FROM = 'salesreadyservices@gmail.com'
    EMAIL_TO = 'soulessential.music@gmail.com'
    EMAIL_SUBJECT = argulist[2]
    EMAIL_CONTENT = argulist[3]

    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)

    message = MIMEText(EMAIL_CONTENT)
    message['to'] = EMAIL_TO
    message['from'] = EMAIL_FROM
    message['subject'] = EMAIL_SUBJECT

    try:
        message = (service_account.users().messages().send(userId='me', body={'raw': base64.urlsafe_b64encode(message.as_bytes()).decode("utf-8")})
                    .execute())
        print('Message Id: %s' % message['id'])
    except errors.HttpError as error:
        print('An error occurred: %s' % error)

    return 'Hello ' + argulist[0] +'!'

#  Uncomment in production only

if __name__ == '__main__':
    app.run()
