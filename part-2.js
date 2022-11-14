const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const final = [];
const ship5 = [];
const shipFive = [];

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

//horizontal ship

const numberToSelectRow = (max = grid.length) => Math.floor(Math.random() * max)
const randomNumber = numberToSelectRow();

const selectShipRow = () => grid[randomNumber]; 
let shipRow = selectShipRow();

const numberToSelectShip = (max = shipRow.length) => Math.floor(Math.random() * max);
const shipIndex = numberToSelectShip();

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
let shipLongAxis = numberToSelectShip();
let vertAxisNumber = numberToSelectRow();
console.log('Vertical Axis Number is ' + vertAxisNumber);
console.log('Ship Long Axis Number is ' + shipLongAxis);

function shipCreator() {
  function shipMake() {
    for(i = 0; i < 5; i++) {
      if (vertAxisNumber <= 5) {
        const verticalShip = () => grid[vertAxisNumber + i][shipLongAxis];
        const newShip = verticalShip();
        shipFive.push(newShip);
      } else {
        const verticalShip = () => grid[vertAxisNumber - i][shipLongAxis];
        const newShip = verticalShip();
        shipFive.push(newShip);
      }
    }
  }
  shipMake();

  if (shipFive.includes(null)) {
    shipFive.length = 0;
    numberToSelectShip();
    numberToSelectRow();
    shipCreator();
  } else {
    return shipFive;
  }
}
shipCreator();

/* function noShipOverlap() {
  while (shipFive.includes(null)) {
    shipFive.length = 0;
    let shipLongAxis = numberToSelectShip();
    let vertAxisNumber = numberToSelectRow();
    shipCreator();
  }  
  return [shipLongAxis, vertAxisNumber];
}
noShipOverlap(); */


console.table(ship5);
console.table(shipFive);

function verticalSplice() {
  if (vertAxisNumber <= 5) {
    for (i = vertAxisNumber; i < vertAxisNumber + 5; i++) {
      console.log(i);
      grid[(i)].splice(shipLongAxis, 1, null);
    }
  } else if (vertAxisNumber > 5) {
    for (i = vertAxisNumber; i > vertAxisNumber - 5; i--) {
      console.log(i);
      grid[i].splice(shipLongAxis, 1, null);
    }
  }
}
verticalSplice();

console.table(grid);
