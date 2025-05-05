const isBizMail = require('../dist/index.umd.cjs');

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
