import { Sprite } from "pixi.js";

import { Screen } from "./screen";

class Character{

    document: Document;
    keysDown: Set<string> = new Set();
    
    constructor(document: Document) {
        this.document = document;
    }

    move(guy: Sprite, screen: Screen, time: any) {
        //let currentSection = screen.getSectionFromCoords(guy.x, guy.y);

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

        let newSection = screen.getSectionFromCoords(newX, newY + (guy.height / 3));

        //console.log(guy.width);
        //console.log(guy.height);

        if(newSection.passable) {
            guy.x = newX;
            guy.y = newY;
        }
    }

    addEventListeners() {
        
        this.document.addEventListener("keyup", (event) => {
            this.keysDown.delete(event.key);
        });
        
        this.document.addEventListener("keydown", (event) => {

            this.keysDown.add(event.key);

        });
    }


}

export { Character };