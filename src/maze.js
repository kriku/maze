class Cell {
    constructor({ x, y }) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this._neighbors = [];
        // this.walls = [1,1,1].map(i => [1, 1, 1]);
    }

    get neighbors() {
        return this._neighbors;
    }
    set neighbors(cell) {
        let { _neighbors } = this;
        if (!_neighbors.includes(cell) && this != cell)
            _neighbors.push(cell);
        return this;
    }
}

export class Maze {
    // as arguments map with size [n x m], h box up, with some scale
    constructor({ n = 100, m = 100 }) {
        this.n = n;
        this.m = m;
        this.cells = this.generateCells();
        this.walls = this.generateWalls();
    }

    // @returns {[[Cell]]} - 2d array of cells
    generateCells() {
        const { n, m } = this;
        const cells = [];
        for (let i = 0; i < n; i++) {
            const row = [];
            for (let j = 0; j < m; j++) {
                let cell = new Cell({ x: i, y: j, id: Math.random() });
                if (j) {
                    cell.neighbors = row[j-1];
                    row[j-1].neighbors = cell;
                }
                if (i) {
                    cell.neighbors = cells[i-1][j];
                    cells[i-1][j].neighbors = cell;
                }
                row.push(cell);
            }
            cells.push(row);
        }
        return cells;
    }

    // @returns {[[boolean]]} - 2d array of walls
    generateWalls() {
        const { n, m, cells } = this;

        const walls = [];
        for (let i = 0; i < 2*n + 1; i++) {
            const row = [];
            for (let j = 0; j < 2*m + 1; j++) {
                if (i%2 && j%2) {
                    row.push(0);
                    continue;
                }
                row.push(1);
            }
            walls.push(row);
        }

        const rndNeighbor = (neighbors) => {
            const index = Math.floor(Math.random() * neighbors.length);
            return neighbors[index];
        };

        const wallBetween = (c1, c2) => {
            let x = (c1.x + c2.x + 1);
            let y = (c1.y + c2.y + 1);
            return {x, y};
        };

        // DFS loop implementation
        let stack = [];
        stack.push(cells[0][0]);

        while (stack.length) {
            let cell = stack.pop();
            cell.visited = true;

            const candidates = cell.neighbors.filter(c => !c.visited);

            if (candidates.length) {
                stack.push(cell);
                let next = rndNeighbor(candidates);
                let { x, y } = wallBetween(cell, next);
                walls[x][y] = 0;
                stack.push(next);
            }
        }

        // perimeter

        return walls;
    }
}
