from google.appengine.ext import db

class InterimRoute(db.Model):
    name = db.StringProperty(required=True)

class InterimRecord(db.Model):
    route = db.ReferenceProperty(InterimRoute, collection_name="records")
    record_data = db.StringProperty(required=True)
