var readlineSync = require("readline-sync");

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const final = [];
const finalVG = [];




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

console.table(grid);

//make virtual grid
function makeVG (number) {
  const gridFunction = (number) => Array.from(Array(number).keys());
  const rowIndices = gridFunction(number);
  for (i = 0; i < number; i++) {
    let emptyArray = () => rowIndices.map((element) => ['  ']);  
    finalVG.push(emptyArray());
  }
  return finalVG;
}
const vg = makeVG(10);



console.table(grid);

console.table(vg);j







for(i = 0; i < 10; i++) {


  const promptAttack = () => readlineSync.question(
    "Enter a location to strike (ie 'A2')  ", {
    limit: ['a1'],
    limitMessage: 'This is not a valid location. Please only enter coordinate on the playing board.'
    }
  );


 

  let attack = promptAttack();

  function row() {
    for (i = 0; i < grid.length; i++) {
      if (grid[i].includes(attack)) {
        return i;
      }
    }
  }
  let rowCoord = row();
  
  const findCoordIndex = () => grid[rowCoord].findIndex((element) => element === attack);
  const coordinateIndex = findCoordIndex();
  vg[rowCoord].splice(coordinateIndex, 1, '🔥');

  let board =   
  `
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

}







