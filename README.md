# Sibilisp

Sibilisp is an s-expression language which transpiles to JavaScript that is based
on [Sibilant](https://sibilant.org/). Sibilisp understands itself as a dialect of
Sibilant and is fully capable of creating JavaScript from `.sibilant` files.

Sibilisp extends Sibilant with a set of macros and provides more ES2015+
features like `import` and `export` statements, `Generator`s or `Promise`s.

#### Key features

* More (Common) Lisp oriented than pure Sibilant
* Supports tail recursive programming via `loop` and `recur`
* ES2015+ based module system
* ES2015+ based generator functions and yielding
* Build-in facilities for creating tagged type constructors and sum types
* Results in readable JavaScript
* Tailored towards functional programming

> Sibilisp is in an early stage and without documentation. Your
> best bets are the [Sibilant docs](https://docs.sibilant.org)
> and reading `lang/macros.sibilant`. 

### Install

You can install Sibilisp right from NPM:

```
$ npm i -D sibilisp
```

This will install the Sibilisp transpiler and the CLI.

> It is recommended to *not* install Sibilisp globally,
> but rather on a per project basis.

### CLI Usage

After installation, the Sibilisp CLI can be used with the following command.
The text in [BRACKETS] depends on the file structure of your project:

```
$ node_modules/.bin/sibilisp --src [INPATH/DIR/] --dest [OUTPATH/DIR/]
```

Or shorter:

```
$ node_modules/.bin/sibilisp -s [INPATH/DIR/] -d [OUTPATH/DIR/]
```

The CLI will transpile each `.slisp` and `.sibilant` inside [INPATH/DIR/],
and will create a `.js` file with the same name inside [OUTPATH/DIR/]. You can
then either ship the resulting JavaScript as modules or use a bundler like [Rollup](https://rollupjs.org).