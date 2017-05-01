'''
@author: manujith

Process the input data from the API for storing
'''
from google.appengine.ext import ndb
from models.Location import Location
from models.Route import Route
from models.Road import Road
from models.RouteLocation import RouteLocation

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
                node = node,
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
