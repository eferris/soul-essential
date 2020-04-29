class g_auth:
    def __init__(self, SCOPES, CLIENT_SECRET_FILE, APPLICATION_NAME):
        self.SCOPES = SCOPES
        self.CLIENT_SECRET_FILE = CLIENT_SECRET_FILE
        self. APPLICATION_NAME = APPLICATION_NAME
    def get_credentials(self):

