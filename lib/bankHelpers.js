var fs  = require('fs'),
   util = require('./util'),
  parse = require('csv-parse/lib/sync');

/**
 *
 * @type {{
 *      parser: undefined,
 *      foundBanks: Array,
 *      getCodesParser: module.exports.getCodesParser,
 *      bankExists: module.exports.bankExists,
 *      findBicFromBankCode: module.exports.findBicFromBankCode,
 *      findBankCodeFromBic: module.exports.findBankCodeFromBic,
 *      generateBankCode: module.exports.generateBankCode,
 *      generateBankCounter: module.exports.generateBankCounter,
 *      generateAccount: module.exports.generateAccount,
 *      generateIbanForBank: module.exports.generateIbanForBank
 *  }}
 */
module.exports = {
    parser: undefined,
    foundBanks: [],

    getCodesParser: function() {
        if (undefined === this.parser) {
            var records = fs.readFileSync(__dirname + '/bankCodes.csv');
            this.parser = parse(records, {delimiter: ';'});
        }
        return this.parser;
    },

    /**
     * try to find a bank and cache it.
     *
     * @param bicOrCodeBank
     * @returns {boolean}
     */
    bankExists: function(bicOrCodeBank) {
        var records = this.getCodesParser();

        this.foundBanks = [];
        var isBIC = bicOrCodeBank.match(/[a-z]/i);

        for (var i=0; i < records.length; i++) {
            if ((null === isBIC && bicOrCodeBank === records[i][0]) || (null !== isBIC && bicOrCodeBank === records[i][1])) {
                this.foundBanks.push(records[i]);
            }
        }

        return this.foundBanks.length > 0;
    },

    findBicFromBankCode: function(codeBank) {
        if (this.bankExists(codeBank)) {
            if (this.foundBanks.length > 1) {
                console.info('Multiple banks with same bank code "'+codeBank+' "found.');
            }

            return this.foundBanks[0][1];

        } else {
            console.error('Bank not found.');
        }

        return [];
    },

    findBankCodeFromBic: function(bic) {
        if (this.bankExists(bic)) {
            if (this.foundBanks.length > 1) {
                console.info('Multiple banks with same bic code "'+bic+' "found.');
            }

            return this.foundBanks[0][0];

        } else {
            console.error('Bank not found.');
        }

        return [];
    },

    generateBankCode: function () {
        var id = '';
        var possible = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (var i = 0; i < 5; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
    },

    generateBankCounter: function () {
        var id = '';
        var possible = '0123456789';

        for (var i = 0; i < 5; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
    },

    generateAccount: function () {
        var id = '';
        var possible = '0123456789';

        for (var i = 0; i < 11; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
    },

    generateIbanForBank: function (bank, country = 'FR') {
        var ibanConstructor = require('../index'),
            generateIban = ibanConstructor.generate,
            iban;

        generateIban(country, bank, this.generateBankCounter(), this.generateAccount())
            .success(function (result) {
                iban = result.iban;
            }).error(function(e){
                throw e;
            });

        return iban;
    }
};
