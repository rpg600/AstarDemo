window.onload = function() {
    TEST.canvas = document.getElementById('a-star');
    TEST.stage = new createjs.Stage(TEST.canvas);

    TEST.stage.enableMouseOver(10);
    TEST.stage.mouseMoveOutside = true;
    TEST.stage.snapToPixelEnabled = true;

    TEST.canvas.width = 1000;
    TEST.canvas.height = 500;
    TEST.canvas.getContext('2d');

    TEST.update = true;

    TEST.Grid.init();

    TEST.stage.addEventListener("click", function() {
        if (TEST.start && TEST.end) {
            TEST.Astar.astar(TEST.start, TEST.end);
        }
    });

    document.getElementById('diagonal').addEventListener("click", function(event) {
        if (event.currentTarget.checked) {
            TEST.Astar.diagonal = true;
        } else {
            TEST.Astar.diagonal = false;
        }

        if (TEST.start && TEST.end) {
            TEST.Astar.reset();

            TEST.start.color(TEST.colorStart);
            TEST.end.color(TEST.colorEnd);

            TEST.Astar.astar(TEST.start, TEST.end);
        }
    });

    // createjs.Ticker.addEventListener("tick", TEST.tick);
};

TEST = {
    canvas: null,
    stage: null,
    update: false,
    start: null,
    end: null,
    colorWalkable: '#ecf0f1',
    colorNonWalkable: '#34495e',
    colorStart: '#2980b9',
    colorEnd: '#e74c3c',
    colorPath: '#2ecc71',
    colorNeighbor: '#f1c40f'
};
