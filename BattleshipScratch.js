console.clear();

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const final = [];
const ship5 = [];
const shipFive = [];
const coords = [];

class Ship {
  constructor (name, length, array, direction) {
    this.name = name;
    this.length = length;
    this.array = array;
    this.direction = direction;
  }

}

const ship1 = new Ship('destroyer', 5, [], 0);
console.log(ship1);

//make grid

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






const selectDirection = (max = 2) => Math.floor(Math.random() * max);
const direction = selectDirection();

if (direction === 0) {
  console.log('horizontal');
} else if (direction === 1) {
  console.log('vertical');
}




//horizontal ship

const numberToSelectRow = (max = grid.length) => Math.floor(Math.random() * max)
let randomNumber = numberToSelectRow();

const selectShipRow = () => grid[randomNumber]; 
let shipRow = selectShipRow();

const numberToSelectShip = (max = shipRow.length) => Math.floor(Math.random() * max);
let shipIndex = numberToSelectShip();

for(i = 0; i < 5; i++) {
  if (shipIndex > 5) {
    const selectShipCoordinates = () => shipRow[shipIndex - i];
    const shipCoordinate = selectShipCoordinates();
    ship5.push(shipCoordinate);
    shipRow.splice((shipIndex - i), 1, null);
  } else {
      const selectShip = () => shipRow[shipIndex + i];
      const ship = selectShip();
      ship5.push(ship);
      shipRow.splice((shipIndex + i), 1, null);
  }
}

//vertical ship
let vertAxisNumber = numberToSelectRow();
let longAxis = numberToSelectShip();

function shipMake(vertAxisNumber, longAxis) {
  for(i = 0; i < 5; i++) {
    if(vertAxisNumber <= 5) {
      const verticalShip = () => grid[vertAxisNumber + i][longAxis];
      const newShip = verticalShip();
      shipFive.push(newShip);
    } else {
      const verticalShip = () => grid[vertAxisNumber - i][longAxis];
      const newShip = verticalShip();
      shipFive.push(newShip);
    }
  }
  return vertAxisNumber;
}


function noOverlap(vertAxisNumber, longAxis) {
  shipMake(vertAxisNumber, longAxis);

  if (!shipFive.includes(null) && shipFive != []) {
    return shipFive;
  } else {
    shipFive.length = 0;
    coords.length = 0;
    let vertAxisNumber = numberToSelectRow();
    coords.push(vertAxisNumber);
    let longAxis = numberToSelectShip();
    coords.push(longAxis);
    noOverlap(vertAxisNumber, longAxis);
  }
}
noOverlap(vertAxisNumber, longAxis);


if (coords.length > 0) {
  [vertAxisNumber, longAxis] = coords;
}


function verticalSplice() {
  if (vertAxisNumber <= 5) {
    for (i = vertAxisNumber; i < vertAxisNumber + 5; i++) {
      grid[(i)].splice(longAxis, 1, null);
    }
  } else if (vertAxisNumber > 5) {
    for (i = vertAxisNumber; i > vertAxisNumber - 5; i--) {
      grid[i].splice(longAxis, 1, null);
    }
  }
}
verticalSplice();

console.table(grid);