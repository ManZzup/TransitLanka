'''
@author: manujith

Process the input data from the API for storing
'''
from google.appengine.ext import ndb
from models.Location import Location
from models.Route import Route
from models.Road import Road
from models.RouteLocation import RouteLocation

def insert_route_data(route_number,route_data):
    route = Route(routeNumber=route_number)
    route.put()

    for record in route_data:
        road_name = record[0]

        #check if road exist if not create one
        road = Road.get_or_insert(road_name,name=road_name)

        #store the location
        location = Location(
            node = record[2],
            lat = float(record[3]),
            lng = float(record[4]),
            placeId = record[5]
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
