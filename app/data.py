import simplejson as json

import redis

r = redis.StrictRedis()


def create_business(name, profile):
    data = json.dumps(profile)
    r.set('businesses/{}'.format(name), data)


def business(name):
    json_str = r.get('businesses/{}'.format(name))
    return json.loads(json_str)
