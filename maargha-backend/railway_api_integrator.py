'''
@author: manujith

API integrator for communicating between Sri Lanka Railways API
and the core router
'''

import webapp2
from core import query_processor
from models.Location import Location

class MockAPI:
    """ Class to mock the action of Railways API """
    global trains
    trains = {
        "Moratuwa" : {
            "Angulana" : ["8302","8320"],
            "Rathmalana" : ["8302","8320"],
            "Mount Lavinia" : ["8302","8320"],
            "Dehiwala" : ["8302","8320"],
            "Bambalapitiya" : ["8302","8320"],
            "Kollupitiya" : ["8302","8320"],
            "Fort" : ["8302","8320","8097"],
        },
        "Angulana" : {
            "Rathmalana" : ["8302","8320"],
            "Mount Lavinia" : ["8302","8320"],
            "Dehiwala" : ["8302","8320"],
            "Bambalapitiya" : ["8302","8320"],
            "Kollupitiya" : ["8302","8320"],
            "Fort" : ["8302","8320","8097"],
        },
        "Rathmalana" : {
            "Mount Lavinia" : ["8302","8320"],
            "Dehiwala" : ["8302","8320"],
            "Bambalapitiya" : ["8302","8320"],
            "Kollupitiya" : ["8302","8320"],
            "Fort" : ["8302","8320","8097"],
        },
        "Mount Lavinia" : {
            "Dehiwala" : ["8302","8320"],
            "Bambalapitiya" : ["8302","8320"],
            "Kollupitiya" : ["8302","8320"],
            "Fort" : ["8302","8320","8097"],
        },
        "Dehiwala" : {
            "Bambalapitiya" : ["8302","8320"],
            "Kollupitiya" : ["8302","8320"],
            "Fort" : ["8302","8320","8097"],
        },
        "Bambalapitiya" : {
            "Kollupitiya" : ["8302","8320"],
            "Fort" : ["8302","8320","8097"],
        },
        "Kollupitiya" : {
            "Fort" : ["8302","8320","8097"],
        },
        "Fort" : {
            "Kollupitiya" : ["8302"],
            "Bambalapitiya" : ["8302"],
            "Dehiwala" : ["8302"],
            "Mount Lavinia" : ["8302"],
            "Rathmalana" : ["8302"],
            "Moratuwa" : ["8302"],
        },
        "Kollupitiya" : {
            "Bambalapitiya" : ["8302"],
            "Dehiwala" : ["8302"],
            "Mount Lavinia" : ["8302"],
            "Rathmalana" : ["8302"],
            "Moratuwa" : ["8302"],
        },
        "Bambalapitiya" : {
            "Dehiwala" : ["8302"],
            "Mount Lavinia" : ["8302"],
            "Rathmalana" : ["8302"],
            "Moratuwa" : ["8302"],
        },
        "Dehiwala" : {
            "Mount Lavinia" : ["8302"],
            "Rathmalana" : ["8302"],
            "Moratuwa" : ["8302"],
        },
        "Mount Lavinia" : {
            "Rathmalana" : ["8302"],
            "Moratuwa" : ["8302"],
        },
        "Rathmalana" : {
            "Moratuwa" : ["8302"],
        },
    }

    def get_trains(self,start,end):
        """ Get trains by start and end locations """

        for st in trains:
            st_name = st.lower()
            if st_name in start or start in st_name:
                for en in trains[st]:
                    en_name = en.lower()
                    if en_name in end or end in en_name:
                        return trains[st][en]

    def get_trains_from_node(self,node):
        """ Get trains passing through given node """
        trainSet = list()
        node_name = node.node
        for st in trains:
            if st.lower() in node_name.lower():
                for en in trains[st]:
                    enNode = query_processor.get_location_by_name(en)
                    if enNode:
                        trainSet.append((enNode,"T"+trains[st][en][0]))
        return trainSet


class QueryTrains(webapp2.RequestHandler):
    """
    Handles query requests for searching trains

    :type start_location: str
    :param start_location: Place where train starts

    :type end_location: str
    :param end_location: Place where train ends

    :rtype: JSON<list>
    :return: JSON encoded list of trains
    """

    def get(self):
        start = self.request.get("start_location")
        end = self.request.get("end_location")

        start_node = Location.query(Location.node==start).get()

        mock = MockAPI()

        # self.response.out.write(mock.get_trains(start,end))
        if start_node:
            self.response.out.write(mock.get_trains_from_node(start_node))

app = webapp2.WSGIApplication([
    ('/train/query', QueryTrains),
], debug=True)
