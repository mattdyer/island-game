import { Sprite } from "pixi.js";

import { Screen } from "./screen";

class Character{

    document: Document;
    
    constructor(document: Document) {
        this.document = document;
    }

    addEventListeners(guy: Sprite, screen: Screen) {
        this.document.addEventListener("keydown", (event) => {

            let currentSection = screen.getCurrentSection(guy.x, guy.y);

            console.log("Current section:", currentSection);
            
            if (event.key === "ArrowRight" || event.key === "d") {
              guy.x += 10; // Move guy to the right
            }
            if (event.key === "ArrowLeft" || event.key === "a") {
              guy.x -= 10; // Move guy to the left
            }
            if (event.key === "ArrowUp" || event.key === "w") {
              guy.y -= 10; // Move guy up
            }
            if (event.key === "ArrowDown" || event.key === "s") {
              guy.y += 10; // Move guy down
            }
          });
    }


}

export { Character };