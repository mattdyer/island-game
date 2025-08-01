import { Sprite } from "pixi.js";

import { Screen } from "./screen";

class Character{

    document: Document;
    keysDown: Set<string> = new Set();
    
    constructor(document: Document) {
        this.document = document;
    }

    move(guy: Sprite, screen: Screen) {
        let currentSection = screen.getSectionFromCoords(guy.x, guy.y);

        let newX = guy.x;
        let newY = guy.y;
        
        if (this.keysDown.has("ArrowRight") || this.keysDown.has("d")) {
            newX += 5; // Move guy to the right
        }
        if (this.keysDown.has("ArrowLeft") || this.keysDown.has("a")) {
            newX -= 5; // Move guy to the left
        }
        if (this.keysDown.has("ArrowUp") || this.keysDown.has("w")) {
            newY -= 5; // Move guy up
        }
        if (this.keysDown.has("ArrowDown") || this.keysDown.has("s")) {
            newY += 5; // Move guy down
        }

        let newSection = screen.getSectionFromCoords(newX, newY);

        if(newSection.passable) {
            guy.x = newX;
            guy.y = newY;
        }
    }

    addEventListeners(guy: Sprite, screen: Screen) {
        
        this.document.addEventListener("keyup", (event) => {
            this.keysDown.delete(event.key);
        });
        
        this.document.addEventListener("keydown", (event) => {

            this.keysDown.add(event.key);
            
            /*let currentSection = screen.getSectionFromCoords(guy.x, guy.y);

            let newX = guy.x;
            let newY = guy.y;
            
            if (event.key === "ArrowRight" || event.key === "d") {
              newX += 5; // Move guy to the right
            }
            if (event.key === "ArrowLeft" || event.key === "a") {
              newX -= 5; // Move guy to the left
            }
            if (event.key === "ArrowUp" || event.key === "w") {
              newY -= 5; // Move guy up
            }
            if (event.key === "ArrowDown" || event.key === "s") {
              newY += 5; // Move guy down
            }

            let newSection = screen.getSectionFromCoords(newX, newY);

            if(newSection.passable) {
                guy.x = newX;
                guy.y = newY;
            }*/

        });
    }


}

export { Character };