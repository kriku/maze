class Cell {
    constructor({ x, z }) {
        this.x = x;
        this.z = z;
        this.visited = false;
        this._neighbors = [];
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
            cells[i] = [];
            for (let j = 0; j < m; j++) {
                cells[i][j] = new Cell({ x: i, z: j });
                if (j) {
                    cells[i][j].neighbors = cells[i][j-1];
                    cells[i][j-1].neighbors = cells[i][j];
                }
                if (i) {
                    cells[i][j].neighbors = cells[i-1][j];
                    cells[i-1][j].neighbors = cells[i][j];
                }
            }
        }
        return cells;
    }

    // @returns {[[boolean]]} - 2d array of walls
    generateWalls() {
        const { n, m, cells } = this;

        const walls = [];
        for (let i = 0; i < 2 * n + 1; i++) {
            walls[i] = [];
            for (let j = 0; j < 2 * m + 1; j++) {
                walls[i][j] = (i % 2 && j % 2)? 0 : 1;
            }
        }

        // help functions
        const rndNeighbor = (neighbors) => {
            const index = Math.floor(Math.random() * neighbors.length);
            return neighbors[index];
        };

        const wallBetween = (c1, c2) => {
            let x = (c1.x + c2.x + 1);
            let z = (c1.z + c2.z + 1);
            return {x, z};
        };

        // DFS loop implementation
        let stack = [];
        stack.push(cells[0][0]);
        let max_stack = 0;

        while (stack.length) {
            if (stack.length > max_stack) {
                this.mostDistantCell = stack[stack.length - 1];
                max_stack = stack.length;
            }
            let cell = stack.pop();
            cell.visited = true;

            const candidates = cell.neighbors.filter(c => !c.visited);

            if (candidates.length) {
                stack.push(cell);
                let next = rndNeighbor(candidates);
                // remove wall
                let { x, z } = wallBetween(cell, next);
                walls[x][z] = 0;
                stack.push(next);
            }
        }
        // open enter
        walls[0][1] = 0;

        return walls;
    }

    mostDistantPoint() {
        return {
            x: this.mostDistantCell.x * 2 + 1,
            z: this.mostDistantCell.z * 2 + 1
        };
    }
}

export default Maze;
