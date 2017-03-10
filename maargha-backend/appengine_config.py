import sys

for path in ['libs']:
    if path not in sys.path:
        sys.path[0:0] = [path]
