import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Přidáme kostku abychom lépe viděli

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 2, -5);
scene.add(cube);

//Přidání podlahy
const floorGeometry = new THREE.PlaneGeometry(20, 20);

//Přidání podlahy materiál a barvu
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });

//Mesh
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);

camera.position.z = 5;
camera.position.y = 2;

const controls = new PointerLockControls(camera, document.body);

document.addEventListener("click", () => {
    controls.lock();
});

//Pohyb pomocí kláves
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const onKeyDown = (event) => {3
    switch (event.code){
        case "KeyW": moveForward = true; break;
        case "KeyA": moveLeft = true; break;
        case "KeyS": moveBackward = true; break;
        case "KeyD": moveRight = true; break;
    }
}

const onKeyUp = (event) => {
    switch (event.code){
        case "KeyW": moveForward = false; break;
        case "KeyA": moveLeft = false; break;
        case "KeyS": moveBackward = false; break;
        case "KeyD": moveRight = false; break;
    }
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

function animate() {
    requestAnimationFrame(animate);

    if(controls.isLocked){
        const speed = 0.1;

        if(moveForward) controls.moveForward(speed);
        if(moveBackward) controls.moveForward(-speed);
        if(moveRight) controls.moveRight(speed);
        if(moveLeft) controls.moveRight(-speed);
    }

    //Rotace kostky
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene,camera);
}

animate();

