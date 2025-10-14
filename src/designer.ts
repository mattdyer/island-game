import { Application, Assets, Sprite, Container } from "pixi.js";

import { Screen } from "./screen";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const toolbar = new Container();

  const texture = await Assets.load("/assets/grass.jpg");
  const item = new Sprite(texture);

  toolbar.addChild(item);

  // Center the sprite's anchor point
  item.anchor.set(0.5);
  item.width = 20;
  item.height = 20;

  item.position.set(10, 10);

  // Add the item to the stage
  app.stage.addChild(toolbar);


})();
