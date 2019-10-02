main(); //call main function

function main(){
 var mm = 25, //intializing variables
    aa = 11,
    cc = 17,
    zz = 3;

    z = zz;

    //run 29 times
    for (var i = 1; i < 30; i++){
        z = rand(mm,aa,cc,z); //generate random number using mm, aa, cc, zz
        document.write(z + "<br\>"); //write output to html index file
  }
};

function rand(m,a,c,z) {
  z = (a * z + c) % m; //random number generated is the remainder of (a * z + c) divided by m
  return z;
};