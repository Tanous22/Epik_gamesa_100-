import * as THREE from "three";

export class World {
    constructor(scene) {
        // Prostření
        scene.background = new THREE.Color(0xe0e0e0);
        scene.fog = new THREE.Fog(0x0e0e0, 20, 100);

        //Osvětlení
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 20, 10);
        scene.add(dirLight);

        //Podlaha
        const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);

        //Náhodne překážky
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

        for (let i = 0; i < 20; i++){
            const obstacle = new THREE.Mesh(geometry, material);
            obstacle.position.x = (Math.random() - 0.5) * 40;
            obstacle.position.z = (Math.random() - 0.5) * 40;
            obstacle.position.y = obstacle.scale.y / 2;

            obstacle.scale.x = Math.random() + 0.5;
            obstacle.scale.y = Math.random() * 3 + 0.5;
            obstacle.scale.z = Math.random() + 0.5;

            obstacle.position.y = obstacle.scale.y / 2;

            scene.add(obstacle);
        }
    }
}