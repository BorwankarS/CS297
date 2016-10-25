var seedrandom = require('seedrandom');
var rng = seedrandom(1);
seedrandom(1, {global: true});
var key = [];
var temp;
var j=0;
var flag=false;
var z=0;
while (true){
  temp = String.fromCharCode((Math.random()*(122-97)+97));
  for (var i=0;i<j;i++) {
    if (key[i] === temp) {
      flag= true;
    }
    else {
      flag == false;
    }
  }
  if (flag===false){
    key[j]= temp;
    j++;
    if (j===26){
      break;
    }
  }
}
console.log(key);
