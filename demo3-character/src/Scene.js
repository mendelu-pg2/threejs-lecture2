// import Triangle from './Triangle';
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Lights from "./Lights";
import Character from "./Character";

export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.clock = new THREE.Clock();

        this.camera.position.x = 1;
        this.camera.position.y = 2;
        this.camera.position.z = 5;

        this.lights = new Lights(this.scene);
        this.character = new Character(this.scene);
    }

    animate(time) {
        requestAnimationFrame(time => this.animate(time));
        TWEEN.update(time);
        const delta = this.clock.getDelta();
        this.character.update(delta);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        this.animate();
    }

}
