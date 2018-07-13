import pc from 'engine';

export class BoxFactory {
    spawnCubes(app) {
        const { maze } = this;
        const { walls } = maze;
        for (let i = 0; i < walls.length; i++) {
            const row = walls[i];
            for (let j = 0; j < row.length; j++) {
                if (walls[i][j]) {
                    this.spawnCube({
                        x: i,
                        y: j,
                        z: 1,
                        app
                    });
                }
            }
        }
    }

    spawnCube({ x, y, z, app }) {
        const entity = new pc.Entity();

        // Add a new Model Component and add it to the Entity.
        entity.addComponent('model', {
            type: 'box',
            isStatic: true
        });

        entity.addComponent('collision');

        // set material
        // entity.model.material = this.material.resource;

        // Move to a random position
        entity.setLocalPosition(x, y, z);

        // Add to the Hierarchy
        app.root.addChild(entity);

        // Store in a list for some random duration before deleting
        this.entities.push({
            entity: entity
        });
    }

    static update() {
        // TODO
    }

    constructor(maze) {
        this.maze = maze;
        this.entities = [];
    }
}
