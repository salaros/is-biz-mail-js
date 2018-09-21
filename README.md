Business Email Checker
[![Build Status](https://travis-ci.org/salaros/is-biz-mail-js.svg?branch=master)](https://travis-ci.org/salaros/is-biz-mail-js)
[![Coverage Status](https://coveralls.io/repos/github/salaros/is-biz-mail-js/badge.svg?branch=master)](https://coveralls.io/github/salaros/is-biz-mail-js?branch=master)
======================
[![License](https://img.shields.io/github/license/salaros/is-biz-mail-js.svg)](https://github.com/salaros/is-biz-mail-js/blob/master/LICENSE)
![js type](https://img.shields.io/badge/type-Vanilla%20|%20CommonJS-589594.svg)
[![npm](https://img.shields.io/npm/v/is-biz-mail.svg)](https://www.npmjs.com/package/is-biz-mail)
![npm](https://img.shields.io/npm/dt/is-biz-mail.svg)
![npm](https://img.shields.io/npm/dw/is-biz-mail.svg)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/is-biz-mail.svg)

[![Donate Patreon](https://img.shields.io/badge/donate-Patreon-f96854.svg)](https://www.patreon.com/salaros/)
[![Donate Paypal](https://img.shields.io/badge/donate-PayPal-009cde.svg)](https://paypal.me/salarosIT)
[![Donate Liberapay](https://img.shields.io/badge/donate-Liberapay-ffc600.svg)](https://liberapay.com/salaros/)

**isBizMail** tells you whether a given email address is free (gmail.com, yahoo.es, yandex.ru etc) or not.
The list of emails used by **isBizMail** is taken from [here](http://svn.apache.org/repos/asf/spamassassin/trunk/rules/20_freemail_domains.cf)¹.
Detects around 2500 domains and subdomains.

1) *All credits for the list itself go to [SpamAssasin](https://spamassassin.apache.org/) authors and contributors*

## Installation

You can install **isBizMail** for JavaScript via your prefered dependency manager, e.g. Yarn

```bash
yarn add is-biz-mail
```

or via NPM

```bash
npm i is-biz-mail
```

## Vanilla

One of examples of vanilla JavaScript usage might be a simple HTML page:

```html
<script src="path/to/src/javascript/is-biz-mail.js"></script>
<script>
    var email = 'foo@nodejs.onmicrosoft.com"',
        result = isBizMail.isValid(email);
    console.log([email, result]);   // (2) ["foo@nodejs.onmicrosoft.com", false]
</script>
```

## [CommonJS](http://requirejs.org/docs/commonjs.html) / ES5 / ES6 module, Node.js etc

```js
const isBizMail = require('is-biz-mail');

let email = 'es6@live.com',
    result = isBizMail.isFreeMailAddress(email);
console.log([email, result]);   // (2) ["es6@live.com", true]
// ...
```

## Testing: [Mocha](https://mochajs.org/) + [Should.js](https://shouldjs.github.io/)

```bash
yarn
yarn test
```

or via NPM

```bash
npm install
npm test    # or ./node_modules/.bin/mocha
```
