var should = require('chai').should(),
    ibanConstructor = require('../index'),
    generate = ibanConstructor.generate;

describe('#generate', function(){
    it('generate an iban', function() {
        generate('FR', '30004', '00001', '00000000001').success(function (result) {
            result.iban.should.equal('FR7630004000010000000000136');
            result.iban_print.should.equal('FR76 3000 4000 0100 0000 0000 136');
        });

    });

    it('generate also an iban', function() {
        generate('FR', 'C000U', '00001', '00000000001').success(function (result) {
            result.iban.should.equal('FR7630004000010000000000136');
            result.iban_print.should.equal('FR76 3000 4000 0100 0000 0000 136');
        });
    });
});
