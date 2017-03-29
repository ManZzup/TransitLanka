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
        if self.request.get("n"):
            test_n = int(self.request.get("n"))
            self.runtest(test_n)
        else:
            for i in range(1,5):
                self.runtest(i)
                self.response.write('<br>')

    def runtest(self,test_n):
        if test_n == 1:
            self.response.write("TEST - Load dummy data : ")
            if(core_test.load_test_data()):
                self.response.write("OK")
            else:
                self.response.write("FAILED")
        elif test_n == 2:
            self.response.write("TEST - Find neightbour routes : ")
            if(core_test.test_find_neightbour_nodes()):
                self.response.write("OK")
            else:
                self.response.write("FAILED")
        elif test_n == 3:
            self.response.write("TEST - Find routes from node : ")
            if(core_test.test_find_routes()):
                self.response.write("OK")
            else:
                self.response.write("FAILED")
        elif test_n == 4:
            self.response.write("TEST - Path search : ")
            if(core_test.test_path_search()):
                self.response.write("OK")
            else:
                self.response.write("FAILED")

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/test/1', TestHandler1),
    ('/test/2', TestHandler2),
    ('/test', TestHandler),
], debug=True)
