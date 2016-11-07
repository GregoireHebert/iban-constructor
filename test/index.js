var should = require('should/as-function'),
    bankHelpers = require('../lib/bankHelpers'),
    ibanConstructor = require('../index'),
    generate = ibanConstructor.generate;

describe('#generate', function(){
    it('generate an iban', function() {
        generate('FR', '30004', '00001', '00000000001').success(function (result) {
            should(result.iban).be.equal('FR7630004000010000000000136');
            should(result.iban_print).be.equal('FR76 3000 4000 0100 0000 0000 136');
        });

    });

    it('generate also an iban', function() {
        generate('FR', 'C000U', '00001', '00000000001').success(function (result) {
            should(result.iban).be.equal('FR7630004000010000000000136');
            should(result.iban_print).be.equal('FR76 3000 4000 0100 0000 0000 136');
        });
    });

    it('calculate a checksum and return a string of length 2', function() {
        var checksum = ibanConstructor.calculateRIBChecksum('17515', '79897', '23429678218');
        should(checksum).have.length(2);
    })
});

describe('#helpers', function() {
    it('finds a bank', function() {
        bankCodeExists = bankHelpers.bankExists('30004');
        bankBICExists = bankHelpers.bankExists('BNPAFRPPXXX');

        should(bankCodeExists).be.exactly(true);
        should(bankHelpers.foundBanks).have.length(1);
        should(bankBICExists).be.exactly(true);
        should(bankHelpers.foundBanks).have.length(1);
    });

    it('finds nothing', function() {
        bankCodeExists = bankHelpers.bankExists('30005');
        bankBICExists = bankHelpers.bankExists('BNPAFRPPZXX');

        should(bankCodeExists).be.exactly(false);
        should(bankHelpers.foundBanks).have.length(0);
        should(bankBICExists).be.exactly(false);
        should(bankHelpers.foundBanks).have.length(0);
    });

    it('generate a bank code', function() {
        bankCode = bankHelpers.generateBankCode();
        should(bankCode).have.length(5);
    });

    it('generate a bank counter', function() {
        bankCounter = bankHelpers.generateBankCounter();
        should(bankCounter).have.length(5).and.be.a.Number();
    });

    it('generate an account', function() {
        account = bankHelpers.generateAccount();
        should(account).have.length(11).and.be.a.Number();
    });

    it('generate a random iban', function(){
        iban = bankHelpers.generateIbanForBank('17515');
        should(iban).have.length(27);
    });
});