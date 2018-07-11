export class BoxFactory {
    static spawnCubes() {
        // TODO
    }

    static spawnCube({ x, y, z }) {
        var entity = new pc.Entity();

        // Add a new Model Component and add it to the Entity.
        entity.addComponent("model", {
            type: 'box',
            isStatic: true
        });

        // set material
        entity.model.material = this.material.resource;

        // Move to a random position
        entity.setLocalPosition(x, y, z);

        // Add to the Hierarchy
        this.app.root.addChild(entity);

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
    }
}
