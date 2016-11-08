Iban Constructor
=========


Generates an IBAN from the country code, bank code and account code. It returns an object with two callback functions, success and error. The success callback is called if the iban-object was successfully created and has three attributes:

iban : The IBAN printed as an electronic text with no space
iban_print : The IBAN printed with space on evry 4th character
iban_format : The IBAN format based on formats-variable at top of iban.js

If the iban resulted in an error the error callback will be called with an object containing two attributes:
type : Type of the error
message : The message containing details of what failed

NB! If the bank code is null, the account number is the basis for collecting bank code

## Installation

  npm install iban-constructor --save

## Usage

```javascript
  var ibanConstructor = require('iban-constructor')
          bankHelpers = require('iban-constructor/lib/bankHelpers')
         generateIban = ibanConstructor.generate;

  var generatedIban = generateIban('FR', '30004', '00001', '00000000001')
    .success(function (iban) {

      console.log(iban);
      /*
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
      };*/

        //...
    })
    .error(function (error) {
      // ...
    });

    // to see all availables banks see `iban-constructor/lib/bankCodes.csv`
    var BankExists = bankHelpers.bankExists('30004');
    var Bic = bankHelpers.findBicFromBankCode('30004');
    var Bank = bankHelpers.findBankCodeFromBic('BLICMCMCXXX');
    var BankCode = bankHelpers.generateBankCode();
    var BankCounter = bankHelpers.generateBankCounter();
    var Account = bankHelpers.generateAccount();

    try {
        var ValidIban = bankHelpers.generateIbanForBank('17515');
    } catch (e) {
        // error...
    }

    console.log('BankExists shoud be true', BankExists);
    console.log('Bic shoud be BNPAFRPPXXX', Bic);
    console.log('Bank shoud be 13488', Bank);
    console.log('BankCode shoud be a string', BankCode);
    console.log('BankCounter shoud be number', BankCounter);
    console.log('Account shoud be number', Account);
    console.log('CodeBank shoud be valid iban', ValidIban);
```

If you need to validate your iban you can use the [iban npm module](https://www.npmjs.com/package/iban)

```javascript
var IBAN = require('iban');
IBAN.isValid('hello world'); // false
IBAN.isValid(ValidIban); // true
```

## Tests

  npm test

## Release History

* 1.2.0 Add country definition for helpers
* 1.1.2 Add iban npm module reference in README and few cleaning
* 1.1.1 Fix checksum forced with a length of 2
* 1.1.0 Add BankHelpers
* 1.0.4 Update Readme
* 1.0.3 Rename
* 1.0.2 Update doc
* 1.0.1 Update doc
* 1.0.0 Initial release

# Todo

* More tests