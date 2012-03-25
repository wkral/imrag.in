import urllib
from twilio.rest import TwilioRestClient


def connect():
    account = "AC0255d59c44584a68952adeb89d869651"
    token = "e86d21615a35a34a14bdb58f2332bce8"
    client = TwilioRestClient(account, token)
    return client

_client = connect()


def sendsms(to_num, body):
    from_num = "+16479311254"
    _client.sms.messages.create(to=to_num, from_=from_num, body=body)


def makecall(to_num, text):
    from_num = "+16047210517"
    text = urllib.quote_plus(text)
    clip_url = ("http://api.ispeech.org/api/rest?"
                "apikey=2650e8ccc58f24920292825df048fba9&"
                "action=convert&text={}").format(text)
    call = _client.calls.create(to=to_num, from_=from_num, url=clip_url)
    return call.sid
