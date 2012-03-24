from flask import Flask, render_template

from app import data

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/at/<name>')
def business_profile(name):
    business = data.business(name)
    return render_template('business.html', business=business)
