var readlineSync = require("readline-sync");

function battleship() {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  console.clear();
  readlineSync.keyIn("Press any key to start the game", { limit: /./ });
  console.clear();

  // Make grid ------------------------------------------------------------------------------------------------------------------------------------------------------

  function makeGrid(number) {
    const final = [];
    const gridFunction = (number) => Array.from(Array(number).keys());
    const rowIndices = gridFunction(number);
    for (i = 0; i < number; i++) {
      let letter = () =>
        rowIndices.map((element) => alphabet[i] + (element + 1));
      final.push(letter());
    }
    return final;
  }
  const grid = makeGrid(10);
  const gridTemplate = makeGrid(10);
  const computerGrid = makeGrid(10);

  console.table(grid);
  console.table(gridTemplate);
  console.table(computerGrid);

  function makeVirtualGrid(number) {
    let finalVG = [];
    const gridFunction = (number) => Array.from(Array(number).keys());
    const rowIndices = gridFunction(number);
    for (i = 0; i < number; i++) {
      let emptyArray = () => rowIndices.map((element) => ["  "]);
      finalVG.push(emptyArray());
    }
    return finalVG;
  }
  const vg = makeVirtualGrid(10);
  console.log(vg);
}
battleship();
