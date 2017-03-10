from google.appengine.ext import ndb

class InterimRoute(ndb.Model):
    name = ndb.StringProperty(required=True)

class InterimRecord(ndb.Model):
    routeKey = ndb.KeyProperty(kind=InterimRoute)
    recordData = ndb.StringProperty(required=True)
