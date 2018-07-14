import pc from "engine";

export default ({name, idleAnimation, runAnimation}) => {
    const KeyboardHandler = pc.createScript(name);

    KeyboardHandler.prototype.update = function (dt) {
        const app = this.app;

        const forces = {
            [pc.KEY_LEFT]: pc.Vec3.LEFT,
            [pc.KEY_RIGHT]: pc.Vec3.RIGHT,
            [pc.KEY_UP]: pc.Vec3.FORWARD,
            [pc.KEY_DOWN]: pc.Vec3.BACK,
            [pc.KEY_SPACE]: pc.Vec3.BACK
        };

        const force = new pc.Vec3();

        Object.keys(forces).forEach(key => {
            if (app.keyboard.isPressed(parseInt(key))) {
                force.add(forces[key]);
            }
        });

        this.entity.rigidbody.applyForce(force.scale(50));

        if (this.entity.animation) {
            const isIdle = force.equals(pc.Vec3.ZERO);
            const animation = isIdle ? idleAnimation : runAnimation;
            if (this.entity.animation.currAnim !== animation) {
                this.entity.animation.play(animation, 0.2);
            }
        }
    };

    return name;
};
