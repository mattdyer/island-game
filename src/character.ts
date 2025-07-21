import { Sprite } from "pixi.js";

class Character{

    document: Document;
    
    constructor(document: Document) {
        this.document = document;
    }

    addEventListeners(bunny: Sprite) {
        this.document.addEventListener("keydown", (event) => {
            
            if (event.key === "ArrowRight" || event.key === "d") {
              bunny.x += 10; // Move bunny to the right
            }
            if (event.key === "ArrowLeft" || event.key === "a") {
              bunny.x -= 10; // Move bunny to the left
            }
            if (event.key === "ArrowUp" || event.key === "w") {
              bunny.y -= 10; // Move bunny up
            }
            if (event.key === "ArrowDown" || event.key === "s") {
              bunny.y += 10; // Move bunny down
            }
          });
    }


}

export { Character };