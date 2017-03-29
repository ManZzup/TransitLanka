from google.appengine.ext import ndb
from models.Location import Location

class RouteQuery(ndb.Model):
    fromNode = ndb.KeyProperty(kind=Location)
    toNode = ndb.KeyProperty(kind=Location)

class RouteQueryResponse(ndb.Model):
    routeQuery = ndb.KeyProperty(kind=RouteQuery)
    hops = ndb.IntegerProperty(required=True)
    routes = ndb.StringProperty(repeated=True)
    nodes = ndb.StringProperty(repeated=True)
