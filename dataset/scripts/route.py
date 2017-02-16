route_map = open("../test_data/route_map.csv")

routes = dict()
locs = []
roads = []
maps = []

for line in route_map:
    if not line[0] == "i":
        parts = line.strip().split(",")

        if parts[1] not in routes.keys():
            routes[parts[1]] = list()
            #routes.append(parts[1])

        if parts[3] not in locs:
            locs.append(parts[3])

        if parts[3] not in routes[parts[1]]:
            routes[parts[1]].append(parts[3]);

        if parts[4] not in roads:
            roads.append(parts[4])

        maps.append(line.strip())

#print routes
#print locs
#print roads

def findRoutes(routes,node):
    sel = list()
    for r in routes:
        if node in routes[r]:
            sel.append(r)
    return sel

def exploreNode(maps,routes,exp_routes,node,end,hops,transfers,path,path_routes):

    if node == end:
        print "FOUND ROUTE"
        print "HOPS :",hops
        print "TRANSFERS:",transfers-1
        print "PATH:",path
        print "ROUTES:",path_routes
        return

    node_routes = findRoutes(routes,node)

    explore_nodes = list()

    for r in node_routes:
        if r not in exp_routes:
            exp_routes.append(r)

            route = routes[r]
            #find the index of the current node in the current route
            cur_node_index = route.index(node)

            #find neightbouring nodes
            for k in range(cur_node_index+1,len(route)):
                explore_nodes.append([route[k],r,hops+abs(k - cur_node_index)])

    for adj_node in explore_nodes:
        path.append(adj_node[0])
        path_routes.append(adj_node[1])
        exploreNode(maps,routes,exp_routes,adj_node[0],end,adj_node[2],transfers+1,path,path_routes)
        path.remove(adj_node[0])
        path_routes.remove(adj_node[1])


start = "Moratuwa"
end = "Nugegoda"

exploreNode(maps,routes,[],start,end,0,0,[start],[])
