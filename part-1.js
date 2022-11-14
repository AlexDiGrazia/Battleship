var readlineSync = require("readline-sync");

function battleship() {
  const grid = [
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
  ];
  console.clear();
  readlineSync.keyIn("Press any key to start the game", { limit: /./ });
  console.clear();

  const randomNumberSelectRow = (max = grid.length) => Math.floor(Math.random() * max);
  let shipsArray = [];

  function placeShip() {
    const shipRow = grid[randomNumberSelectRow()];
    const randomNumberSelectShip = (max = shipRow.length) =>
      Math.floor(Math.random() * max);
    const ship = shipRow[randomNumberSelectShip()];
    shipsArray.push(ship);
    const shipIndex = shipRow.findIndex((element) => element === ship);
    shipRow.splice(shipIndex, 1);
  }

  placeShip();
  placeShip();

  const previousGuesses = [];

  function attack() {
    const promptAttack = readlineSync.question([
      "Enter a location to strike (ie 'A2')  ",
    ]);
    console.clear();
    if (shipsArray.includes(promptAttack)) {
      if (shipsArray.length > 1) {
        console.log(`
          Hit. You have sunk a battleship.  1 ship remaining
          `);
        previousGuesses.push(promptAttack);
      } else if (shipsArray.length === 1) {
        console.log("Hit!!!!!!");
      }
      previousGuesses.push(promptAttack);
      const shipsArrayIndex = shipsArray.findIndex(
        (element) => element === promptAttack
      );
      shipsArray.splice(shipsArrayIndex, 1);
    } else {
      if (previousGuesses.includes(promptAttack)) {
        console.log(`
          You have already picked this location. Miss!
          `);
      } else {
        console.log(`
        You have missed!  
        `);
        previousGuesses.push(promptAttack);
      }
    }
  }
  attack();

  function winOrLose() {
    if (shipsArray.length === 0) {
      if (
        readlineSync.keyInYN(`
        You have destroyed all battleships. Would you like to play again? 
        `) === true
      ) {
        battleship();
      } else {
        console.clear();
        console.log(`
          Thanks for playing!
          `);
      }
    } else {
      attack();
      winOrLose();
    }
  }
  winOrLose();
}

battleship();
