from google.appengine.ext import ndb
from models.Location import Location
from models.Route import Route
from models.Road import Road

class RouteLocation(ndb.Model):
    nodeIndex = ndb.IntegerProperty(required=True)
    node = ndb.KeyProperty(kind=Location)
    route = ndb.KeyProperty(kind=Route)
    road = ndb.KeyProperty(kind=Road)
