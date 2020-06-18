# Sibilisp

Sibilisp is an s-expression language which transpiles to JavaScript that is based
on [Sibilant](https://sibilant.org/). It extends Sibilant with a whole new
set of macros and provides more ES2015+ features like `import` and `export`
statements or `Promise`.

### Install
```
$ npm i -D sibilisp
```

### Usage
```
$ node_modules/.bin/sibilisp src path/to/source/dir dest path/to/output/dir
```