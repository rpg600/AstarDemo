TEST.Grid = {
    gridContainer: new createjs.Container(),
    grid: [],
    init: function() {
        for (var j = 0; j < 20; j++) {
            for (var i = 0; i < 40; i++) {
                //var number = Math.round(Math.random() * 3);
                var number = 1;
                this.grid[j] = [];
                this.grid[j][i] = number;
                var shape = new createjs.Shape();
                shape.graphics.beginFill(number > 0 ? TEST.colorWalkable : TEST.colorNonWalkable).setStrokeStyle(2).beginStroke('#000').drawRect(25*i, 25*j, 25, 25);
                this.gridContainer.addChild(shape);

                var node = new TEST.Node(i, j, 1, (number ? true : false));
                TEST.Astar.nodes.push(node);

                shape.node = node;
                node.shape = shape;

                this.addClickListenerToShape(shape);
                this.addMouseOverListenerToShape(shape);

                if (j == 5 && i == 9) {
                    node.color(TEST.colorStart);
                    TEST.start = node;
                }

                if (j == 17 && i == 23) {
                    node.color(TEST.colorEnd);
                    TEST.end = node;
                }
            }
        }

        TEST.stage.addChild(this.gridContainer);
        TEST.stage.update();
    },
    addMouseOverListenerToShape: function(shape) {
        shape.addEventListener("mouseover", function(event) {
            var node =  event.currentTarget.node;

            document.getElementById('info').innerHTML = 'x : ' + node.x + ', y : ' + node.y + '<br/>'
            + 'g : ' + node.g + '<br/> h : ' + node.h + '<br/> f : ' + node.f;
        });
    },
    addClickListenerToShape: function(shape) {
        shape.addEventListener("click", function(event) {
            var node = event.currentTarget.node;

            if (TEST.start && TEST.end) {
                TEST.start.shape.graphics._fill.style = TEST.end.shape.graphics._fill.style = color = TEST.colorWalkable;
                TEST.start = TEST.end = null;
                TEST.Astar.reset();

                return;
            }

            if (!node.walkable) {
                return;
            }

            if (null == TEST.start) {
                TEST.start = node;
                color = TEST.colorStart;
            } else if (null == TEST.end && node != TEST.start) {
                TEST.end = node;
                color = TEST.colorEnd;
            }

            event.currentTarget.graphics._fill.style = color;
            TEST.stage.update();
        });
    }
};
