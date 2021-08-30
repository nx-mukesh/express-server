//#39515 Equilateral pattern
const createDimondShape = (size)=>{
    for(var i=1;i<=size;i++){
       for(var s=size-1;s>=i;s--){
          process.stdout.write(" ");
       }
       for(var j=1;j<=i;j++){
          process.stdout.write("* ")
       }
       console.log();
    }
}

createDimondShape(5)