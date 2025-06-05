/**
 * isBizMail tells you whether a given email address
 * is free e.g. gmail.com, yahoo.es, yandex.ru etc or not.
 * The list of emails used by isBizMail is taken from here:
 * http://svn.apache.org/repos/asf/spamassassin/trunk/rules/20_freemail_domains.cf
 * All credits for the list itself go to SpamAssasin authors and contributors
 */
export default class IsBizMail {
    private _domainRegex;
    private _emailSimpleRegex;
    private _emailStrictRegex;
    private _freeDomains;
    private _freeDomainPatterns;
    constructor();
    /**
     * Validates a given email address and checks if it's not an actual non-free, business address (e.g. @wikimedia.org)
     * @param {*} email Email address
     */
    isBusiness(email: string): boolean;
    /**
     * Checks if a given email address is free, non-business email address (e.g. Gmail, Yahoo etc)
     *
     * @param {*} email Email address
     */
    isFree(email: string): boolean;
    /**
     * DEPRECATED: Validates a given email address and checks if it's not an actual non-free, business address
     * @param {*} email Email address to validate
     */
    isValidBusiness(email: string): boolean;
    /**
     * DEPRECATED: Validates a given email address and checks if a given email address is free, non-business email address (e.g. Gmail, Yahoo etc)
     * @param {*} email Email address to validate
     */
    isValidFree(email: string): boolean;
    /**
     * Validates a given email address first and then checks if it's not an actual non-free, business address
     * @deprecated This method is there for backwards compatibility, use 'isValidBusinessAddress'
     * @param {*} email Email address to validate
     */
    isValid(email: string): boolean;
    /**
     * Checks if a given email address is free, non-business email address (e.g. Gmail, Yahoo etc)
     * @deprecated This method is there for backwards compatibility, use 'isFreeAddress'
     * @param {*} email Email address
     */
    isFreeMailAddress(email: string): boolean;
    /**
     * Converts a given wildcard to a regular expression
     *
     * @param {*} s Wildcard to convert regular expression
     */
    private static wildcardToRegExp;
    /**
     * Escapes a given regular expression
     *
     * @param {*} s Regular expression to escape
     */
    private static regExpEscape;
    getFreeDomains(): string[];
    getFreeDomainPatterns(): string[];
}
