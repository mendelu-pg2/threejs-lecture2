// import Triangle from './Triangle';
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import BlenderObject from './BlenderObject';
import Lights from "./Lights";

export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.camera.position.x = 1;
        this.camera.position.y = 2;
        this.camera.position.z = 5;

        this.lights = new Lights(this.scene);
        this.blenderObject = new BlenderObject(this.scene);
    }

    animate(time) {
        requestAnimationFrame(() => this.animate());
        TWEEN.update(time);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        this.animate();
    }

}
