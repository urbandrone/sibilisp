// sibilispPrelude// -// MIT;
export const identity = (function(a) {
    return a;
});
export const thunk = (function(a) {
    return (function() {
      
    return a;
  });
});
export const listOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("" + "(list-of? expects argument 2 to\n" +
    "					 				 be a function, got " + predicate)))
  }).call(this)
    : (Array.isArray(x) && x.every(predicate)));
});
export const hashOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("" + "(hash-of? expects argument 2 to \n" +
    "					 				 be a function, got " + predicate)))
  }).call(this)
    : ((!(null == x) && x.constructor === Object) && Object.entries(x).every((function(v$1) {
      
    var _ = v$1[0],
        v = v$1[1];
  
    return predicate(v);
  }))));
});
export const dictOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("" + "(dict-of?) expects argument 2 to \n" +
    "					 				 be a function, got " + predicate)))
  }).call(this)
    : ((!(null == x) && x.constructor === Map) && x.entries().every((function(v$2) {
      
    var _ = v$2[0],
        v = v$2[1];
  
    return predicate(v);
  }))));
});
export const converge = (function(combine, branches) {
    return (!(typeof combine === "function")
    ? (function() {
    throw (new Error(("" + "(converge) expects argument 1 to\n" +
    "					 				 be a function, got " + combine)))
  }).call(this)
    : !(listOf__QUERY(branches, (function(v) {
      
    return typeof v === "function";
  })))
    ? (function() {
    throw (new Error(("" + "(converge) expects argument 2 to\n" +
    "					 				 be a list of functions, got " + branches)))
  }).call(this)
    : (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return (!(args.length === branches.length)
      ? (function() {
      throw (new Error(("" + "(converge -> lambda) expects arguments\n" +
      "												 				 length (" + args.length + ") to equal the number\n" +
      "																 of branches (" + branches.length + ") but they\n" +
      "																 differ.")))
    }).call(this)
      : converge.apply(null, branches.map((function(branch, i) {
          
      return branch(args[i], i, args);
    }))));
  }));
});
export const unit = function unit(value) {
  let self$1 = Object.create(unit.prototype);
  let alen = arguments.length;
  (function() {
    if (!(alen === 1)) {
      return (function() {
        throw (new Error(("" + "Tagged constructor " + unit + "expects " + 1 + " arguments but got " + alen)))
      }).call(this);
    }
  }).call(this);
  self$1.value = value;
  return self$1;
};
unit.prototype.toString = (function() {
    return ("(unit " + show(this.value) + ")");
});
unit.prototype.equals = (function(tUnit) {
    return (tUnit instanceof unit && this.value === tUnit.value);
});
unit.prototype.concat = (function(tUnit) {
    return (!(tUnit instanceof unit)
    ? (function() {
    throw (new Error(("" + "(unit.concat) expects argument 1 to \n" +
    "				 				 be a unit, got " + tUnit)))
  }).call(this)
    : (!(typeof this.value.concat === "function") || !(typeof tUnit.value.concat === "function"))
    ? (function() {
    throw (new Error(("" + "(unit.concat) cannot concat units\n" +
    "				 				 with non-semigroup values")))
  }).call(this)
    : unit(this.value.concat(tUnit.value)));
});
unit.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(unit.map) expects argument 1 to\n" +
    "				 				 be a function, got " + mapper)))
  }).call(this)
    : unit(mapper(this.value)));
});
unit.prototype.ap = (function(tUnit) {
    return (!(tUnit instanceof unit)
    ? (function() {
    throw (new Error(("" + "(unit.ap) expects argument 1 to\n" +
    "				 				 be a unit, got " + tUnit)))
  }).call(this)
    : !(typeof this.value === "function")
    ? (function() {
    throw (new Error(("" + "(unit.ap) cannot apply a unit that\n" +
    "				 				 doesn't carry a function, but " + this.value)))
  }).call(this)
    : tUnit.map(this.value));
});
unit.prototype.reduce = (function(reducer, seed) {
    return (!(typeof reducer === "function")
    ? (function() {
    throw (new Error(("" + "(unit.reduce) expects argument 1 to\n" +
    "				 				 be a function, got " + reducer)))
  }).call(this)
    : !(typeof seed !== "undefined")
    ? (function() {
    throw (new Error(("" + "(unit.reduce) expects argument 2 to\n" +
    "				 				 be any value except undefined.")))
  }).call(this)
    : reducer(seed, this.value));
});
unit.prototype.valueOf = (function() {
    return this.value;
});
export const show = (function(x) {
    return (null == x
    ? "(nil)"
    : Number.isNaN(x)
    ? "(nan)"
    : typeof x === "string"
    ? ("(string " + x + ")")
    : (typeof x === "number" && !(Number.isNaN(x)))
    ? ("(number " + x + ")")
    : typeof x === "function"
    ? ("(function " + (x.name || "lambda") + ")")
    : generator__QUERY(x)
    ? ("(generator " + x.name + ")")
    : Array.isArray(x)
    ? ("(list" + x.reduce((function(a, v) {
      
    return (a + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Object)
    ? ("(hash" + Object.entries(x).reduce((function(a, k_v$1) {
      
    var k = k_v$1[0],
        v = k_v$1[1];
  
    return (a + " :" + k + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Map)
    ? ("(dict" + x.entries().reduce((function(a, k_v$2) {
      
    var k = k_v$2[0],
        v = k_v$2[1];
  
    return (a + " :" + show(k) + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Promise)
    ? "(future)"
    : (!(null == x) && x.constructor === Date)
    ? ("(date" + x.getFullYear() + "-" + (1 + x.getMonth()) + "-" + x.getDate() + ")")
    : (!(null == x) && x.constructor === RegExp)
    ? ("(regex " + x.source + " :flags " + x.flags + ")")
    : x.toString());
});