import { diamondShape, equilateral } from "./pattern";
import hasPermission from "./utils/permission";

// calling function
let rowForDiamond = 6;
let rowForEquilateral = 7;

console.log(`Diamond Shape with ${rowForDiamond} row:- `);
diamondShape(rowForDiamond);

console.log();

console.log(`Equilateral shape with ${rowForEquilateral} row :- `);
equilateral(rowForEquilateral);

// permission Driver code -
console.log()
console.log("Permission function calling")
console.log(hasPermission("getUsers", "head-trainer", "read")); 
console.log(hasPermission("getUsers", "trainer", "read"));
console.log(hasPermission("getUsers", "trainee", "write"));
console.log(hasPermission("getUsers", "trainee", "read"));
console.log(hasPermission("getUsers", "trainee", "delete"));
