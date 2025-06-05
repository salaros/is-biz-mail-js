import IsBizMail from '../dist/isBizMail';
const emailSamples = require('../assets/email-test-samples.json');
const isBizMail = new IsBizMail();

/**
 * Test if .isValidBusiness() returns a non-empty list of domain patterns
 */
describe('isBizMail.isValidBusiness', () => {
    it('isBizMail.isValidBusiness - is defined', () => {
        expect(('isValidBusiness' in isBizMail)).toBe(true);
    });

    // .isValidBusiness() should validate all business emails
    emailSamples.business.forEach(function(email) {
        it(email + ' - is valid and not free (business)', () => {
            expect(isBizMail.isValidBusiness(email)).toBe(true);
        });
    });

    // Test if .isValidBusiness() fails to validate free emails
    emailSamples.free.forEach(function(email) {
        it(email + ' - is valid and free', () => {
            expect(isBizMail.isValidBusiness(email)).toBe(false);
        });
    });
    
    // Test if .isValidBusiness() fails to validate incomplete emails
    emailSamples.invalid.concat(emailSamples.incomplete).forEach(function(email) {
        it(email + ' - is invalid', () => {
            expect(isBizMail.isValidBusiness(email)).toBe(false);
        });
    });

    // Test .isValidBusiness() method's exceptions
    emailSamples.throws.forEach(function(email) {
        it(email + ' - throws exception', () => {
            expect((function() {
                isBizMail.isValidBusiness(email);
            })).toThrow(/Please supply a valid email address/);
        });
    });
});
