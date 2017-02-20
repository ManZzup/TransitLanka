from google.appengine.ext import db

class Location(db.Model):
    formatted_address = db.StringProperty(required=True)
    lat = db.FloatProperty(required=True)
    lng = db.FloatProperty(required=True)
    gmap_place_id = db.StringProperty(required=True)
