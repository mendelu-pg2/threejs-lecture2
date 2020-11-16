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
        this.directional = new THREE.DirectionalLight(0x404040, 1); 

        this.directional.position.set(2, 1, 1);

        this.scene.add(this.directional);
    }

}
