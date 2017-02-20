import json

class APIException():
    def __init__(self,code,msg):
        self.code = code
        self.msg = msg

    def getResponse(self):
        return json.dumps(self.__dict__)


class JSONDecodeException(APIException):
    def __init__(self):
        APIException.__init__(self,10001,"Error in decoding JSON data")
