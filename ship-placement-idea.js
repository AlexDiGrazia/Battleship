const grid = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
];

const randomNumber2 = (arr) => Math.floor(Math.random() * arr.length);

const row = grid[randomNumber2(grid)];
const ship = row[randomNumber2(row)];

console.log(row);
console.log(ship);
