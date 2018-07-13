import pc from 'engine';
import RobotControls from './controls';

// Load model and animation assets
import Playbot from 'engine/examples/assets/Playbot/Playbot.json';
import Playbot_idle from 'engine/examples/assets/Playbot/Playbot_idle.json';
import Playbot_run from 'engine/examples/assets/Playbot/Playbot_run.json';
// import PlaybotMapping from 'engine/examples/assets/Playbot/Playbot.mapping.json';

export default class Robot {
    constructor(app) {
        this.app = app;

        const entity = new pc.Entity();
        this.entity = entity;
        this.isRun = false;

        entity.setName('BadRobot');

        this.addModel();
        this.addAnimation();
        this.addControls();

        entity.setLocalPosition(0, 0, 2);
        entity.addComponent('collision');

        const e = entity.getLocalEulerAngles();
        entity.setLocalEulerAngles(e.x + 90, e.y, e.z);

        app.root.addChild(entity);
        window.badRobot = entity;
    }

    addModel() {
        this.model = this.app.loader.open('model', Playbot, '.json');
        const { entity } = this;
        entity.addComponent('model');
        entity.model.model = this.model;
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
        this.isRun = false;
    }
}
