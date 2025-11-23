import { Application, Assets, Sprite } from "pixi.js";

import { Character } from "./character";
import { Screen } from "./screen";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const texture = await Assets.load("/assets/bunny.png");

  const levels = await Assets.load("/assets/levels.json");

  let state = {
    "currentLevel": "home",
    "currentScreen": null,
    "newScreen": null,
    "newLevel": null
  };

  let currentLevel = levels[state.currentLevel];

  let screens = await Assets.load("/assets/levels/" + currentLevel.screenFile);

  state.currentScreen = screens[currentLevel.startingScreen];

  let sections = await Assets.load("/assets/levels/" + state.currentLevel + "/" + screens[currentLevel.startingScreen].sectionFile);


  const screen = new Screen(state.currentScreen, sections);

  await screen.draw(app);

  const guy = new Sprite(texture);

  const character = new Character(document, state);

  character.addEventListeners();

  // Center the sprite's anchor point
  guy.anchor.set(0.5);

  guy.position.set(10, 10);

  // Add the guy to the stage
  app.stage.addChild(guy);

  // Listen for animate update
  app.ticker.add((time) => {
    character.move(guy, screen, time);

    if (state.newScreen) {
      guy.position.set(10, 10);
      state.currentScreen = screens[state.newScreen];
      screen.change(state.currentScreen, state.currentLevel, screens[state.newScreen].sectionFile, app, guy).then((newScreenData) => {
        state.newScreen = null;
        sections = newScreenData;
      });
    }

    if (state.newLevel) {
      guy.position.set(10, 10);
      state.currentLevel = state.newLevel;
      let currentLevel = levels[state.currentLevel];
      state.currentScreen = screens[currentLevel.startingScreen];
      loadLevel(currentLevel, state.currentLevel, state.currentScreen, app, guy);
      state.newLevel = null;
    }


    //screen.draw(app);
    //console.log(state.currentScreen);
  });

})();

async function loadLevel(currentLevel: any, currentLevelName: string, currentScreen: any, app: Application, guy: Sprite) {

  let screens = await Assets.load("/assets/levels/" + currentLevel.screenFile);

  let sections = await Assets.load("/assets/levels/" + currentLevelName + "/" + screens[currentLevel.startingScreen].sectionFile);

  const screen = new Screen(currentScreen, sections);
  await screen.change(currentScreen, currentLevel, screens[currentLevel.startingScreen].sectionFile, app, guy).then((newScreenData) => {
    sections = newScreenData;
  });
}
