from google.appengine.ext import ndb

class Route(ndb.Model):
    routeNumber = ndb.StringProperty(required=True)
