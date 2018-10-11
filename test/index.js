let should = require('should'),
    assert = require('assert'),
    isBizMail = require('../src/commonjs/'),
    emailSamples = require('../assets/emailSamples.json');

describe('isBizMail.isFreeMailAddress', function () {
    it('isBizMail.isFreeMailAddress - is defined', function () {
        ('isFreeMailAddress' in isBizMail).should.equal(true);
    });

    emailSamples.business.forEach(function(email) {
        it(email + ' - not free (business)', function () {
            isBizMail.isFreeMailAddress(email).should.equal(false);
        });
    });

    emailSamples.free.forEach(function(email) {
        it(email + ' - is free', function () {
            isBizMail.isFreeMailAddress(email).should.equal(true);
        });
    });

    emailSamples.pattern.forEach(function(email) {
        it(email + ' - is matched', function () {
            isBizMail.isFreeMailAddress(email).should.equal(true);
        });
    });

    emailSamples.invalid.concat(emailSamples.incomplete).forEach(function(email) {
        it(email + ' - is invalid', function () {
            isBizMail.isValid(email).should.equal(false);
        });
    });

    emailSamples.throws.concat(emailSamples.incomplete).forEach(function(email) {
        it(email + ' - throws exception', function () {
            (function(){
                isBizMail.isFreeMailAddress(email);
            }).should.throw('Please supply a valid email address');
        });
    });

    emailSamples.throws.forEach(function(email) {
        it(email + ' - throws exception', function () {
            (function(){
                isBizMail.isValid(email);
            }).should.throw('Please supply a valid email address');
        });
    });
});

describe('isBizMail.getFreeDomains', function () {
    it('isBizMail.getFreeDomains - is defined', function () {
        ('getFreeDomains' in isBizMail).should.equal(true);
    });

    var freeDomains = isBizMail.getFreeDomains();
    it(freeDomains.length + ' free mail definitions found', function () {
        freeDomains.length.should.be.above(0);
    });
});

describe('isBizMail.getFreeDomainPatterns', function () {
    it('isBizMail.getFreeDomainPatterns - is defined', function () {
        ('getFreeDomainPatterns' in isBizMail).should.equal(true);
    });

    var freeDomainPatterns = isBizMail.getFreeDomainPatterns();
    it(freeDomainPatterns.length + ' free mail pattern definitions found', function () {
        freeDomainPatterns.length.should.be.above(0);
    });
});

describe('isBizMail.isValid', function () {
    it('isBizMail.isValid - is defined', function () {
        ('isValid' in isBizMail).should.equal(true);
    });

    emailSamples.business.forEach(function(email) {
        it(email + ' - is valid and not free (business)', function () {
            isBizMail.isValid(email).should.equal(true);
        });
    });

    emailSamples.free.forEach(function(email) {
        it(email + ' - is valid and free', function () {
            isBizMail.isValid(email).should.equal(false);
        });
    });
});
