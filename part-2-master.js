var readlineSync = require("readline-sync");

function battleship() {

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const final = [];
  const previousGuesses = [];
  
  console.clear();
  readlineSync.keyIn("Press any key to start the game", { limit: /./ });
  console.clear();
  
  // Make grid ------------------------------------------------------------------------------------------------------------------------------------------------------
  
  function makeGrid (number) {
    const gridFunction = (number) => Array.from(Array(number).keys());
    const rowIndices = gridFunction(number);
    for (i = 0; i < number; i++) {
      let letter = () => rowIndices.map((element) => alphabet[i] +  (element + 1));  
      final.push(letter());
    }
    return final;
  }
  const grid = makeGrid(10);
  
  // Ship Class ------------------------------------------------------------------------------------------------------------------------------------------------------
  
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
      element.direction = Math.floor(Math.random() * 2);
    }
  
    randomNumber(shipCoord) {
      shipCoord.xCoord = Math.floor(Math.random() * 10);
      shipCoord.yCoord = Math.floor(Math.random() * 10);
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
        // console.log('yes');
        return ship;
      } else {
        // console.log('TRY AGAIN!!!!!');
        ship.array = [];
        ship.randomNumber(ship);
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
    
  }
  
  const carrierShip = new Ship('Carrier Ship', 5, []);
  const cruiser = new Ship('Cruiser', 4, []);
  const battleShip = new Ship('Battle Ship', 3, []);
  const destroyer = new Ship('Destroyer', 3, []);
  const tacticalShip = new Ship('Tactical Ship', 2, []);
  
  shipArray = [carrierShip, cruiser, battleShip, destroyer, tacticalShip];
  
  shipArray.forEach((ship) => ship.shipDirection(ship));
  shipArray.forEach((element) => element.randomNumber(element));
  shipArray.forEach((element) => element.path(element));
  
  console.clear();
  
  console.table(grid);
  
  
  // Attack sequence   ------------------------------------------------------------------------------------------------------------------------------------------------------
  
  // create ship Set
  
  const shipSet = new Set();
  shipArray.forEach((element) => shipSet.add(element));

  let flatArray = [];
  shipArray.forEach((element) => flatArray.push(element.array));
  flatArray = flatArray.flat();
  
  while (shipSet.size > 0) {
    const promptAttack = () => readlineSync.question([
      "Enter a location to strike (ie 'A2')  ",
    ]);
    
    const attack = promptAttack();
    console.clear();
    console.table(grid);
    
    if (flatArray.includes(attack)) {
      if (previousGuesses.includes(attack)) {
        console.log('You have already picked this location!')
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
                console.log(`You have sunk a battleship!!!! ${shipSet.size} ships remaining.`);
              } else if (shipSet.size === 1) {
                console.log(`You have sunk a battleship!!!! Only ${shipSet.size} ship left!`);
              }
            }
            const findCoordIndex = () => element.array.findIndex((index) => index === attack);
            const coordinateIndex = findCoordIndex();
            element.array.splice(coordinateIndex, 1);
          } 
        });
      }
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

  const playAgain = () => readlineSync.keyInYN(`
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

