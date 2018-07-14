import pc from 'engine';
import { BoxFactory } from './factory';
import Maze from './maze';
import Robot from './robot/';

export class App {
    constructor(id, debugId) {
        const canvas = document.getElementById(id);
        const debugDOM = document.getElementById(debugId);
        this.debug = debugDOM;
        this.debugInfo = "Debug information";
        this.app = new pc.Application(canvas, {});
        this.app.start();
        this.fill();
        this.resizeHook();

        this.addFloor();
        this.addMaze();

        this.addRobot();

        this.addCamera();
        this.addLight();

        this.updateHook();
    }
    // fill the available space at full resolution
    fill() {
        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
    }
    // ensure canvas is resized when window changes size
    resizeHook() {
        window.addEventListener('resize', function() {
            this.app.resizeCanvas();
        });
    }

    // register a global update event
    updateHook() {
        this.app.on('update', (dt) => {
            this.robot.update(dt);
            const message = {};
            message.linearVelocity = this.robot.entity.rigidbody.linearVelocity;
            message.localRotation = this.robot.entity.localRotation;
            message.eulerAngles = this.robot.entity.getLocalEulerAngles();
            message.turnVec = this.robot.turnVec;
            this.debug.innerHTML = JSON.stringify(message, null, 2);
        });
    }

    // create and add camera entity
    addCamera() {
        const camera = new pc.Entity('camera');
        camera.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.1, 0.1),
            // nearClip: 1,
            // farClip: 100,
            fov: 55
        });
        // set up initial positions and orientations
        camera.setPosition(10, 10, 24);
        camera.setEulerAngles(-45, 0, 0);
        this.app.root.addChild(camera);
    }

    // create and add directional light entity
    addLight() {
        const light = new pc.Entity('light');
        light.addComponent('light', {
            castShadows: true
        });
        // set up initial positions and orientations
        // light.setEulerAngles(20, 180, 30);
        light.setEulerAngles(-30, -145, -40);
        this.app.root.addChild(light);
    }

    // create and add box entity
    addFloor() {
        const floor = new pc.Entity();
        floor.addComponent('model', {
            type: 'box',
            castShadows: true
        });
        floor.setLocalScale(40, 1, 40);
        floor.setLocalPosition(10, 0, 10);

        // add a rigidbody component so that other objects collide with it
        floor.addComponent("rigidbody", {
            type: "static",
            restitution: 0.5
        });

        // add a collision component
        floor.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(20, 0.5, 20)
        });

        this.app.root.addChild(floor);
    }

    // create and add robot
    addRobot() {
        let start = { x: 10, y: 10 };
        const { maze } = this;
        if (maze) start = this.maze.start.wall;
        this.robot = new Robot(this.app, start);
    }

    // create and spawn maze
    addMaze() {
        // create maze and walls from boxes
        const maze = new Maze({n: 10, m: 10});
        this.maze = maze;
        const walls = new BoxFactory(maze);
        walls.spawnCubes(this.app);
    }

}

export default App;
