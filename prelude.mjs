// sibilispPrelude// -// MIT;
const _eNoValue_ = "E_NO_VALUE";
const _eGuard_ = " guards agains (nil) and (void) values, got";
const _eArg1_ = " expects argument 1 to be a ";
const _eArg2_ = " expects argument 2 to be a ";
const _eArg3_ = " expects argument 3 to be a ";
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
    throw (new Error(("" + "(list-of?)" + _eArg2_ + "function, got " + predicate)))
  }).call(this)
    : (Array.isArray(x) && x.every(predicate)));
});
export const hashOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("" + "(hash-of?)" + _eArg2_ + "function, got " + predicate)))
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
    throw (new Error(("" + "(dict-of?)" + _eArg2_ + "function, got " + predicate)))
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
    throw (new Error(("" + "(converge)" + _eArg1_ + "function, got " + combine)))
  }).call(this)
    : !(listOf__QUERY(branches, (function(v) {
      
    return typeof v === "function";
  })))
    ? (function() {
    throw (new Error(("" + "(converge)" + _eArg2_ + "list of functions, got " + branches)))
  }).call(this)
    : (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return combine.apply(null, branches.map((function(branch, i) {
          
      return branch.apply(null, args);
    })));
  }));
});
export const memoize = (function(compute) {
    return (!(typeof compute === "function")
    ? (function() {
    throw (new Error(("" + "(memoize)" + _eArg1_ + "function, got " + compute)))
  }).call(this)
    : (function(cache) {
      
    return (function(args) {
          
      var args = Array.prototype.slice.call(arguments, 0);
    
      return (cache.has(args)
        ? cache.get(args)
        : cache.set(args, compute.apply(null, args)).get(args));
    });
  })((new Map([]))));
});
export const show = (function(x) {
    return (null == x
    ? "(nil)"
    : Number.isNaN(x)
    ? "(nan)"
    : Error.prototype.isPrototypeOf(x)
    ? ("(error " + x.name + ": " + x.message + ")")
    : typeof x === "string"
    ? ("(string " + x + ")")
    : (typeof x === "number" && !(Number.isNaN(x)))
    ? ("(number " + x + ")")
    : typeof x === "function"
    ? ("(function " + (x.name || "lambda") + ")")
    : (!(null == x) && x.constructor === GeneratorFunction)
    ? ("(generator " + x.name + ")")
    : Array.isArray(x)
    ? ("(list" + x.reduce((function(a, v) {
      
    return (a + " " + show(v));
  }), "") + ")")
    : (!(null == x) && x.constructor === Set)
    ? ("(mset" + Array.from(x).reduce((function(a, v) {
      
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
export const equals = (function(x, y) {
    return (x === null
    ? y === null
    : typeof x === "undefined"
    ? typeof y === "undefined"
    : (typeof x === "string" && typeof y === "string")
    ? x === y
    : (typeof x === "function" && typeof y === "function")
    ? x === y
    : ((typeof x === "number" && !(Number.isNaN(x))) && (typeof y === "number" && !(Number.isNaN(y))))
    ? x === y
    : ((!(null == x) && x.constructor === RegExp) && (!(null == y) && y.constructor === RegExp))
    ? (x.source === y.source && x.flag === y.flag)
    : ((!(null == x) && x.constructor === Date) && (!(null == y) && y.constructor === Date))
    ? Number(x) === Number(y)
    : ((!(null == x) && x.constructor === GeneratorFunction) && (!(null == y) && y.constructor === GeneratorFunction))
    ? x === y
    : ((!(null == x) && x.constructor === Promise) && (!(null == y) && y.constructor === Promise))
    ? x === y
    : (Array.isArray(x) && Array.isArray(y))
    ? (x.length === y.length && x.every((function(va, i) {
      
    return equals(va, y[i]);
  })))
    : ((!(null == x) && x.constructor === Set) && (!(null == y) && y.constructor === Set))
    ? (x.size() === y.size() && equals(Array.from(x), Array.from(y)))
    : ((!(null == x) && x.constructor === Object) && (!(null == y) && y.constructor === Object))
    ? (function(pa, pb) {
      
    return (pa.length === pb.length && pa.every((function(k_v$3) {
          
      var k = k_v$3[0],
          v = k_v$3[1];
    
      return equals(v, y[k]);
    })));
  })(Object.entries(x), Object.entries(y))
    : ((!(null == x) && x.constructor === Map) && (!(null == y) && y.constructor === Map))
    ? (function(pa, pb) {
      
    return (pa.length === pb.length && pa.every((function(k_v$4) {
          
      var k = k_v$4[0],
          v = k_v$4[1];
    
      return equals(v, y.get(k));
    })));
  })(Array.from(x.entries()), Array.from(y.entries()))
    : typeof x.equals === "function"
    ? x.equals(y)
    : false);
});
export const concat = (function(x, y) {
    return ((!(!(x == null)) || !(!(y == null)))
    ? (function() {
    throw (new Error(("" + "(concat) cannot concatenate with a (void) or (nil) value")))
  }).call(this)
    : (typeof x === "string" && typeof y === "string")
    ? (x + y)
    : (typeof x === "function" && typeof y === "function")
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return y(x.apply(null, args));
  })
    : (Array.isArray(x) && Array.isArray(y))
    ? x.concat(y)
    : ((!(null == x) && x.constructor === Set) && (!(null == y) && y.constructor === Set))
    ? (function() {
      
    xy.forEach((function(mset$1) {
          
      return mset$1.forEach((function(msetVal$1) {
              
        return (new Set([])).add(msetVal$1);
      }));
    }));
    return (new Set([]));
  }).call(this)
    : ((!(null == x) && x.constructor === Promise) && (!(null == y) && y.constructor === Promise))
    ? Promise.all([ x, y ])
    : typeof x.concat === "function"
    ? x.concat(y)
    : (function() {
    throw (new Error(("" + "(concat) needs both arguments to be in the same semigroup")))
  }).call(this));
});
export const map = (function(x, mapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(map)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : typeof x === "function"
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return mapper(x.apply(null, args));
  })
    : (!(null == x) && x.constructor === Promise)
    ? x.then(mapper, identity)
    : typeof x.map === "function"
    ? x.map(mapper)
    : (!(null == x) && x.constructor === Object)
    ? Object.entries(x).reduce((function(o, k_v$5) {
      
    var k = k_v$5[0],
        v = k_v$5[1];
  
    return Object.assign(o, { k: mapper(v) });
  }), {  })
    : (!(null == x) && x.constructor === Map)
    ? (function(y) {
      
    Array.from(x.entries()).forEach((function(k_v$6) {
          
      var k = k_v$6[0],
          v = k_v$6[1];
    
      return y.set(k, mapper(v));
    }));
    return y;
  })((new Map([])))
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    x.forEach((function(v) {
          
      return y.add(mapper(v));
    }));
    return y;
  })((new Set([])))
    : (function() {
    throw (new Error(("" + "(map) needs the value to be a Functor")))
  }).call(this));
});
export const ap = (function(x, applicable) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(ap)" + _eGuard_ + show(x))))
  }).call(this)
    : !((!(applicable == null) || typeof applicable === "function" || typeof applicable.ap === "function" || Array.isArray(applicable) || (!(null == applicable) && applicable.constructor === Set)))
    ? (function() {
    throw (new Error(("" + "(ap)" + _eArg2_ + "Apply, got " + show(applicable))))
  }).call(this)
    : (typeof x === "function" && typeof applicable === "function")
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return applicable.apply(this, args).apply(this, [ x.apply(this, args) ].concat(args));
  })
    : ((!(null == x) && x.constructor === Promise) && (!(null == applicable) && applicable.constructor === Promise))
    ? applicable.then((function(f) {
      
    return x.then(f, identity);
  }))
    : (typeof x.map === "function" && typeof applicable.ap === "function")
    ? applicable.ap(x)
    : (Array.isArray(x) && Array.isArray(applicable))
    ? x.map((function(v) {
      
    return applicable.reduce((function(y, f) {
          
      return f(y);
    }), v);
  }))
    : ((!(null == x) && x.constructor === Set) && (!(null == applicable) && applicable.constructor === Set))
    ? (function(y) {
      
    x.forEach((function(v) {
          
      return applicable.forEach((function(f) {
              
        return y.add(f(v));
      }));
    }));
    return y;
  })((new Set([])))
    : (function() {
    throw (new Error(("" + "(ap) needs the value to be a Functor")))
  }).call(this));
});
export const flatMap = (function(x, chainMapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(flat-map|chain)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof chainMapper === "function")
    ? (function() {
    throw (new Error(("" + "(flat-map|chain)" + _eArg2_ + "function, got " + show(chainMapper))))
  }).call(this)
    : typeof x === "function"
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return chainMapper(x.apply(null, args)).apply(this, args);
  })
    : (!(null == x) && x.constructor === Promise)
    ? x.then(chainMapper, identity)
    : typeof x.flatMap === "function"
    ? x.flatMap(chainMapper)
    : Array.isArray(x)
    ? x.reduce((function(ls, v) {
      
    return ls.concat(v);
  }), [])
    : (function() {
    throw (new Error(("" + "(flat-map|chain) needs the value to be a Chain")))
  }).call(this));
});
export const chain = flatMap;
export const bimap = (function(x, lhsMapper, rhsMapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(bimap)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof lhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(bimap)" + _eArg2_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(bimap)" + _eArg3_ + "function, got " + show(rhsMapper))))
  }).call(this)
    : (!(null == x) && x.constructor === Promise)
    ? x.then(rhsMapper, lhsMapper)
    : Array.isArray(x)
    ? (x.length < 1) ? [ lhsMapper() ] : x.map(rhsMapper)
    : (!(null == x) && x.constructor === Set)
    ? (x.size < 1) ? (new Set([ lhsMapper() ])) : (new Set(Array.from(x).map(rhsMapper)))
    : typeof x.bimap === "function"
    ? x.bimap(lhsMapper, rhsMapper)
    : (function() {
    throw (new Error(("" + "(bimap) needs the first argument to be a BiFunctor")))
  }).call(this));
});
export const contramap = (function(x, lhsMapper) {
    return bimap(x, lhsMapper, identity);
});
export const promap = (function(x, preMapper, postMapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(promap)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof preMapper === "function")
    ? (function() {
    throw (new Error(("" + "(promap)" + _eArg2_ + "function, got " + show(preMapper))))
  }).call(this)
    : !(typeof postMapper === "function")
    ? (function() {
    throw (new Error(("" + "(promap)" + _eArg3_ + "function, got " + show(postMapper))))
  }).call(this)
    : typeof x === "function"
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return postMapper(x(preMapper.apply(null, args)));
  })
    : typeof x.promap === "function"
    ? x.promap(preMapper, postMapper)
    : (function() {
    throw (new Error(("" + "(promap) needs the first argument to be a ProFunctor")))
  }).call(this));
});
export const reduce = (function(x, reducer, seed) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(reduce)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof reducer === "function")
    ? (function() {
    throw (new Error(("" + "(reduce)" + _eArg2_ + "function, got " + show(reducer))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce(reducer, seed);
  })(Array.from(x.values()))
    : typeof x.reduce === "function"
    ? x.reduce(reducer, seed)
    : (function() {
    throw (new Error(("" + "(reduce) needs the first argument to be a Foldable")))
  }).call(this));
});
export const foldMap = (function(x, liftMap) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(reduce)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof liftMap === "function")
    ? (function() {
    throw (new Error(("" + "(fold-map)" + _eArg2_ + "function, got " + show(liftMap))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return (a === null) ? liftMap(value) : a.concat(liftMap(value));
    }), null);
  })(Array.from(x.values()))
    : typeof x.reduce === "function"
    ? x.reduce((function(a, value) {
      
    return (a === null) ? liftMap(value) : a.concat(liftMap(value));
  }), null)
    : (function() {
    throw (new Error(("" + "(fold-map) needs the first argument to be a Foldable")))
  }).call(this));
});
export const fold = (function(x, lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(fold)" + _eArg2_ + "function, got " + show(lift))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return (a === null) ? lift(value) : a.concat(lift(value));
    }), null);
  })(Array.from(x.values()))
    : typeof x.fold === "function"
    ? x.fold(lift)
    : typeof x.reduce === "function"
    ? x.reduce((function(a, value) {
      
    return (a === null) ? lift(value) : a.concat(lift(value));
  }), null)
    : (function() {
    throw (new Error(("" + "(fold) needs the first argument to be a Foldable")))
  }).call(this));
});
export const traverse = (function(x, lift, transformer) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(traverse)" + _eArg1_ + "Traversable, got " + show(x))))
  }).call(this)
    : !(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(traverse)" + _eArg2_ + "function, got " + show(lift))))
  }).call(this)
    : !(typeof transformer === "function")
    ? (function() {
    throw (new Error(("" + "(traverse)" + _eArg3_ + "function, got " + show(transformer))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return transformer(value).map((function(x) {
              
        return (function(y) {
                  
          return (function() {
                      
            x.forEach((function(mset$2) {
                          
              return mset$2.forEach((function(msetVal$2) {
                              
                return y.add(msetVal$2);
              }));
            }));
            return y;
          }).call(this);
        });
      })).ap(a);
    }), lift((new Set([]))));
  })(Array.from(x.values()))
    : Array.isArray(x)
    ? x.reduce((function(a, value) {
      
    return transformer(value).map((function(x) {
          
      return (function(y) {
              
        return y.concat(x);
      });
    })).ap(a);
  }), lift([]))
    : typeof x.traverse === "function"
    ? x.traverse(lift, transformer)
    : (function() {
    throw (new Error(("" + "(traverse) needs the first argument to be a Traversable")))
  }).call(this));
});
export const sequence = (function(x, lift) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("" + "(sequence)" + _eArg1_ + "Traversable, got " + show(x))))
  }).call(this)
    : !(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(sequence)" + _eArg2_ + "function, got " + show(lift))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return value.map((function(x) {
              
        return (function(y) {
                  
          return (function() {
                      
            x.forEach((function(mset$3) {
                          
              return mset$3.forEach((function(msetVal$3) {
                              
                return y.add(msetVal$3);
              }));
            }));
            return y;
          }).call(this);
        });
      })).ap(a);
    }), lift((new Set([]))));
  })(Array.from(x.values()))
    : Array.isArray(x)
    ? x.reduce((function(a, value) {
      
    return value.map((function(x) {
          
      return (function(y) {
              
        return y.concat(x);
      });
    })).ap(a);
  }), lift([]))
    : typeof x.sequence === "function"
    ? x.sequence(lift, transformer)
    : (function() {
    throw (new Error(("" + "(sequence) needs the first argument to be a Traversable")))
  }).call(this));
});
export const zip = (function(lsA, lsB) {
    return ((Array.isArray(lsA) && Array.isArray(lsB))
    ? (function(l, i, r) {
      
    (function() {
      var while$1 = undefined;
      while (i < l) {
        while$1 = (function() {
          r.push([ lsA[i], lsB[i] ]);
          return i += 1;
        }).call(this);
      };
      return while$1;
    }).call(this);
    return r;
  })(Math.min(lsA.length, lsB.length), 0, [])
    : ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))
    ? (function() {
      
    let a = Array.from(lsA);
    let b = Array.from(lsB);
    let l = Math.min(a.length, b.length);
    let i = 0;
    let r = (new Set([]));
    return (function() {
          
      (function() {
        var while$2 = undefined;
        while (i < l) {
          while$2 = (function() {
            r.add([ a[i], b[i] ]);
            return i += 1;
          }).call(this);
        };
        return while$2;
      }).call(this);
      return r;
    })();
  }).call(this)
    : (function() {
    throw (new Error(("" + "(zip) expects both arguments to be a list or mset")))
  }).call(this));
});
export const unzip = (function(ls) {
    return ((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set))
    ? (function(ks, vs) {
      
    ls.forEach((function(k_v$7) {
          
      var k = k_v$7[0],
          v = k_v$7[1];
    
      ks.push(k);
      return vs.push(v);
    }));
    return [ ks, vs ];
  })([], [])
    : (function() {
    throw (new Error(("" + "(unzip) expects the argument to be a list or mset")))
  }).call(this));
});
export const find = (function(ls, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("" + "(find)" + _eArg2_ + "function, got" + show(predicate))))
  }).call(this)
    : (Array.isArray(ls) && typeof ls.find === "function")
    ? maybe.lift(ls.find(predicate))
    : Array.isArray(ls)
    ? (function(l, i, m) {
      
    (function() {
      var while$3 = undefined;
      while ((!(m) && i < l)) {
        while$3 = (function() {
          (function() {
            if (predicate(ls[i])) {
              return m = ls[i];
            }
          }).call(this);
          return i += 1;
        }).call(this);
      };
      return while$3;
    }).call(this);
    return maybe.lift(m);
  })(ls.length, 0, null)
    : (!(null == ls) && ls.constructor === Set)
    ? (function(x, l, i, m) {
      
    (function() {
      var while$4 = undefined;
      while ((!(m) && i < l)) {
        while$4 = (function() {
          (function() {
            if (predicate(x[i])) {
              return m = x[i];
            }
          }).call(this);
          return i += 1;
        }).call(this);
      };
      return while$4;
    }).call(this);
    return maybe.lift(m);
  })(Array.from(ls), x.length, 0, null)
    : (function() {
    throw (new Error(("" + "(find) expects the first argument to be a list or mset")))
  }).call(this));
});
export const filter = (function(ls, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("" + "(filter)" + _eArg2_ + "function, got " + show(predicate))))
  }).call(this)
    : Array.isArray(ls)
    ? ls.filter(predicate)
    : (!(null == ls) && ls.constructor === Set)
    ? (function(x) {
      
    return (new Set([ ls.filter(predicate) ]));
  })(Array.from(ls))
    : (function() {
    throw (new Error(("" + "(filter) expects the first argument to be a list or mset")))
  }).call(this));
});
export const select = filter;
export const reject = (function(ls, predicate) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("" + "(reject) expects the first argument to be a list or mset")))
  }).call(this)
    : !(typeof predicate === "function")
    ? (function() {
    throw (new Error(("" + "(reject)" + _eArg2_ + "function, got" + show(predicate))))
  }).call(this)
    : filter(ls, (function(x) {
      
    return !(predicate(x));
  })));
});
export const unique = (function(ls) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("" + "(unique)" + _eArg1_ + "list or mset, got" + show(ls))))
  }).call(this)
    : Array.isArray(ls)
    ? Array.from((new Set(ls)))
    : ls);
});
export const union = (function(lsA, lsB) {
    return (!(((Array.isArray(lsA) && Array.isArray(lsB)) || ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))))
    ? (function() {
    throw (new Error(("" + "(union) expects the arguments to both be lists or msets")))
  }).call(this)
    : (Array.isArray(lsA) && Array.isArray(lsB))
    ? (function(ab) {
      
    return Array.from((new Set(ab)));
  })(lsA.concat(lsB))
    : (new Set(Array.from(lsA).concat(Array.from(lsB)))));
});
export const intersection = (function(lsA, lsB) {
    return (!(((Array.isArray(lsA) && Array.isArray(lsB)) || ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))))
    ? (function() {
    throw (new Error(("" + "(intersection) expects the arguments to both be lists or msets")))
  }).call(this)
    : (Array.isArray(lsA) && Array.isArray(lsB))
    ? (function(a, b, ab) {
      
    a.forEach((function(v) {
          
      return (function() {
        if (b.indexOf(v) > -1) {
          return ab.push(v);
        }
      }).call(this);
    }));
    b.forEach((function(v) {
          
      return (function() {
        if (a.indexOf(v) > -1) {
          return ab.push(v);
        }
      }).call(this);
    }));
    return ab;
  })(unique(lsA), unique(lsB), [])
    : (function(ab) {
      
    lsA.forEach((function(v) {
          
      return (function() {
        if (b.has(v)) {
          return ab.add(v);
        }
      }).call(this);
    }));
    lsB.forEach((function(v) {
          
      return (function() {
        if (a.has(v)) {
          return ab.add(v);
        }
      }).call(this);
    }));
    return ab;
  })((new Set([]))));
});
export const difference = (function(lsA, lsB) {
    return (!(((Array.isArray(lsA) && Array.isArray(lsB)) || ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))))
    ? (function() {
    throw (new Error(("" + "(difference) expects the arguments to both be lists or msets")))
  }).call(this)
    : (Array.isArray(lsA) && Array.isArray(lsB))
    ? (function(a, b, ab) {
      
    a.forEach((function(v) {
          
      return (function() {
        if (b.indexOf(v) < 0) {
          return ab.push(v);
        }
      }).call(this);
    }));
    b.forEach((function(v) {
          
      return (function() {
        if (a.indexOf(v) < 0) {
          return ab.push(v);
        }
      }).call(this);
    }));
    return ab;
  })(unique(lsA), unique(lsB), [])
    : (function(ab) {
      
    lsA.forEach((function(v) {
          
      return (function() {
        if (!(b.has(v))) {
          return ab.add(v);
        }
      }).call(this);
    }));
    lsB.forEach((function(v) {
          
      return (function() {
        if (!(a.has(v))) {
          return ab.add(v);
        }
      }).call(this);
    }));
    return ab;
  })((new Set([]))));
});
export const take = (function(ls, count) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("" + "(take)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !((typeof count === "number" && !(Number.isNaN(count))))
    ? (function() {
    throw (new Error(("" + "(take)" + _eArg2_ + "number, got " + show(count))))
  }).call(this)
    : Array.isArray(ls)
    ? (count <= ls.length) ? ls.slice(0, count) : ls
    : (count <= ls.size) ? (function() {
      
    let xs = Array.from(ls);
    let ys = xs.slice(0, count);
    return (function() {
          
      return (new Set(ys));
    })();
  }).call(this) : ls);
});
export const drop = (function(ls, count) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("" + "(drop)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !((typeof count === "number" && !(Number.isNaN(count))))
    ? (function() {
    throw (new Error(("" + "(drop)" + _eArg2_ + "number, got " + show(count))))
  }).call(this)
    : Array.isArray(ls)
    ? (count <= ls.length) ? ls.slice(count) : []
    : (count <= ls.size) ? (function() {
      
    let xs = Array.from(ls);
    let ys = xs.slice(count);
    return (function() {
          
      return (new Set(ys));
    })();
  }).call(this) : (new Set([])));
});
export const partition = (function(ls, count) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("" + "(partition)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !((typeof count === "number" && !(Number.isNaN(count))))
    ? (function() {
    throw (new Error(("" + "(partition)" + _eArg2_ + "number, got " + show(count))))
  }).call(this)
    : Array.isArray(ls)
    ? (function(xs) {
      
    (function() {
      var while$6 = undefined;
      while (i < l) {
        while$6 = (function() {
          return (function(a) {
                      
            xs.push(a);
            return i += count;
          })(ls.slice(i, count));
        }).call(this);
      };
      return while$6;
    }).call(this);
    return xs;
  })(l(ls.length))
    : (function(xs, ys, i, l) {
      
    (function() {
      var while$5 = undefined;
      while (i < l) {
        while$5 = (function() {
          return (function(a) {
                      
            ys.push(a);
            return i += count;
          })(xs.slice(i, count));
        }).call(this);
      };
      return while$5;
    }).call(this);
    return (new Set(ys));
  })(Array.from(ls), [], 0, xs.length));
});
export const coyo = (function() {
    function type$1(value, mapper) {
    let self$1 = Object.create(type$1.prototype);
    let argCount$1 = arguments.length;
    (function() {
      if (!(argCount$1 === 2)) {
        return (function() {
          throw (new Error(("" + "coyo" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$1.value = value;
    self$1.mapper = mapper;
    return self$1;
  };
  type$1.is = (function(x$1) {
      
    return x$1 instanceof type$1;
  });
  return type$1;
}).call(this);
coyo.of = (function(value) {
    return coyo(value, identity);
});
coyo.lift = (function(value) {
    return (!(!(value == null))
    ? (function() {
    throw (new Error(("" + "(coyo.lift)" + _eGuard_ + value)))
  }).call(this)
    : coyo.of(value));
});
coyo.prototype.toString = (function() {
    return (function(value, fn) {
      
    return ("(coyo " + show(value) + " " + show(fn) + ")");
  })(this.value, this.mapper);
});
coyo.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(coyo.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : (function(value, runSelf) {
      
    return coyo(value, (function(arg) {
          
      return mapper(runSelf(arg));
    }));
  })(this.value, this.mapper));
});
coyo.prototype.lower = (function() {
    return (function(mapper, value) {
      
    return (!(typeof mapper === "function")
      ? (function() {
      throw (new Error(("" + "(coyo.lower) requires the coyo:mapper property\n" +
      "                   to hold a function, but it holds " + show(mapper))))
    }).call(this)
      : !(!(value == null))
      ? (function() {
      throw (new Error(("" + "(coyo.lower) requires the coyo:value property\n" +
      "                   to hold a non (void) or (nil) value, but it holds " + show(value))))
    }).call(this)
      : !(typeof value.map === "function")
      ? (function() {
      throw (new Error(("" + "(coyo.lower) requires the coyo:value property\n" +
      "                   to implement the functor typeclass but it doesn't")))
    }).call(this)
      : coyo(value.map(mapper), identity));
  })(this.mapper, this.value);
});
coyo.prototype.reduce = (function(reducer, seed) {
    return (function(value, mapper) {
      
    return (!(typeof reducer === "function")
      ? (function() {
      throw (new Error(("" + "(coyo.reduce)" + _eArg1_ + "function, got " + show(reducer))))
    }).call(this)
      : !(typeof seed !== "undefined")
      ? (function() {
      throw (new Error(("" + "(coyo.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
    }).call(this)
      : typeof value.reduce === "function"
      ? value.reduce((function(acc, val) {
          
      return reducer(acc, mapper(val));
    }), seed)
      : reducer(seed, mapper(value)));
  })(this.value, this.mapper);
});
export const io = (function() {
    function type$2(unsafePerform) {
    let self$2 = Object.create(type$2.prototype);
    let argCount$2 = arguments.length;
    (function() {
      if (!(argCount$2 === 1)) {
        return (function() {
          throw (new Error(("" + "io" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$2.unsafePerform = unsafePerform;
    return self$2;
  };
  type$2.is = (function(x$2) {
      
    return x$2 instanceof type$2;
  });
  return type$2;
}).call(this);
io.of = (function(value) {
    return io((function() {
      
    return value;
  }));
});
io.lift = (function(value) {
    return (!(!(value == null))
    ? (function() {
    throw (new Error(("" + "(io.lift)" + _eGuard_ + value)))
  }).call(this)
    : io.of(value));
});
io.empty = (function() {
    return io((function(value) {
      
    return value;
  }));
});
io.identity = io.empty;
io.prototype.toString = (function() {
    return (function(fn) {
      
    return ("(io " + show(fn) + ")");
  })(this.unsafePerform);
});
io.prototype.equals = (function(tIo) {
    return (!(tIo instanceof io)
    ? (function() {
    throw (new Error(("" + "(io.equals)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : this.unsafePerform === tIo.unsafePerform);
});
io.prototype.concat = (function(tIo) {
    return (!(tIo instanceof io)
    ? (function() {
    throw (new Error(("" + "(io.concat)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return io((function(arg) {
          
      return runThat(runSelf(arg));
    }));
  })(this.unsafePerform, tIo.unsafePerform));
});
io.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return mapper(runSelf(arg));
    }));
  })(this.unsafePerform));
});
io.prototype.contramap = (function(preMapper) {
    return (!(typeof preMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.contramp)" + _eArg1_ + "function, got " + show(preMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return runSelf(preMapper(arg));
    }));
  })(this.unsafePerform));
});
io.prototype.promap = (function(preMapper, postMapper) {
    return (!(typeof preMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.promap)" + _eArg1_ + "function, got " + show(preMapper))))
  }).call(this)
    : !(typeof postMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.promap)" + _eArg2_ + "function, got " + show(postMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return postMapper(runSelf(preMapper(arg)));
    }));
  })(this.unsafePerform));
});
io.prototype.ap = (function(tIo) {
    return (!(tIo instanceof io)
    ? (function() {
    throw (new Error(("" + "(io.ap)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : (function(runSelf) {
      
    return tIo.map(runSelf);
  })(this.unsafePerform));
});
io.prototype.flatMap = (function(toIoMapper) {
    return (!(typeof toIoMapper === "function")
    ? (function() {
    throw (new Error(("" + "(io.flat-map | io.chain)" + _eArg1_ + "io returning function, got " + show(toIoMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return toIoMapper(runSelf(arg)).unsafePerform(arg);
    }));
  })(this.unsafePerform));
});
io.prototype.chain = io.prototype.flatMap;
io.prototype.compose = (function(tIo) {
    return (!(tIo instanceof io)
    ? (function() {
    throw (new Error(("" + "(io.compose)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return io((function(arg) {
          
      return runThat(runSelf(arg));
    }));
  })(this.unsafePerform, tIo.unsafePerform));
});
io.prototype.runIo = (function(arg) {
    return this.unsafePerform(arg);
});
export const maybe = (function() {
    const sumtype$1 = Object.create(null);
  sumtype$1.prototype = { __sibilispType__: sumtype$1 };
  sumtype$1.nothing = function nothing() {
    let self$3 = Object.create(sumtype$1.prototype);
    let argCount$3 = arguments.length;
    (function() {
      if (!(argCount$3 === 0)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + maybe + "." + nothing + "expects " + 0 + " arguments but got " + argCount$3)))
        }).call(this);
      }
    }).call(this);
    self$3.constructor = nothing;
    self$3.__sibilispTags__ = [];
    return self$3;
  };;
  sumtype$1.just = function just(value) {
    let self$4 = Object.create(sumtype$1.prototype);
    let argCount$4 = arguments.length;
    (function() {
      if (!(argCount$4 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + maybe + "." + just + "expects " + 1 + " arguments but got " + argCount$4)))
        }).call(this);
      }
    }).call(this);
    self$4.value = value;
    self$4.constructor = just;
    self$4.__sibilispTags__ = [ "value" ];
    return self$4;
  };;
  sumtype$1.prototype.match = (function(ctors) {
      
    let self = this,
        name = self.constructor.name,
        ctor = ctors[name],
        keys = self.__sibilispTags__;
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error(("" + ".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$1.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$1);
  });
  return sumtype$1;
}).call(this);
maybe.of = (function(value) {
    return maybe.just(value);
});
maybe.lift = (function(value) {
    return (!(!(value == null))
    ? maybe.nothing()
    : maybe.of(value));
});
maybe.empty = (function() {
    return maybe.nothing();
});
maybe.zero = (function() {
    return maybe.nothing();
});
maybe.prototype.toString = (function() {
    return this.match({
    nothing: (function() {
          
      return "(maybe.nothing)";
    }),
    just: (function(value) {
          
      return ("(maybe.just " + show(value) + ")");
    })
  });
});
maybe.prototype.equals = (function(tMaybe) {
    (function() {
    if (!(maybe.is(tMaybe))) {
      return (function() {
        throw (new Error(("" + "(maybe.equals)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    nothing: (function() {
          
      return tMaybe.match({
        nothing: (function() {
                  
          return true;
        }),
        just: (function() {
                  
          return false;
        })
      });
    }),
    just: (function(value) {
          
      return tMaybe.match({
        nothing: (function() {
                  
          return false;
        }),
        just: (function(tValue) {
                  
          return (function() {
            if (typeof value.equals === "function") {
              return value.equals(tValue);
            } else {
              return value === tValue;
            }
          }).call(this);
        })
      });
    })
  });
});
maybe.prototype.concat = (function(tMaybe) {
    (function() {
    if (!(maybe.is(tMaybe))) {
      return (function() {
        throw (new Error(("" + "(maybe.concat)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return tMaybe.match({
        nothing: (function() {
                  
          return tMaybe;
        }),
        just: (function(tValue) {
                  
          return (function(cnt) {
                      
            (function() {
              if (!(typeof cnt === "function")) {
                return (function() {
                  throw (new Error(("" + "(maybe.concat) can only concat when both of the carried values implement the semigroup typeclass")))
                }).call(this);
              }
            }).call(this);
            return cnt.call(value, tValue);
          })(value.concat);
        })
      });
    })
  });
});
maybe.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return maybe.lift(mapper(value));
    })
  }));
});
maybe.prototype.ap = (function(tMaybe) {
    (function() {
    if (!(maybe.is(tMaybe))) {
      return (function() {
        throw (new Error(("" + "(maybe.ap)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return tMaybe.map(value);
    })
  });
});
maybe.prototype.flatMap = (function(toMaybeMapper) {
    return (!(typeof toMaybeMapper === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.flat-map|maybe.chain)" + _eArg1_ + "function, got " + show(toMaybeMapper))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return maybe.nothing();
    }),
    just: (function(value) {
          
      return toMaybeMapper(value);
    })
  }));
});
maybe.prototype.chain = maybe.prototype.flatMap;
maybe.prototype.bimap = (function(transformNothing, transformJust) {
    return (!(typeof transformNothing === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.bimap)" + _eArg1_ + "function, got " + show(transformNothing))))
  }).call(this)
    : !(typeof transformJust === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.bimap)" + _eArg2_ + "function, got " + show(transformJust))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return transformNothing();
    }),
    just: (function(value) {
          
      return transformJust(value);
    })
  }));
});
maybe.prototype.alt = (function(tMaybe) {
    return (!(maybe.is(tMaybe))
    ? (function() {
    throw (new Error(("" + "(maybe.alt)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return tMaybe;
    }),
    just: (function(value) {
          
      return maybe.just(value);
    })
  }));
});
maybe.prototype.reduce = (function(reducer, seed) {
    return (!(typeof reducer === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.reduce)" + _eArg1_ + "function, got " + show(reducer))))
  }).call(this)
    : !(typeof seed !== "undefined")
    ? (function() {
    throw (new Error(("" + "(maybe.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
  }).call(this)
    : this.match({
    nothing: (function() {
          
      return seed;
    }),
    just: (function(value) {
          
      return reducer(seed, value);
    })
  }));
});
maybe.prototype.traverse = (function(lift, transformer) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.traverse)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : not
    ? typeof transformer === "function"
    : this.match({
    nothing: (function() {
          
      return lift(maybe.nothing());
    }),
    just: (function(value) {
          
      return transformer(value).map(maybe.of);
    })
  }));
});
maybe.prototype.sequence = (function(lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(maybe.sequence)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : this.traverse(lift, identity));
});
export const either = (function() {
    const sumtype$2 = Object.create(null);
  sumtype$2.prototype = { __sibilispType__: sumtype$2 };
  sumtype$2.left = function left(error) {
    let self$5 = Object.create(sumtype$2.prototype);
    let argCount$5 = arguments.length;
    (function() {
      if (!(argCount$5 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + either + "." + left + "expects " + 1 + " arguments but got " + argCount$5)))
        }).call(this);
      }
    }).call(this);
    self$5.error = error;
    self$5.constructor = left;
    self$5.__sibilispTags__ = [ "error" ];
    return self$5;
  };;
  sumtype$2.right = function right(value) {
    let self$6 = Object.create(sumtype$2.prototype);
    let argCount$6 = arguments.length;
    (function() {
      if (!(argCount$6 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + either + "." + right + "expects " + 1 + " arguments but got " + argCount$6)))
        }).call(this);
      }
    }).call(this);
    self$6.value = value;
    self$6.constructor = right;
    self$6.__sibilispTags__ = [ "value" ];
    return self$6;
  };;
  sumtype$2.prototype.match = (function(ctors) {
      
    let self = this,
        name = self.constructor.name,
        ctor = ctors[name],
        keys = self.__sibilispTags__;
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error(("" + ".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$2.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$2);
  });
  return sumtype$2;
}).call(this);
either.of = (function(value) {
    return either.right(value);
});
either.lift = (function(value) {
    return (!(!(value == null))
    ? either.left((new Error(("" + ""))))
    : either.of(value));
});
either.empty = (function() {
    return either.right([]);
});
either.zero = (function() {
    return either.left((new Error(("" + "either-zero"))));
});
either.prototype.toString = (function() {
    return this.match({
    left: (function(error) {
          
      return ("(either.left " + show(error) + ")");
    }),
    right: (function(value) {
          
      return ("(either.right " + show(value) + ")");
    })
  });
});
either.prototype.equals = (function(tEither) {
    return (!(either.is(tEither))
    ? (function() {
    throw (new Error(("" + "(either.equals)" + _eArg1_ + "instance of either, got " + show(tEither))))
  }).call(this)
    : this.match({
    left: (function() {
          
      return tEither.match({
        left: (function() {
                  
          return true;
        }),
        right: (function() {
                  
          return false;
        })
      });
    }),
    right: (function(value) {
          
      return tEither.match({
        left: (function() {
                  
          return false;
        }),
        right: (function(tValue) {
                  
          return (typeof value.equals === "function") ? value.equals(tValue) : value === tValue;
        })
      });
    })
  }));
});
either.prototype.concat = (function(tEither) {
    return (!(either.is(tEither))
    ? (function() {
    throw (new Error(("" + "(either.concat)" + _eArg1_ + "either, got " + show(tEither))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return tEither.match({
        left: (function() {
                  
          return tEither;
        }),
        right: (function(tValue) {
                  
          return (function(cnt) {
                      
            (function() {
              if (!(typeof cnt === "function")) {
                return (function() {
                  throw (new Error(("" + "(either.concat) cannot concat when both of the carried values implement the semigroup typeclass")))
                }).call(this);
              }
            }).call(this);
            return cnt.call(value, tValue);
          })(value.concat);
        })
      });
    })
  }));
});
either.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(either.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return either.lift(mapper(value));
    })
  }));
});
either.prototype.ap = (function(tEither) {
    (function() {
    if (!(either.is(tEither))) {
      return (function() {
        throw (new Error(("" + "(either.ap)" + _eArg1_ + "instance of either, got " + show(tEither))))
      }).call(this);
    }
  }).call(this);
  return this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return tEither.map(value);
    })
  });
});
either.prototype.flatMap = (function(toEitherMapper) {
    return (!(typeof toEitherMapper === "function")
    ? (function() {
    throw (new Error(("" + "(either.flat-map|either.chain)" + _eArg1_ + "function, got " + show(toEitherMapper))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return either.left(error);
    }),
    right: (function(value) {
          
      return toEitherMapper(value);
    })
  }));
});
either.prototype.chain = either.prototype.flatMap;
either.prototype.bimap = (function(transformLeft, transformRight) {
    return (!(typeof transformLeft === "function")
    ? (function() {
    throw (new Error(("" + "(either.bimap)" + _eArg1_ + "function, got " + show(transformLeft))))
  }).call(this)
    : !(typeof transformRight === "function")
    ? (function() {
    throw (new Error(("" + "(either.bimap)" + _eArg2_ + "function, got " + show(transformRight))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return transformLeft(error);
    }),
    right: (function(value) {
          
      return transformRight(value);
    })
  }));
});
either.prototype.alt = (function(tEither) {
    return (!(either.is(tEither))
    ? (function() {
    throw (new Error(("" + "(either.alt)" + _eArg1_ + "instance of either, got " + show(tEither))))
  }).call(this)
    : this.match({
    left: (function() {
          
      return tEither;
    }),
    right: (function(value) {
          
      return either.right(value);
    })
  }));
});
either.prototype.reduce = (function(reducer, seed) {
    return (!(typeof reducer === "function")
    ? (function() {
    throw (new Error(("" + "(either.reduce)" + _eArg1_ + "function, got " + show(reducer))))
  }).call(this)
    : !(typeof seed !== "undefined")
    ? (function() {
    throw (new Error(("" + "(either.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
  }).call(this)
    : this.match({
    left: (function() {
          
      return seed;
    }),
    right: (function(value) {
          
      return reducer(seed, value);
    })
  }));
});
either.prototype.traverse = (function(lift, transformer) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(either.traverse)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : !(typeof transformer === "function")
    ? (function() {
    throw (new Error(("" + "(either.traverse)" + _eArg2_ + "function, got " + show(transformer))))
  }).call(this)
    : this.match({
    left: (function(error) {
          
      return lift(either.left(error));
    }),
    right: (function(value) {
          
      return transformer(value).map(either.of);
    })
  }));
});
either.prototype.sequence = (function(lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("" + "(either.sequence)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : this.traverse(lift, identity));
});
export const proof = (function() {
    const sumtype$3 = Object.create(null);
  sumtype$3.prototype = { __sibilispType__: sumtype$3 };
  sumtype$3.falsy = function falsy(errors) {
    let self$7 = Object.create(sumtype$3.prototype);
    let argCount$7 = arguments.length;
    (function() {
      if (!(argCount$7 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + proof + "." + falsy + "expects " + 1 + " arguments but got " + argCount$7)))
        }).call(this);
      }
    }).call(this);
    self$7.errors = errors;
    self$7.constructor = falsy;
    self$7.__sibilispTags__ = [ "errors" ];
    return self$7;
  };;
  sumtype$3.truthy = function truthy(value) {
    let self$8 = Object.create(sumtype$3.prototype);
    let argCount$8 = arguments.length;
    (function() {
      if (!(argCount$8 === 1)) {
        return (function() {
          throw (new Error(("" + "Tagged constructor " + proof + "." + truthy + "expects " + 1 + " arguments but got " + argCount$8)))
        }).call(this);
      }
    }).call(this);
    self$8.value = value;
    self$8.constructor = truthy;
    self$8.__sibilispTags__ = [ "value" ];
    return self$8;
  };;
  sumtype$3.prototype.match = (function(ctors) {
      
    let self = this,
        name = self.constructor.name,
        ctor = ctors[name],
        keys = self.__sibilispTags__;
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error(("" + ".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$3.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$3);
  });
  return sumtype$3;
}).call(this);
proof.of = (function(value) {
    return proof.truthy(value);
});
proof.lift = (function(value) {
    return ((null == value || Number.isNaN(value))
    ? proof.falsy([ (new Error(("" + _eNoValue_))) ])
    : Error.prototype.isPrototypeOf(value)
    ? proof.falsy([ value ])
    : proof.truthy(value));
});
proof.empty = (function() {
    return proof.truthy(true);
});
proof.zero = (function() {
    return proof.falsy([ (new Error(("" + "ProofZero"))) ]);
});
proof.prototype.equals = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.equals)" + _eArg1_ + "instance of proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return tProof.match({
        truthy: (function(tValue) {
                  
          return equals(value, tValue);
        }),
        falsy: (function() {
                  
          return false;
        })
      });
    }),
    falsy: (function(errors) {
          
      return tProof.match({
        truthy: (function() {
                  
          return false;
        }),
        falsy: (function(tErrors) {
                  
          return errors.every((function(e, i) {
                      
            return equals(e, tErrors[i]);
          }));
        })
      });
    })
  }));
});
proof.prototype.concat = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.concat)" + _eArg1_ + "proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return tProof.match({
        truthy: (function(tValue) {
                  
          return proof.truthy(tValue);
        }),
        falsy: (function(errors) {
                  
          return proof.falsy(errors);
        })
      });
    }),
    falsy: (function(errors) {
          
      return tProof.match({
        truthy: (function() {
                  
          return proof.falsy(errors);
        }),
        falsy: (function(tErrors) {
                  
          return proof.falsy(errors.concat(tErrors));
        })
      });
    })
  }));
});
proof.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(proof.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return proof.lift(mapper(value));
    }),
    falsy: (function(errors) {
          
      return proof.falsy(errors);
    })
  }));
});
proof.prototype.bimap = (function(lhsMapper, rhsMapper) {
    return (!(typeof lhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(proof.bimap)" + _eArg1_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(proof.bimap)" + _eArg2_ + "function, got " + show(rhsMapper))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return proof.lift(rhsMapper(value));
    }),
    falsy: (function(errors) {
          
      return proof.falsy(errors.map(lhsMapper));
    })
  }));
});
proof.prototype.ap = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.ap)" + _eArg1_ + "proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return tProof.match({
        truthy: (function(tValue) {
                  
          return proof.lift(value(tValue));
        }),
        falsy: (function(tErrors) {
                  
          return proof.falsy(tErrors);
        })
      });
    }),
    falsy: (function(errors) {
          
      return tProof.match({
        truthy: (function() {
                  
          return proof.falsy(errors);
        }),
        falsy: (function(tErrors) {
                  
          return proof.falsy(errors.concat(tErrors));
        })
      });
    })
  }));
});
proof.prototype.alt = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("" + "(proof.alt)" + _eArg1_ + "proof, got " + show(tProof))))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return proof.truthy(value);
    }),
    falsy: (function() {
          
      return tProof;
    })
  }));
});
export const task = (function() {
    function type$3(runTask) {
    let self$9 = Object.create(type$3.prototype);
    let argCount$9 = arguments.length;
    (function() {
      if (!(argCount$9 === 1)) {
        return (function() {
          throw (new Error(("" + "task" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$9.runTask = runTask;
    return self$9;
  };
  type$3.is = (function(x$3) {
      
    return x$3 instanceof type$3;
  });
  return type$3;
}).call(this);
task.of = (function(value) {
    return task((function(fail, ok) {
      
    return ok(value);
  }));
});
task.zero = (function(value) {
    return task((function(fail) {
      
    return fail((Error.prototype.isPrototypeOf(value)) ? value : (new Error(("" + "TaskZero" + value))));
  }));
});
task.lift = (function(value) {
    return task((function(fail, ok) {
      
    return (((null == value || Number.isNaN(value)) || Error.prototype.isPrototypeOf(value))
      ? fail(value)
      : ok(value));
  }));
});
task.empty = (function() {
    return task((function(fail, ok) {
      
    
  }));
});
task.resolve = task.of;
task.reject = task.zero;
task.prototype.concat = (function(tTask) {
    return (!(tTask instanceof task)
    ? (function() {
    throw (new Error(("" + "(task.concat)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return (function(done, guard) {
              
        runSelf(guard(fail), guard(ok));
        return runThat(guard(fail), guard(ok));
      })(false, (function(f) {
              
        return (function(g) {
                  
          return (function() {
            if (!(done)) {
              done = true;
              return f(g);
            }
          }).call(this);
        });
      }));
    }));
  })(this.runTask, tTask.runTask));
});
task.prototype.ap = (function(tTask) {
    return (!(tTask instanceof task)
    ? (function() {
    throw (new Error(("" + "(task.ap)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return (function(adone, bdone, aval, bval, rejected, rej, res) {
              
        runSelf(rej, res((function(a) {
                  
          adone = true;
          return aval = a;
        })));
        return runThat(rej, res((function(b) {
                  
          bdone = true;
          return bval = b;
        })));
      })(false, false, false, false, false, (function(v) {
              
        return (function() {
          if (!(rejected)) {
            rejected = true;
            return fail(v);
          }
        }).call(this);
      }), (function(f) {
              
        return (function(v) {
                  
          return (function() {
            if (!(rejected)) {
              f(v);
              return (function() {
                if ((adone && bdone)) {
                  return ok(aval(bval));
                } else {
                  return v;
                }
              }).call(this);
            }
          }).call(this);
        });
      }));
    }));
  })(this.runTask, tTask.runTask));
});
task.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.map)" + _eArg1_ + "function, got " + show(mapper))))
  }).call(this)
    : (function(run) {
      
    return task((function(fail, ok) {
          
      return run(fail, (function(value) {
              
        return ok(mapper(value));
      }));
    }));
  })(this.runTask));
});
task.prototype.flatMap = (function(toTaskMapper) {
    return (!(typeof toTaskMapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.flat-map)" + _eArg1_ + "function, got " + show(toTaskMapper))))
  }).call(this)
    : (function(run) {
      
    return task((function(fail, ok) {
          
      return run(fail, (function(value) {
              
        return toTaskMapper(value).runTask(fail, ok);
      }));
    }));
  })(this.runTask));
});
task.prototype.chain = task.prototype.flatMap;
task.prototype.bimap = (function(lhsMapper, rhsMapper) {
    return (!(typeof lhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.bimap)" + _eArg1_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("" + "(task.bimap)" + _eArg2_ + "function, got " + show(rhsMapper))))
  }).call(this)
    : (function(run) {
      
    return task((function(fail, ok) {
          
      return run((function(exc) {
              
        return fail(lhsMapper(exc));
      }), (function(value) {
              
        return ok(rhsMapper(value));
      }));
    }));
  })(this.runTask));
});
task.prototype.alt = (function(tTask) {
    return (!(instanceOf(tTask, task))
    ? (function() {
    throw (new Error(("" + "(task.alt)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return runSelf((function() {
              
        return runThat(fail, ok);
      }), ok);
    }));
  })(this.runTask, tTask.runTask));
});