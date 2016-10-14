Iban Generator
=========

A small library providing utility methods to generate IBAN from country code, bank code and account code

## Installation

  npm install iban-generator --save

## Usage

  var ibanGenerator = require('iban-generator')
      generateIban = ibanGenerator.generate;

  var html = '<h1>Hello World</h1>',
      generatedIban = generateIban('FR', '3000400001', '00000000001');

  console.log('iban', generatedIban);

## Tests

  npm test

## Release History

* 1.0.0 Initial release

## Todo

  * Add more test
  * Clean JS