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
  const final = [];
  const finalVG = [];
  const finalTemplate = [];
  const computerFinal = [];
  const previousGuesses = [];
  const computerPreviousGuesses = [];

  console.clear();
  readlineSync.keyIn("Press any key to start the game", { limit: /./ });
  console.clear();

  function makeGrid(number) {
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

  function makeTemplateGrid(number) {
    const gridFunction = (number) => Array.from(Array(number).keys());
    const rowIndices = gridFunction(number);
    for (i = 0; i < number; i++) {
      let letter = () =>
        rowIndices.map((element) => alphabet[i] + (element + 1));
      finalTemplate.push(letter());
    }
    return finalTemplate;
  }
  const gridTemplate = makeTemplateGrid(10);

  function makeVirtualGrid(number) {
    const gridFunction = (number) => Array.from(Array(number).keys());
    const rowIndices = gridFunction(number);
    for (i = 0; i < number; i++) {
      let emptyArray = () => rowIndices.map((element) => ["  "]);
      finalVG.push(emptyArray());
    }
    return finalVG;
  }
  const vg = makeVirtualGrid(10);

  function makeComputerGrid(number) {
    const gridFunction = (number) => Array.from(Array(number).keys());
    const rowIndices = gridFunction(number);
    for (i = 0; i < number; i++) {
      let letter = () =>
        rowIndices.map((element) => alphabet[i] + (element + 1));
      computerFinal.push(letter());
    }
    return computerFinal;
  }
  const computerGrid = makeComputerGrid(10);

  function randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  class Ship {
    constructor(name, length, array, direction, xCoord, yCoord) {
      this.name = name;
      this.length = length;
      this.array = array;
      this.direction = direction;
      this.xCoord = xCoord;
      this.yCoord = yCoord;
    }

    shipDirection(element) {
      element.direction = randomNumber(2);
    }

    shipCoordinates(shipCoord) {
      shipCoord.xCoord = randomNumber(10);
      shipCoord.yCoord = randomNumber(10);
    }

    makeShip(ship) {
      ship.array = [];
      if (ship.direction === 0) {
        for (i = 0; i < ship.length; i++) {
          if (ship.xCoord > ship.length) {
            const selectShipCoordinates = () =>
              grid[ship.yCoord][ship.xCoord - i];
            const shipCoordinate = selectShipCoordinates();
            ship.array.push(shipCoordinate);
          } else {
            const selectShip = () => grid[ship.yCoord][ship.xCoord + i];
            const someShipCoord = selectShip();
            ship.array.push(someShipCoord);
          }
        }
      } else if (ship.direction === 1) {
        for (i = 0; i < ship.length; i++) {
          if (ship.yCoord <= ship.length) {
            const makeShip = () => grid[ship.yCoord + i][ship.xCoord];
            const newShip = makeShip();
            ship.array.push(newShip);
          } else {
            const makeShip = () => grid[ship.yCoord - i][ship.xCoord];
            const newShip = makeShip();
            ship.array.push(newShip);
          }
        }
      }
    }

    noOverlap(ship) {
      ship.makeShip(ship);
      if (!ship.array.includes(null) && ship.array != []) {
        return ship;
      } else {
        ship.array = [];
        ship.shipCoordinates(ship);
        ship.noOverlap(ship);
      }
    }

    splice(ship) {
      if (ship.direction === 0) {
        for (i = 0; i < ship.length; i++) {
          if (ship.xCoord > ship.length) {
            grid[ship.yCoord].splice(ship.xCoord - i, 1, null);
          } else {
            grid[ship.yCoord].splice(ship.xCoord + i, 1, null);
          }
        }
      } else if (ship.direction === 1) {
        if (ship.yCoord <= ship.length) {
          for (i = ship.yCoord; i < ship.yCoord + ship.length; i++) {
            grid[i].splice(ship.xCoord, 1, null);
          }
        } else if (ship.yCoord > ship.length) {
          for (i = ship.yCoord; i > ship.yCoord - ship.length; i--) {
            grid[i].splice(ship.xCoord, 1, null);
          }
        }
      }
    }

    path(ship) {
      ship.makeShip(ship);
      ship.noOverlap(ship);
      ship.splice(ship);
    }

    makeComputerShip(ship) {
      ship.array = [];
      if (ship.direction === 0) {
        for (i = 0; i < ship.length; i++) {
          if (ship.xCoord > ship.length) {
            const selectShipCoordinates = () =>
              computerGrid[ship.yCoord][ship.xCoord - i];
            const shipCoordinate = selectShipCoordinates();
            ship.array.push(shipCoordinate);
          } else {
            const selectShip = () => computerGrid[ship.yCoord][ship.xCoord + i];
            const someShipCoord = selectShip();
            ship.array.push(someShipCoord);
          }
        }
      } else if (ship.direction === 1) {
        for (i = 0; i < ship.length; i++) {
          if (ship.yCoord <= ship.length) {
            const makeShip = () => computerGrid[ship.yCoord + i][ship.xCoord];
            const newShip = makeShip();
            ship.array.push(newShip);
          } else {
            const makeShip = () => computerGrid[ship.yCoord - i][ship.xCoord];
            const newShip = makeShip();
            ship.array.push(newShip);
          }
        }
      }
    }

    computerNoOverlap(ship) {
      ship.makeComputerShip(ship);
      if (!ship.array.includes(null) && ship.array != []) {
        return ship;
      } else {
        ship.array = [];
        ship.shipCoordinates(ship);
        ship.computerNoOverlap(ship);
      }
    }

    computerSplice(ship) {
      if (ship.direction === 0) {
        for (i = 0; i < ship.length; i++) {
          if (ship.xCoord > ship.length) {
            computerGrid[ship.yCoord].splice(ship.xCoord - i, 1, null);
          } else {
            computerGrid[ship.yCoord].splice(ship.xCoord + i, 1, null);
          }
        }
      } else if (ship.direction === 1) {
        if (ship.yCoord <= ship.length) {
          for (i = ship.yCoord; i < ship.yCoord + ship.length; i++) {
            computerGrid[i].splice(ship.xCoord, 1, null);
          }
        } else if (ship.yCoord > ship.length) {
          for (i = ship.yCoord; i > ship.yCoord - ship.length; i--) {
            computerGrid[i].splice(ship.xCoord, 1, null);
          }
        }
      }
    }

    computerPath(ship) {
      ship.makeComputerShip(ship);
      ship.computerNoOverlap(ship);
      ship.computerSplice(ship);
    }
  }

  const carrierShip = new Ship("Carrier Ship", 5, []);
  const cruiser = new Ship("Cruiser", 4, []);
  const battleShip = new Ship("Battle Ship", 3, []);
  const destroyer = new Ship("Destroyer", 3, []);
  const tacticalShip = new Ship("Tactical Ship", 2, []);

  shipArray = [carrierShip, cruiser, battleShip, destroyer, tacticalShip];

  shipArray.forEach((ship) => ship.shipDirection(ship));
  shipArray.forEach((element) => element.shipCoordinates(element));
  shipArray.forEach((element) => element.path(element));

  const computerCarrierShip = new Ship("Computer Carrier Ship", 5, []);
  const computerCruiser = new Ship("Computer Cruiser", 4, []);
  const computerBattleShip = new Ship("Computer Battle Ship", 3, []);
  const computerDestroyer = new Ship("Computer Destroyer", 3, []);
  const computerTacticalShip = new Ship("Computer Tactical Ship", 2, []);

  computerShipArray = [
    computerCarrierShip,
    computerCruiser,
    computerBattleShip,
    computerDestroyer,
    computerTacticalShip,
  ];

  computerShipArray.forEach((ship) => ship.shipDirection(ship));
  computerShipArray.forEach((element) => element.shipCoordinates(element));
  computerShipArray.forEach((element) => element.computerPath(element));

  console.clear();

  const shipSet = new Set();
  shipArray.forEach((element) => shipSet.add(element));

  const computerShipSet = new Set();
  computerShipArray.forEach((element) => computerShipSet.add(element));

  let shipFlatArray = [];
  shipArray.forEach((element) => shipFlatArray.push(element.array));
  shipFlatArray = shipFlatArray.flat();

  let computerShipFlatArray = [];
  computerShipArray.forEach((element) =>
    computerShipFlatArray.push(element.array)
  );
  computerShipFlatArray = computerShipFlatArray.flat();

  const computerArrayOfAttacks = gridTemplate.flat();

  while (shipSet.size > 0 && computerShipSet.size > 0) {
    const promptAttack = () =>
      readlineSync.question("Enter a location to strike (ie 'A2')  ", {
        limit: [gridTemplate],
        limitMessage:
          "This is not a valid location. Please only enter coordinate on the playing board.",
      });

    const attack = promptAttack();
    console.clear();

    function row() {
      for (i = 0; i < gridTemplate.length; i++) {
        if (gridTemplate[i].includes(attack)) {
          return i;
        }
      }
    }
    const rowCoord = row();

    const findCoordIndex = () =>
      gridTemplate[rowCoord].findIndex((element) => element === attack);
    const coordinateIndex = findCoordIndex();

    console.clear();
    if (shipFlatArray.includes(attack)) {
      vg[rowCoord].splice(coordinateIndex, 1, "🔥");
      if (previousGuesses.includes(attack)) {
        console.log("You have already picked this location!");
      } else {
        shipArray.forEach((element) => {
          if (element.array.includes(attack)) {
            if (element.array.length > 1) {
              console.log("Hit!!!!!!");
              previousGuesses.push(attack);
            } else if (element.array.length === 1) {
              previousGuesses.push(attack);
              shipSet.delete(element);
              if (shipSet.size > 1) {
                console.log(
                  `You have sunk a battleship!!!! ${shipSet.size} ships remaining.`
                );
              } else if (shipSet.size === 1) {
                console.log(
                  `You have sunk a battleship!!!! Only ${shipSet.size} ship left!`
                );
              }
            }
            const shipArrayCoordIndex = () =>
              element.array.findIndex((index) => index === attack);
            const shipArrayCoordinateIndex = shipArrayCoordIndex();
            element.array.splice(shipArrayCoordinateIndex, 1);
          }
        });
      }
    } else {
      vg[rowCoord].splice(coordinateIndex, 1, "🟦");
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

    let board = `
        1    2    3    4    5    6    7    8    9    10 
      --------------------------------------------------- 
    a | ${vg[0][0]} | ${vg[0][1]} | ${vg[0][2]} | ${vg[0][3]} | ${vg[0][4]} | ${vg[0][5]} | ${vg[0][6]} | ${vg[0][7]} | ${vg[0][8]} | ${vg[0][9]} |
      ---------------------------------------------------
    b | ${vg[1][0]} | ${vg[1][1]} | ${vg[1][2]} | ${vg[1][3]} | ${vg[1][4]} | ${vg[1][5]} | ${vg[1][6]} | ${vg[1][7]} | ${vg[1][8]} | ${vg[1][9]} |
      ---------------------------------------------------
    c | ${vg[2][0]} | ${vg[2][1]} | ${vg[2][2]} | ${vg[2][3]} | ${vg[2][4]} | ${vg[2][5]} | ${vg[2][6]} | ${vg[2][7]} | ${vg[2][8]} | ${vg[2][9]} |
      ---------------------------------------------------
    d | ${vg[3][0]} | ${vg[3][1]} | ${vg[3][2]} | ${vg[3][3]} | ${vg[3][4]} | ${vg[3][5]} | ${vg[3][6]} | ${vg[3][7]} | ${vg[3][8]} | ${vg[3][9]} |
      ---------------------------------------------------
    e | ${vg[4][0]} | ${vg[4][1]} | ${vg[4][2]} | ${vg[4][3]} | ${vg[4][4]} | ${vg[4][5]} | ${vg[4][6]} | ${vg[4][7]} | ${vg[4][8]} | ${vg[4][9]} |
      ---------------------------------------------------
    f | ${vg[5][0]} | ${vg[5][1]} | ${vg[5][2]} | ${vg[5][3]} | ${vg[5][4]} | ${vg[5][5]} | ${vg[5][6]} | ${vg[5][7]} | ${vg[5][8]} | ${vg[5][9]} |
      ---------------------------------------------------
    g | ${vg[6][0]} | ${vg[6][1]} | ${vg[6][2]} | ${vg[6][3]} | ${vg[6][4]} | ${vg[6][5]} | ${vg[6][6]} | ${vg[6][7]} | ${vg[6][8]} | ${vg[6][9]} |
      ---------------------------------------------------
    h | ${vg[7][0]} | ${vg[7][1]} | ${vg[7][2]} | ${vg[7][3]} | ${vg[7][4]} | ${vg[7][5]} | ${vg[7][6]} | ${vg[7][7]} | ${vg[7][8]} | ${vg[7][9]} |
      ---------------------------------------------------
    i | ${vg[8][0]} | ${vg[8][1]} | ${vg[8][2]} | ${vg[8][3]} | ${vg[8][4]} | ${vg[8][5]} | ${vg[8][6]} | ${vg[8][7]} | ${vg[8][8]} | ${vg[8][9]} |
      ---------------------------------------------------
    j | ${vg[9][0]} | ${vg[9][1]} | ${vg[9][2]} | ${vg[9][3]} | ${vg[9][4]} | ${vg[9][5]} | ${vg[9][6]} | ${vg[9][7]} | ${vg[9][8]} | ${vg[9][9]} |
      ---------------------------------------------------
    `;

    console.log(board);

    let computerAttack =
      computerArrayOfAttacks[randomNumber(computerArrayOfAttacks.length)];
    const attackIndex = computerArrayOfAttacks.findIndex(
      (element) => element === computerAttack
    );
    computerArrayOfAttacks.splice(attackIndex, 1);

    if (computerShipFlatArray.includes(computerAttack)) {
      computerShipArray.forEach((element) => {
        if (element.array.includes(computerAttack)) {
          if (element.array.length > 1) {
            console.log(`
              The computer has hit one of your ships!
              `);
          } else if (element.array.length === 1) {
            computerShipSet.delete(element);
            if (computerShipSet.size > 1) {
              console.log(`
                The computer has sunk one of your battleships! You have ${computerShipSet.size} ships remaining.
                `);
            } else if (computerShipSet.size === 1) {
              console.log(`
                The computer has sunk one of your battleships! You now only have ${computerShipSet.size} ship left!
                `);
            }
          }
          const findCoordIndex = () =>
            element.array.findIndex((index) => index === computerAttack);
          const coordinateIndex = findCoordIndex();
          element.array.splice(coordinateIndex, 1);
        }
      });
    } else {
      console.log(`
          The computer missed!  
          `);
    }
  }

  if (shipSet.size === 0) {
    console.log(`
    You have destroyed all of the battleships!!!
    `);
  } else if (computerShipSet.size === 0) {
    console.log(`
    You lost :(
      `);
  }

  const playAgain = () =>
    readlineSync.keyInYN(`
  Would you like to play again? 
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
