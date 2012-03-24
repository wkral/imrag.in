import urllib
from twilio.rest import TwilioRestClient

ToNum = "+17783205321"
BusinessName = "TestShop"

def connect():
  account = "AC0255d59c44584a68952adeb89d869651"
  token = "e86d21615a35a34a14bdb58f2332bce8"
  client = TwilioRestClient(account, token)
  return client

def sendsms(client, BusinessName, ToNum, Body):
  FromNum = "+16479311254"
  message = client.sms.messages.create(to=ToNum, from_=FromNum, body=Body)

def makecall(client, ToNum, ClipURL):
  FromNum = "+16047210517"
  call = client.calls.create(to=ToNum, from_=FromNum, url=ClipURL)
  return call.sid

client = connect()

#sendsms(client, BusinessName, ToNum, "Someone raged "+BusinessName+"!!")

#TTSstr="http://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient"

TTSstr="http://api.ispeech.org/api/rest?apikey=2650e8ccc58f24920292825df048fba9&action=convert&text=antidisestablishmentarianism"
makecall(client, ToNum,TTSstr)

