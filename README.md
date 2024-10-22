<img src="media/logo/sibilisp-logo-colored.svg" alt="logo" width="280px"><br><br>

![GitHub license](https://img.shields.io/npm/l/sibilisp?color=527A8F) ![NPM version](https://img.shields.io/npm/v/sibilisp?color=4f6376) ![Github stars](https://img.shields.io/github/stars/urbandrone/sibilisp?color=393545) ![NPM downloads](https://img.shields.io/npm/dm/sibilisp?color=335A70)

A multi-paradigm, functional programming oriented, [Sibilant](https://sibilant.org/) based language dialect that transpiles to JavaScript. If you think that this sounds 👽, maybe you'd like to see some example code! The following function checks if a given `String` contains a palindrome by recursively comparing the characters at the `start` and `end` positions:

```lisp
(defun string-is-palindrome? (s)
  (let ((low-s (.to-lower-case s)))
    (loop ((start 0)
          (end (decf (length s))))
      (cond ((not (eql? (getf low-s start) (getf low-s end))) false)
            ((>= start end) true)
            :else (recur (incf start) (decf end))))))

(string-is-palindrome? "kayak")  ; => true
(string-is-palindrome? "baobab") ; => false
```

And don't worry about "too much `(` and `)`" - they are what enables a powerful macro system that you have right at your fingertips to meld the basic language into a real Domain Specific Language that reads almost as if it where a instructional book:

```lisp
(include)

(defun find-products-in-category (hashtag)
  (|> hashtag
      (escape-category-hash)
      (products-find-category-id :by-hashtag :with-async-load)
      ()))
```


### Features

Sibilisp ...  

* brings the ES2015+ module system to Sibilant, as well as several new macros for ES2015+ promises, default function arguments, generator functions, yielding...
* enables tail recursive programming via it's `loop` and `recur` construct.
* is tailored towards functional programming concepts, but remains being a multi-paradigm language.
* has build-in facilities for creating tagged type and sum type constructors.
* supports `.slisp`, `.sibilant` and `.js` files in the same project and can compile all of them into plain JavaScript files.
* results in readable JavaScript that does not modify built-in prototypes. 🤗
* is fun to use. 😎

### Documentation

As of now, documentation can be found in the GitHub wiki.

**Wiki**  
* [Home](https://github.com/urbandrone/sibilisp/wiki/00-Introduction)

**Guides**  
* [Install and setup](https://github.com/urbandrone/sibilisp/wiki/01-Setup)
* [Macros](https://github.com/urbandrone/sibilisp/wiki/04-Macros)

**API & Language** 
* [Sibilisp language](https://github.com/urbandrone/sibilisp/wiki/02-Language)
* [The `prelude`](https://github.com/urbandrone/sibilisp/wiki/03-The-prelude)

**Examples**  
🚧 Under construction


### Reasoning

Sibilant is a LISP-like language based on s-expressions, that is written in itself and transpiles to JavaScript. It ships a very nice macro system with it that almost* works like a real LISP macro system (awesome!). However, writing Sibilant code is almost the same as writing JavaScript code (that's by intention) whereas it could be operating on a much higher level of abstraction. This is when Sibilisp comes into play.

Sibilisp uses the underlying macro system of Sibilant to further develop a dialect that enhances it's base language, ranging from macros that implement various new JavaScript features - like the ES2015+ module system - to macros which provide pattern matching** or recursion. 

As a free bonus, Sibilisp ships with a functional programming toolkit as separate ES2015+ module called `prelude` that you can use in your programs. If you are a JavaScript programmer, think of it as a built-in Lodash or Underscore.

_Notes:_  
_* Everything is based on JavaScript, so certain limitations apply_  
_** Again, to a limited degree_
