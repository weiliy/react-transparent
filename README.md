# react-transparent

[![Build Status](https://travis-ci.org/weiliy/react-transparent.svg?branch=master)](https://travis-ci.org/weiliy/react-transparent)

[![Maintainability](https://api.codeclimate.com/v1/badges/5978d1648773ce0ffa6c/maintainability)](https://codeclimate.com/github/weiliy/react-transparent/maintainability)

Make a component can be ommitted on demand. For example, omit a tag when didnot have title.

## Getting Started

### Installing

```
npm install --save react-transparent
```

### Usage

Below wrapper the `Link`, omit `Link` when `to` props is undefined.

```
import { Link } from 'react-router-dom';
import transparent from 'react-transparent',

const LinkWrapper = transparent(Link)('to');

const DisplayName = ({ link, children }) => (
  <LinkWrapper to={link}>
    <span className="truncate">{children}</span>
  </LinkWrapper>
);
```

You can also give a function which recive props. Below is equal.

```
const LinkWrapper = transparent(Link)(props => props.to !== undefined);
```

Please find more example in the [test case](test).

## Running the tests

The test case is under `test/index.test.js`. Runing it by:

```
npm run test
```
