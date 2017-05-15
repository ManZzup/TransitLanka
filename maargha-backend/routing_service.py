'''
@author: manujith

Serce API for accessing route processor functions
'''

import webapp2

from core import route_processor
from google.appengine.ext import ndb
import json

class PathSearch(webapp2.RequestHandler):
    """
    Handles route_processor.path_search() service calls
    """

    def post(self):
        node_key = self.request.get("node")
        end_node_key = self.request.get('end_node')
        explored_routes = json.loads(self.request.get('explored_routes'))
        hops = int(self.request.get('hops'))
        transfers = int(self.request.get('transfers'))
        path = json.loads(self.request.get('path'))
        path_routes = json.loads(self.request.get('path_routes'))
        query_key = self.request.get('query_key')
        cur_route = self.request.get('cur_route')

        node_key = ndb.Key(urlsafe=node_key)
        node = node_key.get()

        end_node_key = ndb.Key(urlsafe=end_node_key)
        end_node = end_node_key.get()

        query_key = ndb.Key(urlsafe=query_key)

        path.append(node.node)
        path_routes.append(cur_route)

        route_processor.path_search(node,end_node,explored_routes,hops,transfers,path,path_routes,query_key)

class ViewResults(webapp2.RequestHandler):
    """
    Handles API endpoint for obtaining results for the query
    """

    def get(self):
        if self.request.get("query_key"):
            query_key = self.request.get("query_key")
            query_key = ndb.Key(urlsafe=query_key)
            results = route_processor.get_query_results(query_key)
            self.response.write(results)

app = webapp2.WSGIApplication([
    ('/routing/path_search', PathSearch),
    ('/routing/view_results', ViewResults),
], debug=True)
