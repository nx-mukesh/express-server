//#39515 Equilateral pattern

const equilateral = (row:number):void => {
  for (let i = 1; i <= row; i++) {
    for (let s = row - 1; s >= i; s--) {
      process.stdout.write(" ");
    }
    for (let j = 1; j <= i; j++) {
      process.stdout.write("* ");
    }
    console.log();
  }
};

// equilateral(5)

export default equilateral;
