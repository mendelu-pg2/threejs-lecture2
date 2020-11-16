import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { removeLights } from "./utils"

export default class BlenderObject {
    constructor(scene) {
        this.scene = scene;
        this.object = null;

        this.loadObject();
    }

    loadObject() {
        const loader = new GLTFLoader();

        loader.load('models/blender-object/model.glb', gltf => {
            // we do not want to import lights
            // removeLights(gltf.scene);
            
            this.object = gltf.scene;

            // fix scaling (each model needs different values)
            this.object.scale.set(0.4, 0.4, 0.4);

            // fix rotation (each model needs different values)
            this.object.rotation.set(0, Math.PI / 2, 0);

            // place it somewhere (optional, can be done later)
            this.object.position.set(0, 0, -2);

            this.scene.add(this.object);

        }, undefined, error => {
            console.error(error);
        });
    }
}