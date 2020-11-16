import * as THREE from "three";

export default class Lights {
    constructor(scene) {
        this.scene = scene;
        this.initAmbientLight();
    }

    initAmbientLight() {
        this.directional = new THREE.DirectionalLight(0x404040, 5); 

        this.directional.position.set(-3, 1, 3);

        this.scene.add(this.directional);
    }

}
