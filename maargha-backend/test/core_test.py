'''
@author: manujith

Runs unit tests for core functions
'''

from core import data_processor
from core import route_processor
import json
from test_data import records

from models.Location import Location

def load_test_data():
    data = records.t100
    data_processor.insert_route_data(data['route'],data['records'])

    data = records.t255
    data_processor.insert_route_data(data['route'],data['records'])

    data = records.t138
    data_processor.insert_route_data(data['route'],data['records'])

def test_find_neightbour_nodes():
    nodes = Location.query()

    # for n in nodes:
    #     print n.node
    #     print route_processor.find_neighbouring_nodes(n)

    node = Location.query(Location.node=="Kottawa").get()
    print route_processor.find_neighbouring_nodes(node)

def test_find_routes():
    node = Location.query(Location.node=="Moratuwa").get()
    print route_processor.find_routes(node)

def test_path_search():
    start_node = Location.query(Location.node=="Petta").get()
    end_node = Location.query(Location.node=="Kottawa").get()

    print route_processor.path_search(start_node,end_node,[],0,0,[start_node],[])
