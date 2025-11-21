import { Application, Assets, Sprite, Container } from "pixi.js";

interface TileData {
  passable: boolean;
  texture: string;
  screenChangeTrigger?: string;
}

(async () => {
  // Initialize PixiJS Application
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const stage = app.stage;
  const gridContainer = new Container();
  stage.addChild(gridContainer);

  // State
  let gridData: TileData[][] = [];
  let gridWidth = 10;
  let gridHeight = 10;

  // Assets
  const textures = {
    grass: await Assets.load("assets/grass.jpg"),
    rock: await Assets.load("assets/rock.jpg"),
    trigger: await Assets.load("assets/trigger.jpg"),
  };

  const texturePaths = {
    grass: "assets/grass.jpg",
    rock: "assets/rock.jpg",
    trigger: "assets/trigger.jpg",
  };

  // UI Elements
  const widthInput = document.getElementById("grid-width") as HTMLInputElement;
  const heightInput = document.getElementById("grid-height") as HTMLInputElement;
  const createBtn = document.getElementById("create-grid") as HTMLButtonElement;
  const exportBtn = document.getElementById("export-json") as HTMLButtonElement;
  const jsonOutput = document.getElementById("json-output") as HTMLTextAreaElement;
  const radioButtons = document.querySelectorAll('input[name="tile-type"]');

  // Helper to get selected tile type
  function getSelectedTileType(): "grass" | "rock" | "trigger" {
    let selected = "grass";
    radioButtons.forEach((rb: any) => {
      if (rb.checked) selected = rb.value;
    });
    return selected as "grass" | "rock" | "trigger";
  }

  function createGrid() {
    gridWidth = parseInt(widthInput.value) || 10;
    gridHeight = parseInt(heightInput.value) || 10;

    gridData = [];
    for (let y = 0; y < gridHeight; y++) {
      const row: TileData[] = [];
      for (let x = 0; x < gridWidth; x++) {
        row.push({
          passable: true,
          texture: texturePaths.grass
        });
      }
      gridData.push(row);
    }
    renderGrid();
  }

  function renderGrid() {
    gridContainer.removeChildren();

    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;

    // Calculate tile size to fit the screen
    const tileWidth = screenWidth / gridWidth;
    const tileHeight = screenHeight / gridHeight;

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const tileData = gridData[y][x];
        let texture = textures.grass;

        if (tileData.texture === texturePaths.rock) texture = textures.rock;
        if (tileData.texture === texturePaths.trigger) texture = textures.trigger;

        const sprite = new Sprite(texture);
        sprite.width = tileWidth;
        sprite.height = tileHeight;
        sprite.x = x * tileWidth;
        sprite.y = y * tileHeight;

        // Interaction
        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';
        sprite.on('pointerdown', () => {
          updateTile(x, y);
        });
        // Enable drag painting
        sprite.on('pointerover', (e) => {
          if (e.buttons === 1) { // Left mouse button held down
            updateTile(x, y);
          }
        });


        gridContainer.addChild(sprite);
      }
    }
  }

  function updateTile(x: number, y: number) {
    const type = getSelectedTileType();
    const tile = gridData[y][x];

    if (type === "grass") {
      tile.passable = true;
      tile.texture = texturePaths.grass;
      delete tile.screenChangeTrigger;
    } else if (type === "rock") {
      tile.passable = false;
      tile.texture = texturePaths.rock;
      delete tile.screenChangeTrigger;
    } else if (type === "trigger") {
      tile.passable = true;
      tile.texture = texturePaths.trigger;
      // Default trigger value, user might want to edit this manually in JSON for now
      // or we could add a prompt. For now, let's match screen2.json example
      tile.screenChangeTrigger = "screen1";
    }

    renderGrid(); // Re-render to show change. Optimization: just update this sprite texture.
  }

  function exportJSON() {
    const json = JSON.stringify(gridData, null, 4);
    jsonOutput.value = json;
    jsonOutput.style.display = "block";
    console.log("Exported JSON:", json);
  }

  // Event Listeners
  createBtn.addEventListener("click", createGrid);
  exportBtn.addEventListener("click", exportJSON);

  // Initial Grid
  createGrid();

})();
