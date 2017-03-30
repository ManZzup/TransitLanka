'''
@author: manujith

Process the GraphQL - Graphene bindings 
'''

import graphene
from graphene_gae import NdbObjectType, NdbConnectionField
from models.Interims import InterimRoute,InterimRecord
from models.Location import Location
from models.Query import RouteQuery,RouteQueryResponse

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


class Query(graphene.ObjectType):
    InterimRoutes = graphene.List(InterimRouteType, key=graphene.String())
    InterimRecords = graphene.List(InterimRecordType, route=graphene.String())
    Locations = graphene.List(LocationType, search=graphene.String())
    Query = graphene.List(RouteQueryResponseType, fromNode=graphene.String(), toNode=graphene.String())

    def resolve_InterimRoutes(self, args, context, info):
        if args and 'key' in args:
            return [InterimRoute.get_by_id(long(args['key']))]
        return InterimRoute.query()

    def resolve_InterimRecords(self, args, context, info):
        parent = InterimRoute.get_by_id(long(args['route']))
        return InterimRecord.query().filter(InterimRecord.routeKey == parent.key)

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
