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
        this.isRunning = false;

        // 3. Event Listenery (Klávesnice)
        // Používáme .bind(this), aby funkce věděla, kdo je "já" (hráč)
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        this.velocityY = 0;
        this.gravity = 0.005;
        this.jumpStrengh = 0.25;
        this.canJump = false;

    }

        // Funkce pro stisk klávesy
        onKeyDown(event) {
            switch (event.code) {
                case "KeyW": this.moveForward = true; break;
                case "KeyA": this.moveLeft = true; break;
                case "KeyS": this.moveBackward = true; break;
                case "KeyD": this.moveRight = true; break;
                case "ShiftLeft": this.isRunning = true; break;
                case "Space":
                    if (this.canJump === true){
                        this.velocityY = this.jumpStrengh;
                        this.canJump = false;
                    }
                    break;
            }
        }

        // Funkce pro uvolnění klávesy
        onKeyUp(event) {
            switch (event.code) {
                case "KeyW": this.moveForward = false; break;
                case "KeyA": this.moveLeft = false; break;
                case "KeyS": this.moveBackward = false; break;
                case "KeyD": this.moveRight = false; break;
                case "ShiftLeft": this.isRunning = false; break;
            }
        }
        
        update() {
            if (this.controls.isLocked){
                const speed = this.isRunning ? 0.25 : 0.15;

                if (this.moveForward) this.controls.moveForward(speed);
                if (this.moveBackward) this.controls.moveForward(-speed);
                if (this.moveRight) this.controls.moveRight(speed);
                if (this.moveLeft) this.controls.moveRight(-speed);

                //Gravitace
                this.velocityY -= this.gravity;
                this.camera.position.y += this.velocityY;
                //Ošetření kolize s podlahou (potom kolize i s objektama)
                if (this.camera.position.y < 1.6){
                    this.camera.position.y = 1.6;
                    this.velocityY = 0;
                    this.canJump = true;
                }
            }
        }
}