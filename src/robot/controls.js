import pc from 'engine';

export default class RobotControls {
    constructor(robot) {
        this.robot = robot;
        this.app = robot.app;
        this.entity = robot.entity;
        const keyboard = new pc.Keyboard(window);
        this.app.keyboard = keyboard;
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
        this.app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);
        this.pressed = {};
        this.keys = [pc.KEY_UP, pc.KEY_DOWN, pc.KEY_LEFT, pc.KEY_RIGHT];
        this.vecs = [pc.Vec3.FORWARD, pc.Vec3.BACK, pc.Vec3.LEFT, pc.Vec3.RIGHT];
        let forces = {};
        this.keys.forEach((key, i) => forces[key] = this.vecs[i]);
        this.forces = forces;
    }

    get isRun() {
        const keys = [pc.KEY_UP, pc.KEY_DOWN, pc.KEY_LEFT, pc.KEY_RIGHT];
        return keys.map(key => this.pressed[key]).filter(v => v).length;
    }

    onKeyUp(event) {
        // Check event.key to detect which key has been pressed
        switch (event.key) {
        case pc.KEY_UP:
        case pc.KEY_DOWN:
        case pc.KEY_LEFT:
        case pc.KEY_RIGHT:
            this.pressed[event.key] = false;
            if (!this.isRun) this.robot.idle();
        default:
            //
        }

        // When the space bar is pressed this scrolls the window.
        // Calling preventDefault() on the original browser event stops this.
        event.event.preventDefault();
    }

    onKeyDown(event) {
        // Check event.key to detect which key has been pressed
        switch (event.key) {
        case pc.KEY_UP:
        case pc.KEY_DOWN:
        case pc.KEY_LEFT:
        case pc.KEY_RIGHT:
            this.pressed[event.key] = true;
            this.robot.run();
            break;
        default:
            //
        }
    }
}
