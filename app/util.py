import re


def urlify(name):
    return re.sub('[^A-Za-z0-9]+', '-', name)
