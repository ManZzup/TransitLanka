'''
@author: manujith

Main application reqeusts handelr
'''

import webapp2
from models import Location
from test import core_test
from core import data_processor

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

class TestHandler(webapp2.RequestHandler):
    def get(self):
        if self.request.get("n"):
            test_n = int(self.request.get("n"))
            self.runtest(test_n)
        else:
            for i in range(2,5):
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
            try:
                if(core_test.test_find_neightbour_nodes()):
                    self.response.write("OK")
                else:
                    self.response.write("FAILED")
            except:
                self.response.write("FAILED")
        elif test_n == 3:
            self.response.write("TEST - Find routes from node : ")
            try:
                if(core_test.test_find_routes()):
                    self.response.write("OK")
                else:
                    self.response.write("FAILED")
            except:
                self.response.write("FAILED")
        elif test_n == 4:
            self.response.write("TEST - Path search : ")
            try:
                query_key = core_test.test_path_search()
                self.response.write("Query submitted for processing <br />")
                self.response.write("Use <a href='/routing/view_results?query_key=%s'>Following link to view results </a>"
                                            % query_key.urlsafe())
            except:
                self.response.write("FAILED")

class ControlHandler(webapp2.RequestHandler):
    def get(self):
        data_processor.clean_location_nodes()

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/test', TestHandler),
    ('/control', ControlHandler),
], debug=True)
