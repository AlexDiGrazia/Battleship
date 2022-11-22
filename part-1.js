var readlineSync = require("readline-sync");

function battleship() {
  console.clear();
  readlineSync.keyIn("Press any key to start the game", { limit: /./ });
  console.clear();

  const grid = [
    ["j1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
  ];

  const shipsArray = [];
  const previousGuesses = [];

  for (i = 0; i < 2; i++) {
    const numberToSelectRow = (max = grid.length) =>
      Math.floor(Math.random() * max);
    const randomNumber = numberToSelectRow();

    const selectShipRow = () => grid[randomNumber];
    const shipRow = selectShipRow();

    const numberToSelectShip = (max = shipRow.length) =>
      Math.floor(Math.random() * max);
    const shipIndex = numberToSelectShip();

    const selectShip = () => shipRow[shipIndex];
    const ship = selectShip();

    const placeShip = () => shipsArray.push(ship);
    placeShip();

    const spliceShip = () => shipRow.splice(shipIndex, 1);
    spliceShip();
  }

  while (shipsArray.length > 0) {
    const promptAttack = () =>
      readlineSync.question(["Enter a location to strike (ie 'A2')  "]);

    const attack = promptAttack();
    console.clear();

    if (shipsArray.includes(attack)) {
      if (shipsArray.length > 1) {
        console.log(`
        Hit. You have sunk a battleship.  1 ship remaining
        `);
        previousGuesses.push(attack);
      } else if (shipsArray.length === 1) {
        console.log("Hit!!!!!!");
        previousGuesses.push(attack);
      }

      const findShipIndex = () =>
        shipsArray.findIndex((element) => element === attack);
      const shipsArrayIndex = findShipIndex();

      shipsArray.splice(shipsArrayIndex, 1);
    } else {
      if (previousGuesses.includes(attack)) {
        console.log(`
            You have already picked this location. Miss!
            `);
      } else {
        console.log(`
          You have missed!  
          `);
        previousGuesses.push(attack);
      }
    }
  }

  const playAgain = () =>
    readlineSync.keyInYN(`
  You have destroyed all battleships. Would you like to play again? 
  `);
  const restart = playAgain();

  if (restart) {
    battleship();
  } else {
    console.clear();
    console.log(`
      Thanks for playing!
      `);
  }
}

battleship();
