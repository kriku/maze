import pc from "engine";

export default class RobotFetus {
    constructor() {
        this.entity = pipe(
            RobotFetus.createRobotEntity(),
            RobotFetus.addBody
        );
    }

    static createRobotEntity() {
        const entity = new pc.Entity();
        entity.setName('BadRobot');

        return entity;
    }

    static addBody(entity) {
        entity.addComponent('rigidbody', {
            type: 'dynamic',
            friction: 0.8,
            reduction: 0.5,
            linearDamping: 0.5,
            mass: 5
        });

        entity.addComponent('collision', {
            type: 'cylinder',
            height: 0.2,
            radius: 0.3
        });

        return entity;
    }

    atPosition(position) {
        this.entity.setLocalPosition(position.x, 2, position.y);

        return this;
    }

    withModel(model) {
        const {entity} = this;
        entity.addComponent('model');
        entity.model.model = model;

        const localAngles = entity.getLocalEulerAngles();
        entity.setLocalEulerAngles(localAngles.x, localAngles.y - 180, localAngles.z);

        if (entity.animation) {
            entity.animation.setModel(model)
        }

        return this;
    }

    withAnimations(animations) {
        const {entity} = this;
        entity.addComponent('animation');
        entity.animation.animations = animations;
        entity.model.model && entity.animation.setModel(entity.model.model);

        return this;
    }

    withScript(script) {
        this.entity.addComponent("script");
        this.entity.script.create(script);

        return this;
    }

    birth() {
        return this.entity;
    }
}


function pipe() {
    return Array.prototype.splice.call(arguments, 1)
        .reduce((acc, v) => v(acc), arguments[0])
}