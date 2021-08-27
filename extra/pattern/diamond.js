// #39515 Diamond pattern

const diamondShape = (row) => {
  for (let i = 1; i <= row; i++) {
    for (let s = row - 1; s >= i; s--) {
      process.stdout.write(" ");
    }
    for (let j = 1; j <= i; j++) {
      process.stdout.write("* ");
    }
    console.log();
  }
  if (i == row + 1) {
    for (let i = 1; i <= row - 1; i++) {
      for (let s = 1; s <= i; s++) {
        process.stdout.write(" ");
      }
      for (j = i; j <= row - 1; j++) {
        process.stdout.write("* ");
      }
      console.log();
    }
  }
};

diamondShape(5);
