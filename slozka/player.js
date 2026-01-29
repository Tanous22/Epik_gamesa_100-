import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

export class Player {
    constructor(camera, domElement) {
        this.camera = camera;
        this.controls = new PointerLockControls(camera, domElement);

        //Kliknutím se zamkne myš
        document.addEventListener("click", () => {
            this.controls.lock();
        });

        //Proměné pro pohyb
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        // 3. Event Listenery (Klávesnice)
        // Používáme .bind(this), aby funkce věděla, kdo je "já" (hráč)
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

    }

        // Funkce pro stisk klávesy
        onKeyDown(event) {
            switch (event.code) {
                case "KeyW": this.moveForward = true; break;
                case "KeyA": this.moveLeft = true; break;
                case "KeyS": this.moveBackward = true; break;
                case "KeyD": this.moveRight = true; break;
            }
        }

        // Funkce pro uvolnění klávesy
        onKeyUp(event) {
            switch (event.code) {
                case "KeyW": this.moveForward = false; break;
                case "KeyA": this.moveLeft = false; break;
                case "KeyS": this.moveBackward = false; break;
                case "KeyD": this.moveRight = false; break;
            }
        }
        
        update() {
            if (this.controls.isLocked){
                const speed = 0.1;

                if (this.moveForward) this.controls.moveForward(speed);
                if (this.moveBackward) this.controls.moveForward(-speed);
                if (this.moveRight) this.controls.moveRight(speed);
                if (this.moveLeft) this.controls.moveRight(-speed);
            }
        }
}