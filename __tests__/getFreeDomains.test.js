import IsBizMail from '../dist/isBizMail';
const isBizMail = new IsBizMail();

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
