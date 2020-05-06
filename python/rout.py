from flask import Flask
app = Flask(__name__)


@app.route('/')
def home():
    return 'index.html'


@app.route('/rout/<info>')
def hello_world(info):
    argulist = info.split(':')
    return 'Hello ' + argulist[0] +'!'

#  Uncomment in production only
#
#if __name__ == '__main__':
#    app.run()
#