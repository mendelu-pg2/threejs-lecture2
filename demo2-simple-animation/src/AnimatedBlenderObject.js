import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { removeLights } from "./utils"

export default class AnimatedBlenderObject {
    constructor(scene) {
        this.scene = scene;
        this.object = null;
        this.mixer = null;
        this.closeAnimation = null;

        this.loadObject();
    }

    loadObject() {
        const loader = new GLTFLoader();

        loader.load('models/animated-object/animated-model.glb', gltf => {
            // we do not want to import lights
            removeLights(gltf.scene);
            
            this.object = gltf.scene;

            // fix scaling (each model needs different values)
            this.object.scale.set(1, 1, 1);

            // fix rotation (each model needs different values)
            this.object.rotation.set(0, Math.PI / 4, 0);

            // place it somewhere (optional, can be done later)
            this.object.position.set(2, -1, -2);

            // load animations
            this.mixer = new THREE.AnimationMixer(this.object);

            // closing animations
            this.closeAnimation = this.mixer.clipAction(gltf.animations[0]);
            this.closeAnimation.repetitions = 1;
            this.closeAnimation.clampWhenFinished = true;

            // add to scene
            this.scene.add(this.object);

        }, undefined, error => {
            console.error(error);
        });
    }

    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }

    close() {
        this.closeAnimation.play();
    }
}