const isBizMail = require('../dist/index.umd.cjs');
const emailSamples = require('../assets/email-test-samples.json');

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
