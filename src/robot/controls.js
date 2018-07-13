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
            this.robot.runUp();
            this.pressed[event.key] = true;
            this.robot.run();
            break;
        case pc.KEY_DOWN:
            this.robot.runDown();
            this.pressed[event.key] = true;
            this.robot.run();
            break;
        case pc.KEY_LEFT:
            this.robot.runLeft();
            this.pressed[event.key] = true;
            this.robot.run();
            break;
        case pc.KEY_RIGHT:
            this.robot.runRight();
            this.pressed[event.key] = true;
            this.robot.run();
            break;
        default:
            //
        }
    }
}
