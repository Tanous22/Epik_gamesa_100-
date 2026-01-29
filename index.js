import * as THREE from 'three';
import { World } from "./slozka/world.js";
import { Player } from "./slozka/player.js";

const scene = new THREE.Scene();

const world = new World(scene);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 1.6; // Výška očí
scene.add(camera);

//render
const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias = hezčí hrany
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Začátek existence hráče
const player = new Player(camera, document.body);

//Gameloop
function animate() {
    requestAnimationFrame(animate);
    player.update();
    renderer.render(scene,camera);
}

animate();