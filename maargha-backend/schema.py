'''
@author: manujith

Process the GraphQL - Graphene bindings
'''

import graphene
from graphene_gae import NdbObjectType, NdbConnectionField
from models.Interims import InterimRoute,InterimRecord
from models.Location import Location
from models.Query import RouteQuery,RouteQueryResponse
from core import data_processor
from core import query_processor
import json
from google.appengine.ext import ndb
from google.appengine.api import memcache

from core import route_processor

class InterimRecordType(NdbObjectType):
    class Meta:
        model = InterimRecord

    key = graphene.String()
    def resolve_key(self, *_):
        return self.key.id()

    route = graphene.String()
    def resolve_route(self, *_):
        return self.routeKey.id()

class InterimRouteType(NdbObjectType):
    class Meta:
        model = InterimRoute

    key = graphene.String()
    def resolve_key(self, *_):
        return self.key.id()

class LocationType(NdbObjectType):
    class Meta:
        model = Location

    key = graphene.String()
    def resolve_key(self, *_):
        return self.key.id()

class RouteQueryResponseType(NdbObjectType):
    class Meta:
        model=RouteQueryResponse

    key = graphene.String()
    def resolve_key(self, *_):
        return self.key.id()

class TrainingSetResponseType(graphene.ObjectType):
    results = graphene.List(RouteQueryResponseType)
    start = graphene.String()
    end = graphene.String()


class Query(graphene.ObjectType):
    InterimRoutes = graphene.List(InterimRouteType, key=graphene.String())
    InterimRecords = graphene.List(InterimRecordType, route=graphene.String())
    InterimAction = graphene.String(route=graphene.String(), action=graphene.String())
    Locations = graphene.List(LocationType, search=graphene.String())
    Query = graphene.String(fromNode=graphene.String(), toNode=graphene.String(), enableTrains=graphene.Boolean())
    QueryResults = graphene.List(RouteQueryResponseType, queryKey=graphene.String())

    ResponseSelection = graphene.String(response=graphene.String())
    TrainingSet = graphene.List(TrainingSetResponseType, fromNode=graphene.String(), toNode=graphene.String())


    def resolve_InterimRoutes(self, args, context, info):
        if args and 'key' in args:
            return [InterimRoute.get_by_id(long(args['key']))]
        return InterimRoute.query()

    def resolve_InterimRecords(self, args, context, info):
        parent = InterimRoute.get_by_id(long(args['route']))
        return InterimRecord.query().filter(InterimRecord.routeKey == parent.key)

    def resolve_InterimAction(self, args, context, info):
        route_name = args['route']
        action = args['action']

        route = InterimRoute.get_by_id(long(args['route']))

        if action == "verify":
            recordsData = []
            records = InterimRecord.query().filter(InterimRecord.routeKey == route.key)

            for r in records:
                recordsData.append(json.loads(r.recordData))
                r.key.delete()

            data_processor.insert_route_data(route.name,recordsData)
        elif action == "reject":
            records = InterimRecord.query().filter(InterimRecord.routeKey == route.key)

            for r in records:
                r.key.delete()

        route.key.delete()

        return "ok"


    def resolve_Locations(self, args, context, info):
        if args and 'search' in args:
            matches = []
            for l in Location.query():
                if args['search'].lower() in l.node.lower():
                    matches.append(l)
            return matches
        return Location.query()

    def resolve_Query(self, args, context, info):
        if args and len(args) >= 2:
            if len(args) == 3:
                enable_trains = args['enableTrains']
            else:
                enableTrains = True

            return query_processor.make_path_query(long(args['fromNode']),long(args['toNode']),enable_trains)
        return ""

            # enable_trains_key = 0
            # if not enable_trains:
            #     enable_trains_key = 1
            #
            # memcache_key = "%s//%s//%d" % (args['fromNode'],args['toNode'],enable_trains_key)
            # memcache_data = memcache.get(memcache_key)
            #
            # if memcache_data != None:
            #     query_key = memcache_data
            # else:
            #     from_node = Location.get_by_id(long(args['fromNode']))
            #     to_node = Location.get_by_id(long(args['toNode']))
            #
            #     if (not from_node) or (not to_node):
            #         return None
            #
            #     query = RouteQuery(
            #         fromNode = from_node.key,
            #         toNode = to_node.key
            #     )
            #     query.put()
            #
            #     memcache.add(
            #         key=memcache_key,
            #         value=query.key,
            #         time=86400
            #     )
            #
            #     route_processor.path_search(from_node,to_node,[],0,0,[from_node.node],[],query.key,enable_trains)
            #     query_key = query.key
            #     #find responses
            #     # print RouteQueryResponse.query(RouteQueryResponse.routeQuery==query.key).get()
            # return query_key.urlsafe()

    def resolve_QueryResults(self, args, context, info):
        if args and len(args) == 1:
            query_key = args['queryKey']
            query_key = ndb.Key(urlsafe=query_key)

            return route_processor.get_query_results(query_key)

    def resolve_TrainingSet(self, args, context, info):
        response = data_processor.get_training_set()
        trainingSet = TrainingSetResponseType(
            results = response[0],
            start = response[1],
            end = response[2]
        )
        return [trainingSet]

    def resolve_ResponseSelection(self, args, context, info):
        if args and len(args) == 1:
            response = RouteQueryResponse.get_by_id(long(args['response']))
            routeQuery = response.routeQuery.get()

            if routeQuery:
                routeQuery.selection = response.key
                routeQuery.put()

            return "ok"

schema = graphene.Schema(query=Query)
