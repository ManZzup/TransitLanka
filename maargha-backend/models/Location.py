from google.appengine.ext import ndb

class Location(ndb.Model):
    node = ndb.StringProperty(required=True)
    lat = ndb.FloatProperty(required=True)
    lng = ndb.FloatProperty(required=True)
    placeId = ndb.StringProperty(required=True)
