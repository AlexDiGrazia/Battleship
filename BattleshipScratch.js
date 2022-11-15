console.clear();

//global variables

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const final = [];
const ship5 = [];
const shipFive = [];
// const coords = [];


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


// Ship class and prototype functions

class Ship {
  constructor (name, length, array, direction) {
    this.name = name;
    this.length = length;
    this.array = array;
    this.direction = direction;
  }


  randomNumber(max = grid.length) {
   return Math.floor(Math.random() * max)
  };

  direction() {
    const selectDirection = (max = 2) => Math.floor(Math.random() * max);
    const direction = selectDirection();
    
    if (direction === 0) {
      console.log('horizontal');
    } else if (direction === 1) {
      console.log('vertical');
    }
  }















  horizontalShip(length) {

    const randomNumberGenerator = (max = grid.length) => Math.floor(Math.random() * max);
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













  verticalShip(vertAxisNumber, longAxis) {
    for(i = 0; i < 5; i++) {
      if(vertAxisNumber <= 5) {
        const makeShip = () => grid[vertAxisNumber + i][longAxis];
        const newShip = makeShip();
        this.array.push(newShip);
      } else {
        const makeShip = () => grid[vertAxisNumber - i][longAxis];
        const newShip = makeShip();
        this.array.push(newShip);
      }
    }
    return vertAxisNumber;
  }










  noOverlap(vertAxisNumber, longAxis) {
    verticalShip(vertAxisNumber, longAxis);
  
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








  

  verticalSplice() {
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

  
  allTogether (ship) {
    ship.verticalShip(vertAxisNumber, longAxis);
    ship.verticalSplice();
  }
}

const carrierShip = new Ship('Carrier', 5, [], 0);
const cruiser = new Ship('Cruiser', 4, [], 0);
const battleShip = new Ship('Battle Ship', 3, [], 0);
const destroyer = new Ship('Destroyer', 3, [], 0);
const tacticalShip = new Ship('Tactical Ship', 2, [], 0);
//make grid

const shipsArray = [carrierShip, cruiser, battleShip, destroyer, tacticalShip];


// console.log(randomize());
// console.log(randomize());
// console.log(randomize());
// console.log(randomize());


// shipsArray.forEach((element) => element.allTogether(element));
// shipsArray.forEach((element) => console.log(vertAxisNumber));





console.log (carrierShip);
console.log (cruiser);
console.log (battleShip);
console.log (destroyer);
console.log (tacticalShip);
console.table(grid);














//vertical ship




// noOverlap(vertAxisNumber, longAxis);


// if (coords.length > 0) {
//   [vertAxisNumber, longAxis] = coords;
// }





// console.table(grid);