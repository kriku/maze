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
                        y: 1,
                        z: j,
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
            castShadows: true
        });

        entity.addComponent('rigidbody', {
            type: 'static'
        });

        entity.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(0.5, 0.5, 0.5)
        });

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
