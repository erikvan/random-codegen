#!/usr/bin/env Node --harmony 
var program = require('commander');
var _ = require('lodash');
var fs = require('fs');
var chalk = require('chalk');

var valid = false;

program
.arguments('<file>')
.option('-c, --count <count>', 'The amount of codes to create')
.option('-p, --prefix <prefix>', 'The prefix for codes')
.option('-l, --codelength <codelength>', 'The length of each code')
.option('-m, --mask <mask>', 'The types of letters to include')
.option('-e, --exclusions <exclusions>', 'Specific types of letters to exclude')
.action(function(file) {
  var codes = [];
  generateCodes(program.count, program.prefix, program.codelength, program.mask, program.exclusions, file);
})
.parse(process.argv);

if(!valid){
  console.log(chalk.bold.red("A file location and an amount of codes to be generated must be specified"));
}

//Generate all the codes
function generateCodes(amount, prefix, codeLength, mask, exclusions, file){
  valid = true;

  if(!amount){
    valid = false;
    return;
  }

  var codes = [];

  //Default options
  prefix = prefix ?  prefix : '';
  codeLength = codeLength ? codeLength : 6;
  mask = mask ?  mask : 'Aa#!';
  exclusions = exclusions ? exclusions : '';

  //Create a distinct array of codes
  for(var i=0; i<amount; i++){
    var code = prefix.toUpperCase() + randomString(codeLength, mask, exclusions)
    codes.push(code);
  }

  //Keep it unique
  var uniqueCodes = _.uniq(codes);
  saveCodes(file, uniqueCodes)
}

//Getting a random string
function randomString(length, chars, exclusions) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '123456789';
    if (chars.indexOf('!') > -1) mask += '!@#$%^&*()_+';

    //Exclude the letters from the final mask
    for(var i=0; i<exclusions.length; i++){
      mask = mask.replace(exclusions[i], '');
    }

    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

//Saving array of codes to a csv
function saveCodes(file, codeArray){
  var output = "";
  for(var i=0; i<codeArray.length; i++){
    output+=codeArray[i] + "\n";
  }

  //Write to csv at path
  fs.writeFile(file, output, function(err){
    if(err){
      console.log(err);
    }

    console.log(chalk.bold.blue('Codes generated: ')+chalk.bold.green(codeArray.length));
    console.log(chalk.bold.blue('At location: ')+chalk.bold.green(file));
  });
}
