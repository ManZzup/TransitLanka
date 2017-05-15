'''
@author: manujith

Process the input data from the API for storing
'''
from google.appengine.ext import ndb
from models.Location import Location
from models.Route import Route
from models.Road import Road
from models.RouteLocation import RouteLocation
from models.Query import RouteQuery,RouteQueryResponse
from core import route_processor
import random

'''Constants'''
AGR_RADIUS_LAT = 0.0001
AGR_RADIUS_LNG = 0.0001

def insert_route_data(route_number,route_data):
    route = Route(routeNumber=route_number)
    route.put()

    for record in route_data:
        road_name = record[0]

        #check if road exist if not create one
        road = Road.get_or_insert(road_name,name=road_name)

        #initialize locations
        node = record[2]
        lat = float(record[3])
        lng = float(record[4])
        placeId = record[5]

        #check for matching locations
        #check by lat-lng, placeid or nearby-aggregation
        location = None

        location_exist = Location.query(Location.placeId == placeId)
        if location_exist:
            location = location_exist.get()

        if not location:
            location_exist = Location.query( ndb.AND(
                                                Location.lat == lat,
                                                Location.lng == lng ))
            if location_exist:
                location = location_exist.get()

        if not location:
            #store the location
            location = Location(
                node = clean_location_node(node,road_name),
                lat = lat,
                lng = lng,
                placeId = placeId
            )
            location.put()

        #map location to the route
        route_location  = RouteLocation(
            nodeIndex = int(record[1]),
            route = route.key,
            road = road.key,
            node = location.key
        )
        route_location.put()

    return route.key

'''
Method to find and return a random node
'''
def find_random_node():
    total_nodes = Location.query().count()
    offset = random.randint(0,total_nodes)
    node = Location.query().fetch(limit=1,offset=offset)
    if len(node) > 0:
        return node[0]
    else:
        return find_random_node()

'''
Method to generate training sets
'''
def get_training_set():
    from_node = find_random_node()
    to_node = find_random_node()

    query = RouteQuery(
        fromNode = from_node.key,
        toNode = to_node.key
    )
    query.put()

    route_processor.path_search(from_node,to_node,[],0,0,[from_node.node],[],query.key,True,True)
    response = RouteQueryResponse.query(RouteQueryResponse.routeQuery==query.key)
    if response.count() > 1:
        return (
            response.fetch(5),from_node.node,to_node.node
        )
    else:
        return get_training_set()

'''
Method to process the location node names to remove the additional
components
'''
def clean_location_nodes():
    roads = []
    roadQuery = Road.query()
    for r in roadQuery:
        roads.append("%s," % r.name.strip())

    locations = Location.query()
    for location in locations:
        node = location.node
        node = node.replace("Sri Lanka","").strip()
        node = node.replace("Western Province,","").strip()
        node = node.replace("Colombo,","")
        node = node.strip()

        for r in roads:
            if r == node:
                break;
            node = node.replace(r,"")

        node = node.strip()
        if node[-1] == ",":
            node = node[:-1]

        location.node = node;
        location.put()

def clean_location_node(node,road):
    road = "%s," % road
    node = node.replace("Sri Lanka","").strip()
    node = node.replace("Western Province,","").strip()
    node = node.replace("Colombo,","")
    node = node.strip()

    if road != node:
        node = node.replace(road,"")

    node = node.strip()
    if node[-1] == ",":
        node = node[:-1]

    return node
