from flask import Flask, render_template, request

from app import data
from app.util import urlify, find_phone
from app.external import twilio_service

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/at/<name>')
def business_profile(name):
    business = data.business(name)
    return render_template('business.html', business=business, permalink=name)


@app.route('/rage/<name>', methods=['POST'])
def rage(name):
    business = data.business(name)
    phone = find_phone(business['contacts'])
    print phone
    twilio_service.makecall(phone, "Boris, we should win")
    return 'Raged!'


@app.route('/businesses/', methods=['POST'])
def new_business():
    data = request.json
    permalink = urlify(data['name'])
    data.create_business(permalink, data)
    return '/at/{}'.format(permalink)


@app.route('/near-by')
def near_by():
    return render_template('near-by.html')
