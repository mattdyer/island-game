import { Application, Assets, Sprite } from "pixi.js";

class Screen{

    screenData: any;
    sections: any;
    
    constructor(screenData: any, sections: any) {
        
        this.screenData = screenData;
        this.sections = sections;
        
    }

    async change(currentScreen: any, currentLevel: String, sectionFile: String, app: Application, guy: Sprite) {
        this.screenData = currentScreen;
        this.sections = await Assets.load("/assets/levels/" + currentLevel + "/" + sectionFile);;
        await this.draw(app);
        app.stage.removeChild(guy);
        app.stage.addChild(guy);

        return this.sections;
    }


    async draw(app: Application) {
        
        console.log("Drawing screen:", this.screenData);
        
        let width = this.sections[0].length;
        let height = this.sections.length;

        let screenWidth = app.screen.width;
        let screenHeight = app.screen.height;

        let sectionWidth = screenWidth / width;
        let sectionHeight = screenHeight / height;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let section = this.sections[y][x];
                
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
        let sectionWidth = this.sections[0].length;
        let sectionHeight = this.sections.length;

        let sectionX = Math.floor(x / (window.innerWidth / sectionWidth));
        let sectionY = Math.floor(y / (window.innerHeight / sectionHeight));

        if (sectionX < 0 || sectionX >= sectionWidth || sectionY < 0 || sectionY >= sectionHeight) {
            return null; // Out of bounds
        }

        //console.log("Section coordinates:", sectionX, sectionY);

        return this.sections[sectionY][sectionX];
    }

}

export { Screen };