Iban Generator
=========

A small library providing utility methods to generate IBAN from country code, bank code and account code

## Installation

  npm install iban-constructor --save

## Usage

  var ibanConstructor = require('iban-constructor')
       generateIban = ibanConstructor.generate;

  var generatedIban = generateIban('FR', '30004', 00001', '00000000001')
    .success(function (iban) {
        iban = {
            iban: "FR7630004000010000000000136",
            iban_print: "FR76 3000 4000 0100 0000 0000 136",
            iban_format:
            {
                country: 'France',
                code: 'FR',
                bank: [ [ 0, 'c' ], [ 5, 'n' ], [ 5, 'n' ] ],
                bank_code_format: '0  5n 5n',
                account: [ [ 0, 'c' ], [ 11, 'c' ], [ 2, 'n' ] ],
                account_format: '0  11   2n',
                bankLength: 10,
                accountLength: 13,
                totalLength: 27
            }
        };

        //...
    })
    .error(function (error) {
      // ...
    });

  console.log('iban', generatedIban);

## Tests

  npm test

## Release History

* 1.0.0 Initial release
* 1.0.1 Update doc
* 1.0.2 Update doc
* 1.0.3 Rename

## Todo

  * Handle swift codes and check bank exists