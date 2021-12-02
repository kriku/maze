import pc from "engine";

export default ({name, idleAnimation, runAnimation}) => {
    const KeyboardHandler = pc.createScript(name);

    KeyboardHandler.prototype.update = function (dt) {
        const { app, entity } = this;

        const forces = {
            [pc.KEY_LEFT]: pc.Vec3.LEFT,
            [pc.KEY_RIGHT]: pc.Vec3.RIGHT,
            [pc.KEY_UP]: pc.Vec3.FORWARD,
            [pc.KEY_DOWN]: pc.Vec3.BACK
        };

        const force = Object.keys(forces)
            .filter(key => app.keyboard.isPressed(parseInt(key)))
            .reduce((acc, key) => acc.add(forces[key]),
                new pc.Vec3());

        force.normalize();
        if (!force.equals(pc.Vec3.ZERO)) {

            const currentDir = entity.getRotation().transformVector(pc.Vec3.BACK);

            const dot = force.dot(currentDir);
            const axis = new pc.Vec3().cross(force, currentDir);
            const clockWise = -Math.sign(axis.y);
            const angle = Math.acos(dot) * pc.math.RAD_TO_DEG;

            if (angle > 5) {
                const resultAngle = clockWise * Math.min(angle, 30) * dt * 200
                entity.rigidbody.applyTorque(new pc.Vec3(0, resultAngle, 0));
            }
        }

        if (entity.animation) {
            const isIdle = force.equals(pc.Vec3.ZERO);
            const animation = isIdle ? idleAnimation : runAnimation;
            const animationChanged = entity.animation.currAnim !== animation;
            animationChanged && entity.animation.play(animation, 0.2);
        }

        entity.rigidbody.applyForce(force.scale(50));
    };

    return name;
};
