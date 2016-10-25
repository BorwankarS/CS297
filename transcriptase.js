fs = require('fs');
var seedrandom = require('seedrandom');
var rng = seedrandom(1);

seedrandom(1, {global: true});
var expression = /[^\n\s\r]/igm;
var input=fs.readFileSync('./input.js','utf8').match(expression);
output = firstLayerEncryption(input);
outputHex = convertToHex(output)

var tokenized = countFrequncy(outputHex);
console.log(tokenized);

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
  countFrequncy(output);
  return output;
}

function countFrequncy(input) {
  var output = [];
  var i,j;
  var incomingToken;
  var tokenRegEx = /[a-z0-9]/igm;
  var tokens = [];
  var k=0;
  var tokenStream = [];
  var countOfOccur = { zero : 0,
    one : 0,
    two : 0,
    three : 0,
    four : 0,
    five : 0,
    six : 0,
    seven : 0,
    eight : 0,
    nine : 0,
    a : 0,
    b : 0,
    c : 0,
    d : 0,
    e : 0,
    f : 0 };
  for (i in input) {
    incomingToken = input[i].toString();
    tokens[i] = incomingToken.match(tokenRegEx);
  }
  for (i in tokens) {
    for (j in tokens[i]) {
      tokenStream[k] = tokens[i][j];
      k++;
    }
  }
  i=0;
  j=0;
  for (i in tokenStream) {
    switch (tokenStream[i]) {
      case '0':
        countOfOccur.zero++;
        break;
      case '1':
        countOfOccur.one++;
        break;
      case '2':
        countOfOccur.two++;
        break;
      case '3':
        countOfOccur.three++;
        break;
      case '4':
        countOfOccur.four++;
        break;
      case '5':
        countOfOccur.five++;
        break;
      case '6':
        countOfOccur.six++;
        break;
      case '7':
        countOfOccur.seven++;
        break;
      case '8':
        countOfOccur.eight++;
        break;
      case '9':
        countOfOccur.nine++;
        break;
      case 'a':
        countOfOccur.a++;
        break;
      case 'b':
        countOfOccur.b++;
        break;
      case 'c':
        countOfOccur.c++;
        break;
      case 'd':
        countOfOccur.d++;
        break;
      case 'e':
        countOfOccur.e++;
        break;
      case 'f':
        countOfOccur.f++;
        break;
    }
  }

  var sortable = [];
  for (var count in countOfOccur)
      sortable.push([count, countOfOccur[count]])
      sortable.sort(
            function(a, b) {
                return b[1] - a[1]
              })
    //console.log(sortable);
  return tokenStream;
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
