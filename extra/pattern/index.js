// import
import diamondShape from "./diamond";
import equilateral from "./equilateral";

// calling function
let rowForDiamond = 6;
let rowForEquilateral = 7;

console.log(`Diamond Shape with ${rowForDiamond} row:- `);
diamondShape(rowForDiamond);

console.log();

console.log(`Equilateral shape with ${rowForEquilateral} row :- `);
equilateral(rowForEquilateral);

export {diamondShape, equilateral};