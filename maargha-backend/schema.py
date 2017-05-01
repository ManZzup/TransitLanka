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
import json

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
    Query = graphene.List(RouteQueryResponseType, fromNode=graphene.String(), toNode=graphene.String())

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
        if args and len(args) == 2:
            from_node = Location.get_by_id(long(args['fromNode']))
            to_node = Location.get_by_id(long(args['toNode']))

            if (not from_node) or (not to_node):
                return None

            query = RouteQuery(
                fromNode = from_node.key,
                toNode = to_node.key
            )
            query.put()


            route_processor.path_search(from_node,to_node,[],0,0,[from_node],[],query.key)

            #find responses
            # print RouteQueryResponse.query(RouteQueryResponse.routeQuery==query.key).get()
            return RouteQueryResponse.query(RouteQueryResponse.routeQuery==query.key)

    def resolve_TrainingSet(self, args, context, info):
        from_node = Location.query(Location.node == "Pettah").get()
        to_node = Location.query(Location.node == "Kottawa").get()

        query = RouteQuery(
            fromNode = from_node.key,
            toNode = to_node.key
        )
        query.put()

        route_processor.path_search(from_node,to_node,[],0,0,[from_node],[],query.key)
        response = RouteQueryResponse.query(RouteQueryResponse.routeQuery==query.key)
        print response.count()
        if response.count() > 1:
            trainingSet = TrainingSetResponseType(
                results = response.fetch(5),
                start = from_node.node,
                end = to_node.node
            )
            return [trainingSet]

'''
class ResponseType(graphene.ObjectType):
    message = graphene.String()
    code = graphene.Int

class CreateInterimRecords(graphene.Mutation):
    class Input:
        record_data = graphene.String()

    response = graphene.Field(ResponseType)

    @classmethod
    def mutate(cls, input, context, info):
        record_data = input.get('record_data')
        print record_data

        return CreateInterimRecords(response = ResponseType(message="done", code="200"))

class Mutation(graphene.ObjectType):
    create_interims = CreateInterimRecords.Field()
'''

schema = graphene.Schema(query=Query)
