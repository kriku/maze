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
    }

    onKeyUp(event) {
        // Check event.key to detect which key has been pressed
        switch (event.key) {
        case pc.KEY_UP:
            this.robot.idle();
            break;
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
            this.robot.run();
            break;
        default:
            //
        }
    }
}
