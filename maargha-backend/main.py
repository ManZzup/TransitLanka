import webapp2
from models import Location
from test import core_test

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

#testapi = endpoints.api_server([api.TestAPI])

class TestHandler1(webapp2.RequestHandler):
    def get(self):
        core_test.load_test_data()

class TestHandler2(webapp2.RequestHandler):
    def get(self):
        core_test.test_find_neightbour_nodes()

class TestHandler(webapp2.RequestHandler):
    def get(self):
        test_n = int(self.request.get("n"))
        if test_n == 1:
            core_test.load_test_data()
        elif test_n == 2:
            core_test.test_find_neightbour_nodes()
        elif test_n == 3:
            core_test.test_find_routes()
        elif test_n == 4:
            core_test.test_path_search()

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/test/1', TestHandler1),
    ('/test/2', TestHandler2),
    ('/test', TestHandler),
], debug=True)
