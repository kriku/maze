import pc from 'engine';
import RobotControls from './controls';

// Load model and animation assets
import Playbot from 'engine/examples/assets/Playbot/Playbot.json';
import Playbot_idle from 'engine/examples/assets/Playbot/Playbot_idle.json';
import Playbot_run from 'engine/examples/assets/Playbot/Playbot_run.json';
// import PlaybotMapping from 'engine/examples/assets/Playbot/Playbot.mapping.json';

export default class Robot {
    constructor(app, start) {
        this.app = app;

        const entity = new pc.Entity();
        this.entity = entity;
        this.isRun = false;

        entity.setName('BadRobot');
        entity.setLocalPosition(start.x, 2, start.y);

        this.addModel();
        this.addAnimation();

        entity.addComponent('rigidbody', {
            type: 'dynamic',
            friction: 0.7,
            reduction: 0,
            mass: 5
        });

        entity.addComponent('collision', {
            type: 'cylinder',
            height: 0.2,
            radius: 0.3
        });
        // entity.rigidbody.body = this.model;

        this.addControls();

        app.root.addChild(entity);
        window.badRobot = entity;
    }

    addModel() {
        this.model = this.app.loader.open('model', Playbot, '.json');
        const { entity } = this;
        entity.addComponent('model');
        entity.model.model = this.model;

        const e = entity.getLocalEulerAngles();
        entity.setLocalEulerAngles(e.x, e.y - 180, e.z);
    }

    addAnimation() {
        const idleAnimation = this.app.loader.open('animation', Playbot_idle, '.json');
        idleAnimation.setName('idle');
        const runAnimation = this.app.loader.open('animation', Playbot_run, '.json');
        runAnimation.setName('run');
        const { entity } = this;
        entity.addComponent('animation');
        entity.animation.animations['idle'] = idleAnimation;
        entity.animation.animations['run'] = runAnimation;
        entity.animation.setModel(this.model);
    }

    addControls() {
        this.controls = new RobotControls(this);
    }

    // Start running then stop in 1s
    run() {
        if (!this.isRun) {
            this.entity.animation.play("run", 0.2);
            this.isRun = true;
        }
    };

    // Stop running then start running in 1s
    idle() {
        this.entity.animation.play("idle", 0.2);
        // this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
        this.isRun = false;
    }

    runTo(vec3) {
        // this.entity.rigidbody.linearVelocity = vec3;
        this.entity.rigidbody.applyImpulse(vec3);
        // this.entity.rigidbody.applyForce(vec3);
    }

    runUp() {
        this.runTo(pc.Vec3.FORWARD);
    }
    runDown() {
        this.runTo(pc.Vec3.BACK);
    }
    runLeft() {
        this.runTo(pc.Vec3.LEFT);
    }
    runRight() {
        this.runTo(pc.Vec3.RIGHT);
    }
}
