import pc from 'engine';

// Load model and animation assets
import Playbot from 'engine/examples/assets/Playbot/Playbot.json';
import Playbot_idle from 'engine/examples/assets/Playbot/Playbot_idle.json';
import Playbot_run from 'engine/examples/assets/Playbot/Playbot_run.json';
// import PlaybotMapping from 'engine/examples/assets/Playbot/Playbot.mapping.json';

export default class Robot {
    constructor(app) {
        const bot = app.loader.open('model', Playbot, 'pseudo.json');

        const entity = new pc.Entity();
        entity.addComponent("model");
        entity.model.model = bot;
        entity.setLocalPosition(0, 0, 2);

        var e = entity.getLocalEulerAngles();
        entity.setLocalEulerAngles(e.x + 90, e.y, e.z);

        app.root.addChild(entity);
    }
}
