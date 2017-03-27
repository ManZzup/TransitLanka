'''
@author: manujith

The core routing functions are here.
Use snake_case for all function and variable definitions.
'''

from models import Road, Location, Route, RouteLocation
from google.appengine.ext import ndb

from models.Location import Location
from models.Route import Route
from models.Road import Road
from models.RouteLocation import RouteLocation

'''Constants'''
NEIGHBOUR_RADIUS_LAT = 0.001
NEIGHBOUR_RADIUS_LNG = 0.001

'''
function to final neightbouring nodes

node.neightbours => node.latttitude | node.langutude <= NEIGHBOUR_RADIUS
'''
def find_neighbouring_nodes(node):
    lat_values = [node.lat - NEIGHBOUR_RADIUS_LAT,node.lat + NEIGHBOUR_RADIUS_LAT]
    lng_values = [node.lng - NEIGHBOUR_RADIUS_LNG,node.lng + NEIGHBOUR_RADIUS_LNG]

    #find neighbour nodes
    neighbours = Location.query( ndb.AND(Location.lat >= lat_values[0],Location.lat <= lat_values[1]) )

    neightbour_set = list()
    for n in neighbours:
        if n.key != node.key and (n.lng >= lng_values[0] and n.lng <= lng_values[1]):
            neightbour_set.append(n)

    return neightbour_set

'''
function to find all related routes points given an initial node

related => route.has(node) or route.has(node.neightbours)
'''
def find_routes(node):
    #first find the neightbour nodes
    neightbours = find_neighbouring_nodes(node)
    neightbours.append(node)

    #query for routes that has each neighbour node
    routes = list()

    for n in neightbours:
        #check the RouteLocation mappings
        route_locations = RouteLocation.query(RouteLocation.node == n.key)

        for rl in route_locations:
            #return (route,indexOfNodeInRoute)
            routes.append((rl.route.get(),rl.nodeIndex))

    return routes

'''
function that runs the path search
algorithm will parallely check till the end node is reached
'''
def path_search(node,end_node,explored_routes,hops,transfers,path,path_routes):
    #check if the current node is in the vicinity of the end_node
    neightbours = find_neighbouring_nodes(node)
    neightbours.append(node)

    # print "cur node",node.node

    explore_nodes = list()

    for n in neightbours:
        if n.key == end_node.key:
            print "FOUND ROUTE"
            print "HOPS :",hops
            print "TRANSFERS:",transfers-1
            print "PATH:",[p.node for p in path]
            print "ROUTES:",[pr.routeNumber for pr in path_routes]
            return

        node_routes = find_routes(n)
        # print "node routes",[pr[0].routeNumber for pr in node_routes]
        for r in node_routes:
            if r[0] in explored_routes:
                continue

            route_locations = RouteLocation.query(RouteLocation.route == r[0].key,RouteLocation.nodeIndex > r[1]).order(-RouteLocation.nodeIndex)
            if route_locations.count() > 0:
                explored_routes.append(r[0])

            for rl in route_locations:
                explore_nodes.append( (rl.node.get(),r[0],hops+abs(rl.nodeIndex-r[1])) )
    # print "next nodes",[p[0].node for p in explore_nodes]
    for en in explore_nodes:
        path.append(en[0])
        path_routes.append(en[1])

        path_search(en[0],end_node,explored_routes,en[2],transfers+1,path,path_routes)

        path.remove(en[0])
        path_routes.remove(en[1])
