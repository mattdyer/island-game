import { Application, Assets, Sprite } from "pixi.js";

class Screen{

    screenData: any;
    
    constructor(screenData: any) {
        
        this.screenData = screenData;
        
    }


    async draw(app: Application) {
        
        console.log("Drawing screen:", this.screenData);
        
        let width = this.screenData.sections[0].length;
        let height = this.screenData.sections.length;

        let screenWidth = app.screen.width;
        let screenHeight = app.screen.height;

        let sectionWidth = screenWidth / width;
        let sectionHeight = screenHeight / height;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let section = this.screenData.sections[y][x];
                
                let texture = await Assets.load(section.texture);

                let sprite = new Sprite(texture);

                sprite.width = sectionWidth;
                sprite.height = sectionHeight;
                sprite.x = x * sectionWidth;
                sprite.y = y * sectionHeight;

                app.stage.addChild(sprite);
            }
        }

        //console.log("Screen dimensions:", width, "x", height);
    }

    getSectionFromCoords(x: number, y: number) {
        let sectionWidth = this.screenData.sections[0].length;
        let sectionHeight = this.screenData.sections.length;

        let sectionX = Math.floor(x / (window.innerWidth / sectionWidth));
        let sectionY = Math.floor(y / (window.innerHeight / sectionHeight));

        if (sectionX < 0 || sectionX >= sectionWidth || sectionY < 0 || sectionY >= sectionHeight) {
            return null; // Out of bounds
        }

        //console.log("Section coordinates:", sectionX, sectionY);

        return this.screenData.sections[sectionY][sectionX];
    }

}

export { Screen };