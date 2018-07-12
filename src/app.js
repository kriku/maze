import pc from 'engine';

export class App {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.app = new pc.Application(this.canvas, {});
        this.fill();
        this.resizeHook();
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
            // cube.rotate(10 * deltaTime, 20 * deltaTime, 30 * deltaTime);
        });
    }
    // create camera entity
    addCamera() {
        const camera = new pc.Entity('camera');
        camera.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.1, 0.1),
            nearClip: 1,
            farClip: 100,
            fov: 55
        });
        // set up initial positions and orientations
        camera.setPosition(75, 75, 35);
        camera.setEulerAngles(45, 0, 135);
        this.app.root.addChild(camera);
    }
    // create directional light entity
    addLight() {
        const light = new pc.Entity('light');
        light.addComponent('light');
        // set up initial positions and orientations
        light.setEulerAngles(35, 30, 10);
        this.app.root.addChild(light);
    }
    // create box entity
    addCube() {
        var cube = new pc.Entity('cube');
        cube.addComponent('model', {
            type: 'box',
            isStatic: true
        });
        this.app.root.addChild(cube);
    }
}

const app = new App('application');
export default app.app;
