'''
@author: manujith

The query processing functions
'''

from models.Location import Location
from models.Query import RouteQuery,RouteQueryResponse
import route_processor

from google.appengine.api import memcache
from google.appengine.ext import ndb

def get_locations_by_name(query_str):
    matches = []
    for l in Location.query():
        if query_str.lower() in l.node.lower():
            matches.append(l)
    return matches

def get_location_by_name(query_str):
    for l in Location.query():
        if query_str.lower() in l.node.lower():
            return l
    return None

def make_path_query(start_node_id,end_node_id,enable_trains=True,training=False):
    #First check the memcache for saved query
    enable_trains_key = 0
    if not enable_trains:
        enable_trains_key = 1

    memcache_key = "%s//%s//%d" % (start_node_id,end_node_id,enable_trains_key)
    memcache_data = memcache.get(memcache_key)
    print "check memcache"
    if memcache_data != None:
        print "has memcache"
        query_key = memcache_data
    else:
        from_node = Location.get_by_id(start_node_id)
        to_node = Location.get_by_id(end_node_id)

        if (not from_node) or (not to_node):
            return None
        print "check records"
        #if not found in memcache, check for stored result
        query = RouteQuery.query(ndb.AND(
                                    ndb.AND(RouteQuery.fromNode == from_node.key,RouteQuery.toNode == to_node.key),
                                    RouteQuery.enableTrains == enable_trains)).get()

        if query == None:
            print "add new record memcache"
            query = RouteQuery(
                fromNode = from_node.key,
                toNode = to_node.key,
                enableTrains = enable_trains
            )
            query.put()

            memcache.add(
                key=memcache_key,
                value=query.key,
                time=86400
            )

            route_processor.path_search(from_node,to_node,[],0,0,[from_node.node],[],query.key,enable_trains,training)
        query_key = query.key

    return query_key.urlsafe()
