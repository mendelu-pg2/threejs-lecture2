import Scene from './Scene';

let scene;

window.onload = () => {

    // init the scene
    
    scene = new Scene();
    scene.render();

    
    // bind UI events

    document.getElementById("close-button").addEventListener('click', () => {
        scene.animatedBlenderObject.close();
    });

};
