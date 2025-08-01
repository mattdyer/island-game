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
    "currentScreen": null
  };

  let currentLevel = levels[state.currentLevel];

  state.currentScreen = currentLevel.screens[currentLevel.startingScreen];


  const screen = new Screen(state.currentScreen);

  await screen.draw(app);

  const guy = new Sprite(texture);

  const character = new Character(document);

  character.addEventListeners(guy, screen);

  // Center the sprite's anchor point
  guy.anchor.set(0.5);

  // Move the sprite to the center of the screen
  guy.position.set(10, 10);

  // Add the guy to the stage
  app.stage.addChild(guy);

  // Listen for animate update
  app.ticker.add((time) => {
    character.move(guy, screen);
  });
})();
