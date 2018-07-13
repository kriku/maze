import pc from 'engine';
import { BoxFactory } from './factory';
import Maze from './maze';
import Robot from './robot/';

export class App {
    constructor(id) {
        const canvas = document.getElementById(id);
        this.app = new pc.Application(canvas, {});
        this.app.start();
        this.fill();
        this.resizeHook();

        // this.addCube();
        this.addRobot();
        this.addMaze();

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
        this.app.on('update', function (deltaTime) {
            // this.cube.rotate(10 * deltaTime, 20 * deltaTime, 30 * deltaTime);
        });
    }

    // create and add camera entity
    addCamera() {
        const camera = new pc.Entity('camera');
        camera.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.1, 0.1),
            nearClip: 1,
            farClip: 100,
            fov: 55
        });
        // set up initial positions and orientations
        camera.setPosition(-2, -2, 4);
        camera.setEulerAngles(65, 0, -45);
        this.app.root.addChild(camera);
    }

    // create and add directional light entity
    addLight() {
        const light = new pc.Entity('light');
        light.addComponent('light');
        // set up initial positions and orientations
        light.setEulerAngles(225, 135, 40);
        // light.setEulerAngles(45, 0, 0);
        this.app.root.addChild(light);
    }

    // create and add box entity
    addCube() {
        const cube = new pc.Entity('cube');
        cube.addComponent('model', {
            type: 'box'
        });
        // cube.setLocalPosition(0, 0, 2);
        this.app.root.addChild(cube);
    }

    // create and add robot
    addRobot() {
        const robot = new Robot(this.app);
    }

    // create and spawn maze
    addMaze() {
        // create maze and walls from boxes
        const maze = new Maze({n: 10, m: 10});
        const walls = new BoxFactory(maze);
        walls.spawnCubes(this.app);
    }

}

export default App;
