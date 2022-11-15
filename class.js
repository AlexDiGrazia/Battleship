console.clear();

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const final = [];
const ship5 = [];
const shipFive = [];
const coords = [];


// Make grid

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


// Ship Class 

class Ship {
  constructor (name, length, array, direction, xCoord, yCoord) {
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

  path(ship) {
    if (ship.direction === 0) {
      console.log('horizontal');
      ship.horizontalShip(ship);
    } else if (ship.direction === 1) {
      console.log('vertical');
      ship.verticalShip(ship);
    }
  }  

  randomNumber(shipCoord) {
    shipCoord.xCoord = Math.floor(Math.random() * 10);
    shipCoord.yCoord = Math.floor(Math.random() * 10);
  }

  horizontalShip(ship) {
    for(i = 0; i < ship.length; i++) {
      if (ship.xCoord > ship.length) {
        const selectShipCoordinates = () => grid[ship.yCoord][ship.xCoord - i];
        const shipCoordinate = selectShipCoordinates();
        ship.array.push(shipCoordinate);
        // grid[ship.yCoord].splice((ship.xCoord - i), 1, null);
      } else {
          const selectShip = () => grid[ship.yCoord][ship.xCoord + i];
          const someShipCoord = selectShip();
          ship.array.push(someShipCoord);
          // grid[ship.yCoord].splice((ship.xCoord + i), 1, null);
      }
    }
  }

  verticalShip(ship) {
    for(i = 0; i < ship.length; i++) {
      if(ship.yCoord <= ship.length) {
        const makeShip = () => grid[ship.yCoord + i][ship.xCoord];
        const newShip = makeShip();
        ship.array.push(newShip);
      } else {
        const makeShip = () => grid[ship.yCoord - i][ship.xCoord];
        const newShip = makeShip();
        ship.array.push(newShip);
      }
    }
    return ship.yCoord;
  }
}


const carrierShip = new Ship('Carrier', 5, []);
const cruiser = new Ship('Cruiser', 4, []);
const battleShip = new Ship('Battle Ship', 3, []);
const destroyer = new Ship('Destroyer', 3, []);
const tacticalShip = new Ship('Tactical Ship', 2, []);

shipArray = [carrierShip, cruiser, battleShip, destroyer, tacticalShip];

shipArray.forEach((ship) => ship.shipDirection(ship));
shipArray.forEach((element) => element.randomNumber(element));
shipArray.forEach((element) => element.path(element));
// shipArray.forEach((element) => element.horizontalShip(element));
// shipArray.forEach((element) => element.verticalShip(element));

console.clear();

console.log(shipArray);






















console.table(grid);