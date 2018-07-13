import pc from 'engine';

// Load model and animation assets
import Playbot from 'engine/examples/assets/Playbot/Playbot.json';
import Playbot_idle from 'engine/examples/assets/Playbot/Playbot_idle.json';
import Playbot_run from 'engine/examples/assets/Playbot/Playbot_run.json';
// import PlaybotMapping from 'engine/examples/assets/Playbot/Playbot.mapping.json';

export default class Robot {
    constructor(app) {
        const botModel = app.loader.open('model', Playbot, '.json');

        const idleAnimation = app.loader.open('animation', Playbot_idle, '.json');
        idleAnimation.setName('idle');
        const runAnimation = app.loader.open('animation', Playbot_run, '.json');
        runAnimation.setName('run');

        const entity = new pc.Entity();
        entity.setName('BadRobot');

        entity.addComponent('model');
        entity.model.model = botModel;

        entity.addComponent('animation');
        entity.animation.animations['idle'] = idleAnimation;
        entity.animation.animations['run'] = runAnimation;
        entity.animation.setModel(botModel);

        setTimeout(() => {
            this.run();
        }, 1000);

        entity.setLocalPosition(0, 0, 2);

        var e = entity.getLocalEulerAngles();
        entity.setLocalEulerAngles(e.x + 90, e.y, e.z);

        app.root.addChild(entity);
        this.entity = entity;
        // punch from console
        window.badRobot = entity;
    }

    // Start running then stop in 1s
    run() {
        this.entity.animation.play("run", 0.2);
        setTimeout(() => {
            this.stop();
        }, 1000);
    };

    // Stop running then start running in 1s
    stop() {
        this.entity.animation.play("idle", 0.2);
        setTimeout(() => {
            this.run();
        }, 1000);
    }
}
