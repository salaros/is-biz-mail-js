const isBizMail = require('../dist/index.umd.cjs');
const emailSamples = require('../assets/email-test-samples.json');

describe('isBizMail.isFreeMailAddress', () => {
    it('isBizMail.isFreeMailAddress - is defined', () => {
        expect(('isFreeMailAddress' in isBizMail)).toBe(true);
    });
    
    // Test if .isFreeMailAddress() fails to validate business emails
    emailSamples.business.forEach(function(email) {
        it(email + ' - not free (business)', () => {
            expect(isBizMail.isFreeMailAddress(email)).toBe(false);
        });
    });

    // Test if .isFreeMailAddress() validates free emails
    emailSamples.free.forEach(function(email) {
        it(email + ' - is free', () => {
            expect(isBizMail.isFreeMailAddress(email)).toBe(true);
        });
    });

    // Test if .isFreeMailAddress() validates disposable emails
    emailSamples.disposable.forEach(function(email) {
        it(email + ' - is disposable therefore free', () => {
            expect(isBizMail.isFreeMailAddress(email)).toBe(true);
        });
    });    

    // Test if .isFreeMailAddress() validates emails using patterns
    emailSamples.pattern.forEach(function(email) {
        it(email + ' - is matched', () => {
            expect(isBizMail.isFreeMailAddress(email)).toBe(true);
        });
    });

    // Test .isValid() method's exceptions
    emailSamples.throws.concat(emailSamples.incomplete).forEach(function(email) {
        it(email + ' - throws exception', () => {
            expect((function() {
                isBizMail.isFreeMailAddress(email);
            })).toThrow('Please supply a valid email address');
        });
    });
});

/**
 * Test if .getFreeDomains() returns a non-empty list of domains
 */
describe('isBizMail.getFreeDomains', () => {
    it('isBizMail.getFreeDomains - is defined', () => {
        expect(('getFreeDomains' in isBizMail)).toBe(true);
    });

    var freeDomains = isBizMail.getFreeDomains();
    it(freeDomains.length + ' free mail definitions found', () => {
        expect(freeDomains.length).toBeGreaterThan(0);
    });
});

/**
 * Test if .getFreeDomainPatterns() returns a non-empty list of domain patterns
 */
describe('isBizMail.getFreeDomainPatterns', () => {
    it('isBizMail.getFreeDomainPatterns - is defined', () => {
        expect(('getFreeDomainPatterns' in isBizMail)).toBe(true);
    });

    var freeDomainPatterns = isBizMail.getFreeDomainPatterns();
    it(
        freeDomainPatterns.length + ' free mail pattern definitions found',
        () => {
            expect(freeDomainPatterns.length).toBeGreaterThan(0);
        }
    );
});

/**
 * Test if .isValid() returns a non-empty list of domain patterns
 */
describe('isBizMail.isValid', () => {
    it('isBizMail.isValid - is defined', () => {
        expect(('isValid' in isBizMail)).toBe(true);
    });

    // .isValid() should validate all business emails
    emailSamples.business.forEach(function(email) {
        it(email + ' - is valid and not free (business)', () => {
            expect(isBizMail.isValid(email)).toBe(true);
        });
    });

    // Test if .isValid() fails to validate free emails
    emailSamples.free.forEach(function(email) {
        it(email + ' - is valid and free', () => {
            expect(isBizMail.isValid(email)).toBe(false);
        });
    });
    
    // Test if .isValid() fails to validate incomplete emails
    emailSamples.invalid.concat(emailSamples.incomplete).forEach(function(email) {
        it(email + ' - is invalid', () => {
            expect(isBizMail.isValid(email)).toBe(false);
        });
    });

    // Test .isValid() method's exceptions
    emailSamples.throws.forEach(function(email) {
        it(email + ' - throws exception', () => {
            expect((function() {
                isBizMail.isValid(email);
            })).toThrow('Please supply a valid email address');
        });
    });
});
