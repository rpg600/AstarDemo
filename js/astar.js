TEST.Astar = {
    openList: [],
    closedList: [],
    nodes: [],
    path: [],
    diagonal: false,
    range: [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ],
    diagonalRange: [
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1]
    ],
    numberOfNodesVisited: 0,
    astar: function(from, to) {
        this.openList.push(from);

        while (this.openList.length > 0) {
            var currentNode = this.getNextNode();

            if (currentNode == to) {
                this.path = this.getPath(to);
                console.log('Path length : ' + (this.path.length - 1));
                console.log('Number of nodes visited : ' + this.numberOfNodesVisited);

                return;
            }

            this.closedList.push(currentNode);

            var neighbors = this.getNeighbors(currentNode);

            neighbors.forEach(function(neighbor) {

                if (-1 == this.closedList.indexOf(neighbor) && -1 == this.openList.indexOf(neighbor)) { // if not in the closedList and not in openList

                    neighbor.parent = currentNode;

                    this.openList.push(neighbor);

                    if (neighbor == to) {
                        return;
                    }

                    neighbor.h = this.calculateHeuristic(neighbor, to);

                    neighbor.f = neighbor.g + neighbor.h;

                    neighbor.color(TEST.colorNeighbor);

                    this.numberOfNodesVisited += 1;
                }
            }, this);
        }
    },
    getNextNode: function() {
        this.openList.sort(function (a, b) {
            if (a.f > b.f) {
                return 1;
            }
            else {
                return -1;
            }

            return 0;
        });

        return this.openList.shift();
    },
    getNeighbors: function(currentNode) {
        var neighbors = [];

        var range = this.range;

        if (this.diagonal) {
            range = range.concat(this.diagonalRange);
        }

        this.nodes.forEach(function(node) {
            if (node.walkable) {
                for (var i = 0; i < range.length; i++) {
                    if (node.x == currentNode.x + range[i][0] && node.y == currentNode.y + range[i][1]) {
                        neighbors.push(node);
                    }
                }
            }
        }, this);

        return neighbors;
    },
    calculateHeuristic: function(currentNode, endNode) {
        var dx = currentNode.x - endNode.x;
        var dy = currentNode.y - endNode.y;

        // return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return Math.abs(dx) + Math.abs(dy);
    },
    getPath: function(endNode) {
        path = [];

        node = endNode;

        path.push(node);

        while (node.parent != null) {
            node = node.parent;
            path.push(node);

            if (node.parent != null) {
                node.color(TEST.colorPath);
            }
        }

        TEST.stage.update();

        return path;
    },
    reset: function() {
        this.nodes.forEach(function(node) {
            node.f = 0;
            node.parent = null;

            if (this.path.indexOf(node) > -1 || this.openList.indexOf(node) > -1 || this.closedList.indexOf(node) > -1) {
                node.color(TEST.colorWalkable);
            }
        }, this);

        TEST.stage.update();

        this.openList = [];
        this.closedList = [];
        this.path = [];
        this.numberOfNodesVisited = 0;
    }
};

TEST.Node = function(x, y, g, walkable) {
    this.x = x;
    this.y = y;
    this.g = g;
    this.walkable = walkable;
    this.parent = null;
    this.shape = null;
    this.f = 0;
    this.h = 0;

    this.color = function(color) {
        this.shape.graphics._fill.style = color;
    }
};
