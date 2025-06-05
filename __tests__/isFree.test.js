import IsBizMail from '../dist/isBizMail';
const isBizMail = new IsBizMail();
import { business, free, disposable, pattern, throws, incomplete, invalid } from '../assets/email-test-samples.json';

describe('isBizMail.isFree', () => {
    it('isBizMail.isFree - is defined', () => {
        expect(('isFree' in isBizMail)).toBe(true);
    });
    
    // Test if .isFree() fails to validate business emails
    business.forEach(function(email) {
        it(email + ' - not free (business)', () => {
            expect(isBizMail.isBusiness(email)).toBe(true);
        });
    });

    // Test if .isFree() validates free emails
    free.forEach(function(email) {
        it(email + ' - is free', () => {
            expect(isBizMail.isValidFree(email)).toBe(true);
        });
    });

    // Test if .isFree() validates disposable emails
    disposable.forEach(function(email) {
        it(email + ' - is disposable therefore free', () => {
            expect(isBizMail.isFree(email)).toBe(true);
        });
    });    

    // Test if .isFree() validates emails using patterns
    pattern.forEach(function(email) {
        it(email + ' - is matched', () => {
            expect(isBizMail.isFree(email)).toBe(true);
        });
    });

    // Test .isValidBusiness() method's exceptions
    throws.forEach(function(email) {
        it(email + ' - throws exception', () => {
            expect((function() {
                isBizMail.isFree(email);
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
 * Test if .isValidBusiness() returns a non-empty list of domain patterns
 */
describe('isBizMail.isValid', () => {
    it('isBizMail.isValid - is defined', () => {
        expect(('isValid' in isBizMail)).toBe(true);
    });

    // .isValidBusiness() should validate all business emails
    business.forEach(function(email) {
        it(email + ' - is valid and not free (business)', () => {
            expect(isBizMail.isValidBusiness(email)).toBe(true);
        });
    });

    // Test if .isValidBusiness() fails to validate free emails
    free.forEach(function(email) {
        it(email + ' - is valid and free', () => {
            expect(isBizMail.isValidBusiness(email)).toBe(false);
        });
    });
    
    // Test if .isValidBusiness() fails to validate incomplete emails
    invalid.concat(incomplete).forEach(function(email) {
        it(email + ' - is invalid', () => {
            expect(isBizMail.isValidBusiness(email)).toBe(false);
        });
    });

    // Test .isValidBusiness() method's exceptions
    throws.forEach(function(email) {
        it(email + ' - throws exception', () => {
            expect((function() {
                isBizMail.isValidFree(email);
            })).toThrow('Please supply a valid email address');
        });
    });
});
