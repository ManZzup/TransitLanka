import webapp2
from models import Location

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

#testapi = endpoints.api_server([api.TestAPI])

app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)
