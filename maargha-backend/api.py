'''
@author: manujith

API end point handlers
'''

import webapp2
import json
from models.Interims import InterimRoute,InterimRecord
from backend_exceptions.APIException import *
from schema import schema

'''
InterimSubmit Schema
{
    route: "route_no",
    records: [
        "record_data_1",
        "record_data_2"
    ]
}
'''
class InterimSubmitHandler(webapp2.RequestHandler):
    def post(self):
        self.response.headers.add_header("Access-Control-Allow-Origin", "*")

        try:
            data = json.loads(self.request.body)
            print data
        except:
            self.response.write(JSONDecodeException().getResponse())
            return

        route = data['route']
        records = data['records']

        if len(records) < 1:
            self.response.write(InvalidInputDataException().getResponse())
            return

        interim_route = InterimRoute(
                        name = route
        )
        interim_route.put()

        for r in records:
            interim_record = InterimRecord(
                    routeKey = interim_route.key,
                    recordData = json.dumps(r)
            )
            interim_record.put()

        self.response.write(json.dumps({"msg":"Added sucessfully!", "code":200}))

        #TEST
        print('########')
        print(self.request.body)
        print('#######')

class TestSchemaHandler(webapp2.RequestHandler):
    def get(self):
        query = self.request.get("query")
        self.response.write(json.dumps(schema.execute(query).data))

    def post(self):
        query = self.request.body
        self.response.write(json.dumps(schema.execute(query).data))
        print schema.execute(query).errors

class GraphQLEndpointHandler(webapp2.RequestHandler):
    def post(self):
        query = self.request.body

        self.response.headers.add_header("Access-Control-Allow-Origin", "*")
        self.response.write(json.dumps(schema.execute(query).data))
        print schema.execute(query).errors

app = webapp2.WSGIApplication([
    ('/api/interim/submit', InterimSubmitHandler),
    ('/api/test', TestSchemaHandler),
    ('/api/query', GraphQLEndpointHandler),
], debug=True)
