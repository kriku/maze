class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
    }
}

export class Maze {
    // @returns {[{ x, y, z }]} Array of 3D points
    generate() {
        let cells = [];
        const { n, m, h } = this;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                cells.push(new Cell(i, j));
            }
        }

        cells[0].visited = true; // visited
        let stack = [];

        while (stack.length) {
            let cell = stack.pop();

        }

        // perimeter

        return walls;
    }

    // as arguments map with size [n x m], h box up, with some scale
    constructor({ n = 100, m = 100, h = 1, scale = 1 }) {
        this.n = n;
        this.m = m;
        this.h = h;
        this.maze = this.generate();
    }
}
