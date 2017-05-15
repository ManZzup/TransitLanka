from google.appengine.ext import ndb
from models.Location import Location

class RouteQuery(ndb.Expando):
    fromNode = ndb.KeyProperty(kind=Location)
    toNode = ndb.KeyProperty(kind=Location)
    doneRouting = ndb.BooleanProperty(required=False, default=False)


class RouteQueryResponse(ndb.Model):
    routeQuery = ndb.KeyProperty(kind=RouteQuery)
    hops = ndb.IntegerProperty(required=True)
    routes = ndb.StringProperty(repeated=True)
    nodes = ndb.StringProperty(repeated=True)
