var should = require('chai').should(),
    ibanGenerator = require('../index'),
    generate = ibanGenerator.generate;

describe('#generate', function(){
    it('generate an iban', function() {
        generate('FR', '30004', '00001', '00000000001').success(function (result) {
            result.iban.should.equal('FR7630004000010000000000136');
            result.iban_print.should.equal('FR76 3000 4000 0100 0000 0000 136');
        }).error(function(error){
            error.message.should.
            console.log(error);
        });
    });
});