import pc from 'engine';
import app from './app';

export class BoxFactory {
    spawnCubes() {
        const { maze } = this;
        const { walls } = maze;
        for (let i = 0; i < walls.length; i++) {
            const row = walls[i];
            for (let j = 0; j < row.length; j++) {
                if (walls[i][j]) {
                    this.spawnCube({
                        x: i,
                        y: j,
                        z: 1
                    });
                }
            }
        }
    }

    spawnCube({ x, y, z }) {
        var entity = new pc.Entity();

        // Add a new Model Component and add it to the Entity.
        entity.addComponent("model", {
            type: 'box',
            isStatic: true
        });

        // set material
        // entity.model.material = this.material.resource;

        // Move to a random position
        entity.setLocalPosition(x, y, z);

        // Add to the Hierarchy
        console.log(app);
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
        this.spawnCubes();
    }
}
