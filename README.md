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
    var result = isBizMail.isValid(email);
    console.log([email, result]);   // (2) ["foo@nodejs.onmicrosoft.com", false]
</script>
```

## [CommonJS](http://requirejs.org/docs/commonjs.html) / ES5 / ES6 module, Node.js etc

```js
const isBizMail = require('is-biz-mail');

let result = isBizMail.isFreeMailAddress(email);
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

dotnet (.NET)
[![NuGet](https://img.shields.io/nuget/v/Salaros.Email.IsBizMail.svg?label=NuGet&colorA=404680&colorB=98976B)](https://www.nuget.org/packages/Salaros.Email.IsBizMail)
[![NuGet](https://img.shields.io/nuget/dt/Salaros.Email.IsBizMail.svg)](https://www.nuget.org/packages/Salaros.Email.IsBizMail)
[![.NET Standard](https://img.shields.io/badge/.NET%20Standard-2.0+-784877.svg)](https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support)
================================================================================================

You can install IsBizMail for **.NET Core 2.0+ / Framework 4.6.1+, Mono 5.4+** etc via [NuGet](https://www.nuget.org/packages/Salaros.Email.IsBizMail/).

You could build it from sources via:

```bash
dotnet build
```

IsBizMail in .NET is a static class, so can use it like this:

```cs
using Salaros.Email;

//..
{
    Console.WriteLine(IsBizMail.IsValid("foo@bar.com"));        // true
    Console.WriteLine(IsBizMail.IsValid("hello@gmail.com"));    // false
//..

```

## Testing: xUnit.net

```bash
dotnet test test/dotnet
```