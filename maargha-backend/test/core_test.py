'''
@author: manujith

Runs unit tests for core functions
'''

from core import data_processor
from core import route_processor
import json
from test_data import records

from models.Location import Location
from models.Query import RouteQuery,RouteQueryResponse

def load_test_data():
    data = records.t100
    data_processor.insert_route_data(data['route'],data['records'])

    data = records.t255
    data_processor.insert_route_data(data['route'],data['records'])

    data = records.t138
    data_processor.insert_route_data(data['route'],data['records'])

    return True

def test_find_neightbour_nodes():
    nodes = Location.query()

    node = Location.query(Location.node=="Kottawa").get()
    if len(route_processor.find_neighbouring_nodes(node)) > 0:
        return True

    return False

def test_find_routes():
    node = Location.query(Location.node=="Moratuwa").get()
    if len(route_processor.find_routes(node)) > 0:
        return True
    return False

def test_path_search():
    start_node = Location.query(Location.node=="Pettah").get()
    end_node = Location.query(Location.node=="Kottawa").get()

    query = RouteQuery(
        fromNode = start_node.key,
        toNode = end_node.key
    )
    query.put()

    route_processor.path_search(start_node,end_node,[],0,0,[start_node],[],query.key)

    results = RouteQueryResponse.query(RouteQueryResponse.routeQuery==query.key).get()
    if results:
        return True

    return False
