'''
@author: manujith

The query processing functions
'''

from models.Location import Location

def get_locations_by_name(query_str):
    matches = []
    for l in Location.query():
        if query_str.lower() in l.node.lower():
            matches.append(l)
    return matches

def get_location_by_name(query_str):
    for l in Location.query():
        if query_str.lower() in l.node.lower():
            return l
    return None
