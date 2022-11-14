console.clear();

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const final = [];
const ship5 = [];
const shipFive = [];
const coords = [];


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



function horizontalShip(length) {

  const randomNumberGenerator = (max = grid.length) => Math.floor(Math.random() * max)
  let rowNumber = randomNumberGenerator();

  const selectShipRow = () => grid[rowNumber]; 
  let shipRow = selectShipRow();

  const numberToSelectShip = (max = shipRow.length) => Math.floor(Math.random() * max);
  let shipIndex = numberToSelectShip();

  for(i = 0; i < length; i++) {
    if (shipIndex > length) {
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
}
horizontalShip(5);


console.table(grid);


