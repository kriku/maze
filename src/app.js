import pc from 'engine';
import Maze from './maze';
import RobotFetus from './robot';
import RobotMovements from './control';
import Playbot from 'engine/examples/assets/Playbot/Playbot.json';
import Playbot_idle from 'engine/examples/assets/Playbot/Playbot_idle.json';
import Playbot_run from 'engine/examples/assets/Playbot/Playbot_run.json';


export default class RobotInTheMazeGame {
    constructor(canvas) {
        this.app = new pc.Application(canvas, {
            keyboard: new pc.Keyboard(window)
        });
    }

    start() {
        this.app.start();

        this.setupCanvas();
        this.ensureCanvasIsFullWidth();
        this.setupGame();
    }

    setupCanvas() {
        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
    }

    ensureCanvasIsFullWidth() {
        window.addEventListener('resize', () => this.app.resizeCanvas());
    }

    setupGame() {
        const maze = new Maze({n: 10, m: 10});
        const entities = [
            this.floor(),
            this.camera(),
            this.light(),
            this.walls(maze.walls),
            this.robotAt(maze.mostDistantPoint())];

        entities.forEach(entity => this.app.root.addChild(entity));
    }

    robotAt(position) {
        const fetus = new RobotFetus();
        const {app: {loader}} = this;
        return fetus
            .atPosition(position)
            .withModel(loader.open('model', Playbot, '.json'))
            .withAnimations({
                idle: loader.open('animation', Playbot_idle),
                run: loader.open('animation', Playbot_run)
            })
            .withScript(RobotMovements({
                name: 'robotMovements',
                idleAnimation: 'idle',
                runAnimation: 'run'
            }))
            .birth();
    }

    camera() {
        const camera = new pc.Entity('camera');
        camera.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.1, 0.1),
            fov: 55
        });
        camera.setPosition(10, 10, 24);
        camera.setEulerAngles(-45, 0, 0);

        return camera;
    }

    light() {
        const light = new pc.Entity('light');
        light.addComponent('light', {
            castShadows: true
        });
        light.setEulerAngles(-30, -145, -40);

        return light;
    }

    floor() {
        const floor = new pc.Entity();
        floor.addComponent('model', {
            type: 'box',
            castShadows: true
        });
        floor.setLocalScale(40, 1, 40);
        floor.setLocalPosition(10, 0, 10);

        floor.addComponent("rigidbody", {
            type: "static",
            restitution: 0.5
        });

        floor.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(20, 0.5, 20)
        });

        return floor;
    }

    box(x, y, z) {
        const entity = new pc.Entity();
        entity.addComponent('model', {
            type: 'box',
            castShadows: true
        });
        entity.addComponent('rigidbody', {
            type: 'static',
        });
        entity.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(0.5, 0.5, 0.5)
        });
        entity.setLocalPosition(x, y, z);

        return entity;
    }

    walls(walls) {
        const mazeEntity = new pc.Entity('walls');
        for (let i = 0; i < walls.length; i++) {
            const row = walls[i];
            for (let j = 0; j < row.length; j++) {
                if (walls[i][j]) {
                    mazeEntity.addChild(this.box(i, 1, j));
                }
            }
        }

        return mazeEntity;
    }
}
