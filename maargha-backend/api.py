import webapp2
import json
from models.Interims import InterimRoute,InterimRecord
from backend_exceptions.APIException import *

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

        interim_route = InterimRoute(
                        name = route
        )
        interim_route.put()

        for r in records:
            interim_record = InterimRecord(
                    route = interim_route,
                    record_data = r
            )
            interim_record.put()

        self.response.write(json.dumps({"msg":"Added sucessfully!"}))

class GetInterimRoutesHander(webapp2.RequestHandler):
    def get(self):
        pass


app = webapp2.WSGIApplication([
    ('/api/interim/submit', InterimSubmitHandler),
], debug=True)
