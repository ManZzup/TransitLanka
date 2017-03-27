from google.appengine.ext import ndb

class Road(ndb.Model):
    name = ndb.StringProperty(required=True)
