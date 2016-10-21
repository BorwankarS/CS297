fs = require('fs');
var seedrandom = require('seedrandom');

var rng = seedrandom(1);
seedrandom(1, {global: true});
var expression = /[^\n\s\r]/igm;
var input=fs.readFileSync('./input.js','utf8').match(expression);
output = firstLayerEncryption(input);
outputHex = convertToHex(output)
console.log(outputHex);



//First Layer of Encryption : XOR with the random number
function firstLayerEncryption(input) {
  var output = [];
  var i;
  for ( i in input) {
    output[i] = String.fromCharCode((input[i].charCodeAt(0)) ^ (Math.random()*(255-1)+1));
  }
  return output;
}

//Convert to HEX value
function convertToHex(input) {
  var i;
  var output = [];
  for (i in input) {
    output[i] = (input[i].charCodeAt(0)).toString(16);
  }
  return output;
}
