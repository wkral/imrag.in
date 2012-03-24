from flask import Flask, render_template, request, make_response

from app import data
from app.util import urlify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/at/<name>')
def business_profile(name):
    business = data.business(name)
    return render_template('business.html', business=business)


@app.route('/businesses/', methods=['POST'])
def new_business():
    data = request.json
    permalink = urlify(data['name'])
    data.create_business(permalink, data)
    resp = make_response(status_code=201)
    resp.headers['Location'] = '/at/{}'.format(permalink)
    return resp


@app.route('/near-by')
def near_by():
    return render_template('near-by.html')
