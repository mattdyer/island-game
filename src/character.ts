import { Sprite } from "pixi.js";

class Character{

    document: Document;
    
    constructor(document: Document) {
        this.document = document;
    }

    addEventListeners(guy: Sprite) {
        this.document.addEventListener("keydown", (event) => {
            
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