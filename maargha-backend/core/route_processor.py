'''
@author: manujith

The core routing functions are here
'''
from google.appengine.ext import ndb
from google.appengine.api import taskqueue
import json

from models import Road, Location, Route, RouteLocation
from models.Location import Location
from models.Route import Route
from models.Road import Road
from models.RouteLocation import RouteLocation
from models.Query import RouteQueryResponse

'''Constants'''
NEIGHBOUR_RADIUS_LAT = 0.001
NEIGHBOUR_RADIUS_LNG = 0.001
MAX_QUERY_RESULTS = 3


def find_neighbouring_nodes(node):
    """
    Function to final neightbouring nodes
    node.neightbours => node.latttitude | node.langutude <= NEIGHBOUR_RADIUS

    :type node: Location
    :param node: Location obj of which neightbours are to be found

    :rtype: [Location]
    :return: List of neightbouring nodes
    """

    #find the lat/lng delta values
    lat_values = [node.lat - NEIGHBOUR_RADIUS_LAT,node.lat + NEIGHBOUR_RADIUS_LAT]
    lng_values = [node.lng - NEIGHBOUR_RADIUS_LNG,node.lng + NEIGHBOUR_RADIUS_LNG]

    #find neighbour nodes
    neighbours = Location.query( ndb.AND(Location.lat >= lat_values[0],Location.lat <= lat_values[1]) )

    neightbour_set = list()
    for n in neighbours:
        if n.key != node.key and (n.lng >= lng_values[0] and n.lng <= lng_values[1]):
            neightbour_set.append(n)

    return neightbour_set

def find_routes(node):
    """
    Function to find all related routes points given an initial node
    related => route.has(node) or route.has(node.neightbours)

    :type node: Location
    :param node: Routes that goes through the given Location

    :rtype: [(Route,indexOfNodeInRoute)]
    :return: List of tuples (Route,Index at which the node is in route)
    """

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

def found_max_results(query_key):
    """
    Function to check if a given query has already taken the maximum no of results

    :type node: Key
    :param node: The key of the submitted query

    :rtype: bool
    :return: true of count(results) >= MAX_QUERY_RESULTS
    """

    results = RouteQueryResponse.query(RouteQueryResponse.routeQuery==query_key)

    if results.count() >= MAX_QUERY_RESULTS:
        return True
    return False

def get_query_results(query_key):
    """
    Function to get processed results for the given query

    :type node: Key
    :param node: The key of the submitted query

    :rtype: [RouteQueryResponse]
    :return: List of query responses
    """

    results = RouteQueryResponse.query(RouteQueryResponse.routeQuery==query_key)

    if results.count() >= 0:
        return results.fetch()
    return None

def path_search(node,end_node,explored_routes,hops,transfers,path,path_routes,query_key):
    """
    Function that runs the path search. algorithm will parallely check till the end node is reached
    Recursive calls are taken as micro service calls

    :type node: Location
    :param node: Current node in search

    :type end_node: Location
    :param end_node: Location to which the routes are searching

    :type explored_routes: [Route]
    :param explored_routes: List of already explored routes

    :type hops: int
    :param hops: No. of transit stops taken so far

    :type transfers: int
    :param transfers: No. of transit changes taken so far

    :type path: [Location]
    :param path: List of Locations in order of finding route

    :type path_routes: [Route]
    :param path_routes: List of routes in order of finding route

    :type query_key: Key
    :param query_key: Key of RouteQuery submitted which triggered the search

    :rtype: None
    :return: No returns, updates the database entities
    """

    if found_max_results(query_key):
        return

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
            print "PATH:",[p for p in path]
            print "ROUTES:",[pr for pr in path_routes]
            response = RouteQueryResponse(
                routeQuery = query_key,
                hops = hops,
                routes = [pr for pr in path_routes],
                nodes = [p for p in path]
            )
            response.put()
            return

        node_routes = find_routes(n)

        for r in node_routes:
            # r[0] <- is the Route instance
            if r[0] in explored_routes:
                continue

            route_locations = RouteLocation.query(RouteLocation.route == r[0].key,
                                                  RouteLocation.nodeIndex > r[1]).order(-RouteLocation.nodeIndex)
            if route_locations.count() > 0:
                explored_routes.append(r[0].routeNumber)

            for rl in route_locations:
                explore_nodes.append( (rl.node.get(),r[0],hops+abs(rl.nodeIndex-r[1])) )
    # print "next nodes",[p[0].node for p in explore_nodes]
    for en in explore_nodes:
        # path.append(en[0])
        # path_routes.append(en[1])
        #
        # path_search(en[0],end_node,explored_routes,en[2],transfers+1,path,path_routes,query_key)

        taskqueue.add(url = '/routing/path_search',queue_name = 'routing',
                      params = {
                        'node' : en[0].key.urlsafe(),
                        'end_node': end_node.key.urlsafe(),
                        'explored_routes' : json.dumps(explored_routes),
                        'hops' : en[2],
                        'transfers' : transfers+1,
                        'path' : json.dumps(path),
                        'path_routes' : json.dumps(path_routes),
                        'query_key': query_key.urlsafe(),
                        'cur_route' : en[1].routeNumber
                      })


        # path.remove(en[0])
        # path_routes.remove(en[1])
