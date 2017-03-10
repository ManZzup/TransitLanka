import graphene
from graphene_gae import NdbObjectType, NdbConnectionField
from models.Interims import InterimRoute,InterimRecord

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

class Query(graphene.ObjectType):
    InterimRoutes = graphene.List(InterimRouteType, key=graphene.String())
    InterimRecords = graphene.List(InterimRecordType, route=graphene.String())

    def resolve_InterimRoutes(self, args, context, info):
        if args and 'key' in args:
            return [InterimRoute.get_by_id(long(args['key']))]
        return InterimRoute.query()

    def resolve_InterimRecords(self, args, context, info):
        parent = InterimRoute.get_by_id(long(args['route']))
        return InterimRecord.query().filter(InterimRecord.routeKey == parent.key)

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
