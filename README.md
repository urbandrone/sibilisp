<center><img src="media/logo/sibilisp-logo-colored.svg" alt="logo" width="280px"><br><br></center>


![GitHub license](https://img.shields.io/npm/l/sibilisp?color=527A8F) ![NPM version](https://img.shields.io/npm/v/sibilisp?color=4f6376) ![Github stars](https://img.shields.io/github/stars/urbandrone/sibilisp?color=393545) ![NPM downloads](https://img.shields.io/npm/dm/sibilisp?color=335A70)

Sibilisp is an s-expression language which transpiles to JavaScript and that is based on [Sibilant](https://sibilant.org/). Sibilisp understands itself as a dialect of Sibilant and is fully capable of creating JavaScript from `.sibilant` files.

Sibilisp extends Sibilant with a set of macros and provides more ES2015+ features like `import` and `export` statements, `Generator`s or `Promise`s.

#### Key features
* Supports tail recursive programming via `loop` and `recur`
* ES2015+ based module system
* ES2015+ based generator functions and yielding
* Build-in facilities for creating tagged type constructors and sum types
* Results in readable JavaScript
* Tailored towards functional programming
* Leaves built-in types completely untouched

#### Main differences to Sibilant
* More (Common) Lisp oriented than pure Sibilant. This is mostly resembled in the names of Sibilisp's macros.
* Ships with it's own utility toolbelt called the `prelude`. This is a collection of functions and data structures inspired by following the [Fantasy-Land](https://github.com/fantasyland/fantasy-land) specification.
* Sibilisp replaces some of Sibilant's macros for various reasons, but in general to either make the resulting code _run faster_ or be _applicable to a wider range of data structures_.

#### Documentation

Sibilisp's main language layer is mostly stable and  unlikely to change. There is a short documentation inside the [Wiki](https://github.com/urbandrone/sibilisp/wiki).

If you like, you can study [Sibilisp's macros file](https://github.com/urbandrone/sibilisp/blob/master/lang/macros.sibilant).

Also, the [Sibilant docs](https://docs.sibilant.org) can be consulted.

### Install

You can install Sibilisp right from NPM:

```
$ npm i -D sibilisp
```

This will install the Sibilisp language layer, the Sibilant transpiler and the CLI.

> It is recommended to *not* install Sibilisp globally, but rather on a per project basis.

### CLI Usage

After installation, the Sibilisp CLI can be used with the following command.
The text in [BRACKETS] depends on the file structure of your project:

```
$ sibilisp --src [INPATH/DIR/] --dest [OUTPATH/DIR/]
```

Or shorter:

```
$ sibilisp -s [INPATH/DIR/] -d [OUTPATH/DIR/]
```

The CLI will transpile each `.slisp` and `.sibilant` file inside [INPATH/DIR/],
and will create a `.js` file with the same name inside [OUTPATH/DIR/]. You can then either ship the resulting JavaScript as modules or use a JavaScript bundler like [Rollup](https://rollupjs.org).

**SINCE VERSION 0.6.6**  
The CLI now allows to define the type of file that will be generated via the `--filetype` or `-f` argument. It accepts the values `js` (default value) or `mjs` and generates `.js` or `.mjs` files respectively.
