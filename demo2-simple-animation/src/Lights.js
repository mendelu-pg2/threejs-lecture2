import * as THREE from "three";

export default class Lights {
    constructor(scene) {
        this.scene = scene;
        this.initAmbientLight();
        this.initDirectionalLight();
    }

    initAmbientLight() {
        this.ambient = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.ambient);
    }

    initDirectionalLight() {
        this.directional = new THREE.DirectionalLight(0x404040, 10); 

        this.directional.position.set(-3, 1, 3);

        this.scene.add(this.directional);
    }

}
