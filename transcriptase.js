fs = require('fs');
var seedrandom = require('seedrandom');
var rng = seedrandom(1);

seedrandom(1, {global: true});
var expression = /[^\n\s\r]/igm;
var input=fs.readFileSync('./input.js','utf8').match(expression);
output = firstLayerEncryption(input);
outputHex = convertToHex(output);
/* tokenized[0] = token stream of input
   tokenized[1] = frequency count of tokens in descending order
*/
var tokenized = countFrequncy(outputHex);
//console.log(tokenized[0]);
var generatedKey = KeyGeneration(tokenized[1]);
//console.log(generatedKey);
var encrpytedString = secondLayerEncryption(tokenized[0],generatedKey);

var randomStringFormation= thirdLayerEncryption(encrpytedString,generatedKey);


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
    if (output[i].length!=2) {
      output[i]="0"+output[i];
    }
  }
  console.log(output);
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
  writeToFile(tokenStream,"output.js");

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
  output[0] = tokenStream;
  output[1] = sortable;
  return output;
}

/* --- Homophonic Cipher --- */
function KeyGeneration(input) {
  var englishAlphaFreq = ["E","T","A","O","I","N","S","R","H","D","L","U","C",
                          "M","F","Y","W","G","P","B","V","K","X","Q","J","Z"];
  var keyGenerator = [];
  var i=0,j=0;
  for (i=0;i<input.length;i++) {
    if (i < 10 ) {
      keyGenerator[input[i][0]] = englishAlphaFreq[j]+englishAlphaFreq[j+1];
      j=j+2;
    }
    else {
      keyGenerator[input[i][0]] = englishAlphaFreq[j];
      j=j+1;
    }
  }
  return keyGenerator;
}


function secondLayerEncryption(input,key) {
  output = [];
  var temp="";
  var randomIndex;
  var i=0,j=0;
  for (i=0; i<input.length;i++) {
    switch (input[i]) {
      case '0':
        if (key['zero'].length ===1) {
          output[j] = key['zero'];
        }
        else {
          temp=key['zero'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['zero'].charAt(1);
          }
          else {
            output[j]=key['zero'].charAt(0);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '1':
        if (key['one'].length ===1) {
          output[j] = key['one'];
        }
        else {
          temp=key['one'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['one'].charAt(0);
          }
          else {
            output[j]=key['one'].charAt(1);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '2':
        if (key['two'].length ===1) {
          output[j] = key['two'];
        }
        else {
          temp=key['two'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['two'].charAt(1);
          }
          else {
            output[j]=key['two'].charAt(0);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '3':
        if (key['three'].length ===1) {
          output[j] = key['three'];
        }
        else {
          temp=key['three'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['three'].charAt(0);
          }
          else {
            output[j]=key['three'].charAt(1);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '4':
          if (key['four'].length ===1) {
            output[j] = key['four'];
          }
          else {
            temp=key['four'];
            randomIndex=(Math.random()*(100-1)+1);
            if (randomIndex  <=50){
              output[j]=key['four'].charAt(1);
            }
            else {
              output[j]=key['four'].charAt(0);
            }
          }
          temp="";
          randomIndex=0;
        break;
      case '5':
        if (key['five'].length ===1) {
          output[j] = key['five'];
        }
        else {
          temp=key['five'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['five'].charAt(0);
          }
          else {
            output[j]=key['five'].charAt(1);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '6':
        if (key['six'].length ===1) {
          output[j] = key['six'];
        }
        else {
          temp=key['six'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['six'].charAt(1);
          }
          else {
            output[j]=key['six'].charAt(0);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '7':
        if (key['seven'].length ===1) {
          output[j] = key['seven'];
        }
        else {
          temp=key['seven'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['seven'].charAt(0);
          }
          else {
            output[j]=key['seven'].charAt(1);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '8':
        if (key['eight'].length ===1) {
          output[j] = key['eight'];
        }
        else {
          temp=key['eight'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['eight'].charAt(1);
          }
          else {
            output[j]=key['eight'].charAt(0);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case '9':
        if (key['nine'].length ===1) {
          output[j] = key['nine'];
        }
        else {
          temp=key['nine'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['nine'].charAt(0);
          }
          else {
            output[j]=key['nine'].charAt(1);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case 'a':
        if (key['a'].length ===1) {
          output[j] = key['a'];
        }
        else {
          temp=key['a'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['a'].charAt(1);
          }
          else {
            output[j]=key['a'].charAt(0);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case 'b':
        if (key['b'].length ===1) {
          output[j] = key['b'];
        }
        else {
          temp=key['b'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['b'].charAt(0);
          }
          else {
            output[j]=key['b'].charAt(1);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case 'c':
        if (key['c'].length ===1) {
          output[j] = key['c'];
        }
        else {
          temp=key['c'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['c'].charAt(1);
          }
          else {
            output[j]=key['c'].charAt(0);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case 'd':
        if (key['d'].length ===1) {
          output[j] = key['d'];
        }
        else {
          temp=key['d'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['d'].charAt(0);
          }
          else {
            output[j]=key['d'].charAt(1);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case 'e':
        if (key['e'].length ===1) {
          output[j] = key['e'];
        }
        else {
          temp=key['e'];
          randomIndex=(Math.random()*(100-1)+1);
          if (randomIndex  <=50){
            output[j]=key['e'].charAt(1);
          }
          else {
            output[j]=key['e'].charAt(0);
          }
        }
        temp="";
        randomIndex=0;
        break;
      case 'f':
      if (key['f'].length ===1) {
        output[j] = key['f'];
      }
      else {
        temp=key['f'];
        randomIndex=(Math.random()*(100-1)+1);
        if (randomIndex  <=50){
          output[j]=key['f'].charAt(0);
        }
        else {
          output[j]=key['f'].charAt(1);
        }
      }
      temp="";
      randomIndex=0;
        break;
      default:
        break;
    }
    j++;
  }
  writeToFile(output,"encrypted.js")
  return output;
}

function thirdLayerEncryption(input,key) {
    console.log("inside thirdLayerEncryption function");
    var i=0;
    var j=0;
    var k=0;
    var temp2="";
    var temp="";
    for (var count in key) {
      temp2=temp2+count+"?";
    }
    temp2=temp2+"\n";
    console.log(temp2);
    i=0;
    var randomString=[];
    var flag=true;
    for (i=0; i<input.length;i++) {
      if(flag===true) {
        temp = temp+ input[i];
        j++;
        if (j===5) {
          flag=false;

          k=k+1;
          temp="";
          j=0;
        }
        randomString[k]=temp;
      }
      else  if (flag === false) {
          temp = temp+input[i];
          j++;
          if (j===7){
            flag= true;
            randomString[k]= temp;
            k++;
            temp="";
            j=0;
          }
        }
      }
    temp="";
    j=0;
    i=0;
    while(i<randomString.length-1){
      temp=temp+"\nfunction " + randomString[i]+" (";
      i++;
      if(i===randomString.length){break;}
      if((randomString.length-i-3>0)) {
        for (j=0;j<2;j++){
          temp=temp+randomString[i]+",";
          i++;
          if(i===randomString.length){break;}
        }
      }
        temp=temp+randomString[i]+") {\n\t";
        i++;
        if(i===randomString.length){break;}
        temp=temp+randomString[i]+"++;\n";
        i++;
        if(i===randomString.length){break;}
        temp=temp+"\treturn "+randomString[i]+"; \n}\n"
    }
    temp=temp2+temp;
    writeToFile(temp.toLowerCase(),"finalOutput.js");
    return randomString;
}

/*--- Write to File---*/
function writeToFile(input,fileName) {
  fs.writeFile(fileName,input,'utf8', function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}
