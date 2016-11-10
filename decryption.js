fs = require('fs');
var input=fs.readFileSync('./finalOutput.js','utf8').replace(/\b(function|return)\b/g,"");
var listOfTokens= input.match(/[a-zA-Z0-9]+/igm);
var key = restoreKey(listOfTokens);
var message = restoreMessage(listOfTokens,key);
writeToFile(message,"DecryptedMessage.js")

function restoreKey(input) {
  var i=0;
  var englishAlphaFreq = ["E","T","A","O","I","N","S","R","H","D","L","U","C",
                          "M","F","Y","W","G","P","B","V","K","X","Q","J","Z"];
  //Restore the key
  var keyGenerator = {};
  var j=0;
  var z=0;
  for (j=0;j< englishAlphaFreq.length;j++) {
    if (j<20) {
      keyGenerator[englishAlphaFreq[j]] = listOfTokens[i];
      z=z+1;
      if (z===2) {
        i++;
        z=0;
      }
    }
    else {
      keyGenerator[englishAlphaFreq[j]] = listOfTokens[i];
      i++;
    }
  }
  return keyGenerator;
}
//Decrypt the message
function restoreMessage(input,key) {
  var i=0;
  var temp=[];
  var a="";
  var output=[];
  var k=0;
  for (i=16;i<input.length;i++){
    temp= input[i].match(/[a-z]/g);
    for (j=0;j<temp.length;j++) {
    a= temp[j];
    a=a.toUpperCase();
    output[k]=key[a];
    k++;
    }
    j=0;
    temp=[];
  }
  for (i=0;i<output.length;i++){
    switch (output[i]) {
      case 'zero':
          output[i]= 0;
        break;
      case 'one':
          output[i]=1;
        break;
      case 'two':
          output[i]= 2;
        break;
      case 'three':
          output[i]=3;
        break;
      case 'four':
          output[i]= 4;
        break;
      case 'five':
          output[i]=5;
        break;
      case 'six':
          output[i]= 6;
        break;
      case 'seven':
          output[i]=7;
        break;
      case 'eight':
          output[i]= 8;
        break;
      case 'nine':
          output[i]=9;
        break;
      default:
        output[i]=output[i];
    }
  }
  var decode=[];
  var k=0;
  for (i = 0; i < output.length; i=i+2) {
    decode[k]=""+output[i]+""+output[i+1];
    k++;
  }
  console.log(decode);
  return output;
}

//write to file
function writeToFile(input,fileName) {
  fs.writeFile(fileName,input,'utf8', function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}
