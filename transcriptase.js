fs = require('fs');
var seedrandom = require('seedrandom');

var rng = seedrandom(1);
seedrandom(1, {global: true});
var expression = /[^\n\s\r]/igm;
var input=fs.readFileSync('./input.js','utf8').match(expression);
output = firstLayerEncryption(input);
outputHex = convertToHex(output)
console.log(outputHex);
console.log(typeof(outputHex));



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
//Homophonic Cipher
function secondLayerEncryption(input) {
  var output = [];
  var i;
  /* Implement Homophonic Cipher


  */
  return output;
}
function thirdLayerEncryption(input) {

}
/*--- Write to File---*/
function writeToFile(input) {
  fs.writeFile("output.js",input,'utf8', function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}
