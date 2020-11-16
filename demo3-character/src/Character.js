import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { removeLights} from './utils'

export default class Character {
    constructor(scene) {
        this.scene = scene;
        this.object = null;
        this.gltf = null;
        this.mixer = null;

        this.loadObject(() => 
            this.loadAnimations()
        );
    }

    loadObject(onComplete) {
        const loader = new GLTFLoader();

        loader.load(
            'models/character/eva-animated.glb',
            (gltf) => {
                this.gltf = gltf;
                this.object = gltf.scene;
                removeLights(this.object);

                this.object.position.x = 0;
                this.object.position.y = 0;
                this.object.position.z = -1;

                this.object.scale.x = 2;
                this.object.scale.y = 2;
                this.object.scale.z = 2;

                this.scene.add(this.object);

                onComplete();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log('An error happened', error);
            }
        );
    }

    loadAnimations() {
        this.mixer = new THREE.AnimationMixer( this.object );
        const clips = this.gltf.animations;

        const idleClip = THREE.AnimationClip.findByName(clips, 'idle');
        this.idleAnimation = this.mixer.clipAction(idleClip);
        this.idleAnimation.setLoop(THREE.LoopRepeat, Infinity);
        this.idleAnimation.enabled = true;

        const runClip = THREE.AnimationClip.findByName(clips, 'run');
        this.runAnimation = this.mixer.clipAction(runClip);
        this.runAnimation.setLoop(THREE.LoopRepeat, Infinity);
        this.runAnimation.enabled = true;

        const flyClip = THREE.AnimationClip.findByName(clips, 'fly');
        this.flyAnimation = this.mixer.clipAction(flyClip);
        this.flyAnimation.setLoop(THREE.LoopRepeat, Infinity);
        this.flyAnimation.enabled = true;

        // a) playing two animations at the same time
        // this.idleAnimation.setEffectiveWeight(0.4); 
        // this.runAnimation.setEffectiveWeight(0.6); 
        // this.runAnimation.play();
        // this.idleAnimation.play();

        // b) start animating immediately (no crossfade)
        // this.runAnimation.play();

        // c) gradient transition between animations during 10 seconds (crossfading)
        this.idleAnimation.play();
        this.runAnimation.play();
        this.idleAnimation.crossFadeTo(this.runAnimation, 10);

    }

    update(time) {
        if (this.mixer) {
            this.mixer.update(time);
        }
    }
}