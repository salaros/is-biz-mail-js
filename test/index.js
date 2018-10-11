let should = require('should'),
    assert = require('assert'),
    isBizMail = require('../src/commonjs/'),
    emailSamples = require('../assets/email-test-samples.json');

describe('isBizMail.isFreeMailAddress', function () {
    it('isBizMail.isFreeMailAddress - is defined', function () {
        ('isFreeMailAddress' in isBizMail).should.equal(true);
    });
    
    // Test if .isFreeMailAddress() fails to validate business emails
    emailSamples.business.forEach(function(email) {
        it(email + ' - not free (business)', function () {
            isBizMail.isFreeMailAddress(email).should.equal(false);
        });
    });

    // Test if .isFreeMailAddress() validates free emails
    emailSamples.free.forEach(function(email) {
        it(email + ' - is free', function () {
            isBizMail.isFreeMailAddress(email).should.equal(true);
        });
    });

    // Test if .isFreeMailAddress() validates emails using patterns
    emailSamples.pattern.forEach(function(email) {
        it(email + ' - is matched', function () {
            isBizMail.isFreeMailAddress(email).should.equal(true);
        });
    });

    // Test .isValid() method's exceptions
    emailSamples.throws.concat(emailSamples.incomplete).forEach(function(email) {
        it(email + ' - throws exception', function () {
            (function(){
                isBizMail.isFreeMailAddress(email);
            }).should.throw('Please supply a valid email address');
        });
    });
});

/**
 * Test if .getFreeDomains() returns a non-empty list of domains
 */
describe('isBizMail.getFreeDomains', function () {
    it('isBizMail.getFreeDomains - is defined', function () {
        ('getFreeDomains' in isBizMail).should.equal(true);
    });

    var freeDomains = isBizMail.getFreeDomains();
    it(freeDomains.length + ' free mail definitions found', function () {
        freeDomains.length.should.be.above(0);
    });
});

/**
 * Test if .getFreeDomainPatterns() returns a non-empty list of domain patterns
 */
describe('isBizMail.getFreeDomainPatterns', function () {
    it('isBizMail.getFreeDomainPatterns - is defined', function () {
        ('getFreeDomainPatterns' in isBizMail).should.equal(true);
    });

    var freeDomainPatterns = isBizMail.getFreeDomainPatterns();
    it(freeDomainPatterns.length + ' free mail pattern definitions found', function () {
        freeDomainPatterns.length.should.be.above(0);
    });
});

/**
 * Test if .isValid() returns a non-empty list of domain patterns
 */
describe('isBizMail.isValid', function () {
    it('isBizMail.isValid - is defined', function () {
        ('isValid' in isBizMail).should.equal(true);
    });

    // .isValid() should validate all business emails
    emailSamples.business.forEach(function(email) {
        it(email + ' - is valid and not free (business)', function () {
            isBizMail.isValid(email).should.equal(true);
        });
    });

    // Test if .isValid() fails to validate free emails
    emailSamples.free.forEach(function(email) {
        it(email + ' - is valid and free', function () {
            isBizMail.isValid(email).should.equal(false);
        });
    });
    
    // Test if .isValid() fails to validate incomplete emails
    emailSamples.invalid.concat(emailSamples.incomplete).forEach(function(email) {
        it(email + ' - is invalid', function () {
            isBizMail.isValid(email).should.equal(false);
        });
    });

    // Test .isValid() method's exceptions
    emailSamples.throws.forEach(function(email) {
        it(email + ' - throws exception', function () {
            (function(){
                isBizMail.isValid(email);
            }).should.throw('Please supply a valid email address');
        });
    });
});
