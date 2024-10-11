// prelude;
const _eNoValue_ = "E_NO_VALUE";
const _eGuard_ = " guards agains (nil) and (void) values, got ";
const _eArg1_ = " expects argument 1 to be a ";
const _eArg2_ = " expects argument 2 to be a ";
const _eArg3_ = " expects argument 3 to be a ";
export let identity = (function(a) {
    return a;
});
export let constantly = (function(a) {
    return (function() {
      
    return a;
  });
});
export let listOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("(list-of?)" + _eArg2_ + "function, got " + predicate)))
  }).call(this)
    : (Array.isArray(x) && x.every(predicate)));
});
export let hashOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("(hash-of?)" + _eArg2_ + "function, got " + predicate)))
  }).call(this)
    : ((!(null == x) && x.constructor === Object) && Object.entries(x).every((function(v$1) {
      
    var _ = v$1[0],
        v = v$1[1];
  
    return predicate(v);
  }))));
});
export let dictOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("(dict-of?)" + _eArg2_ + "function, got " + predicate)))
  }).call(this)
    : ((!(null == x) && x.constructor === Map) && x.entries().every((function(v$2) {
      
    var _ = v$2[0],
        v = v$2[1];
  
    return predicate(v);
  }))));
});
export let msetOf__QUERY = (function(x, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("(mset-of?)" + _eArg2_ + "function, got " + predicate)))
  }).call(this)
    : ((!(null == x) && x.constructor === Set) && x.entries().every((function(v$3) {
      
    var _ = v$3[0],
        v = v$3[1];
  
    return predicate(v);
  }))));
});
export let converge = (function(combine, branches) {
    return (!(typeof combine === "function")
    ? (function() {
    throw (new Error(("(converge)" + _eArg1_ + "function, got " + combine)))
  }).call(this)
    : !(listOf__QUERY(branches, (function(v) {
      
    return typeof v === "function";
  })))
    ? (function() {
    throw (new Error(("(converge)" + _eArg2_ + "list of functions, got " + branches)))
  }).call(this)
    : (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return combine.apply(null, branches.map((function(branch, i) {
          
      return branch.apply(null, args);
    })));
  }));
});
export let memoize = (function(compute) {
    return (!(typeof compute === "function")
    ? (function() {
    throw (new Error(("(memoize)" + _eArg1_ + "function, got " + compute)))
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
export let show = (function(x) {
    return (null == x
    ? "(nil)"
    : Number.isNaN(x)
    ? "(nan)"
    : Error.prototype.isPrototypeOf(x)
    ? ("(error " + x.name + ": " + x.message + ")")
    : typeof x === "string"
    ? ("(string \"" + x + "\")")
    : (typeof x === "number" && !(Number.isNaN(x)))
    ? ("(number " + x + ")")
    : typeof x === "function"
    ? ("(function " + (x.name || "lambda") + ")")
    : (!(null == x) && x.constructor === (function * (){}).constructor)
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
    : typeof x.toString === "function"
    ? x.toString()
    : ("(" + x.constructor.name + ")"));
});
export let equals = (function(x, y) {
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
    : ((!(null == x) && x.constructor === (function * (){}).constructor) && (!(null == y) && y.constructor === (function * (){}).constructor))
    ? x === y
    : ((!(null == x) && x.constructor === Promise) && (!(null == y) && y.constructor === Promise))
    ? x === y
    : (Array.isArray(x) && Array.isArray(y))
    ? (((x.size || x.length) || 0) === ((y.size || y.length) || 0) && x.every((function(va, i) {
      
    return equals(va, y[i]);
  })))
    : ((!(null == x) && x.constructor === Set) && (!(null == y) && y.constructor === Set))
    ? (x.size() === y.size() && equals(Array.from(x), Array.from(y)))
    : ((!(null == x) && x.constructor === Object) && (!(null == y) && y.constructor === Object))
    ? (function(pa, pb) {
      
    return (((pa.size || pa.length) || 0) === ((pb.size || pb.length) || 0) && pa.every((function(k_v$3) {
          
      var k = k_v$3[0],
          v = k_v$3[1];
    
      return equals(v, y[k]);
    })));
  })(Object.entries(x), Object.entries(y))
    : ((!(null == x) && x.constructor === Map) && (!(null == y) && y.constructor === Map))
    ? (function(pa, pb) {
      
    return (((pa.size || pa.length) || 0) === ((pb.size || pb.length) || 0) && pa.every((function(k_v$4) {
          
      var k = k_v$4[0],
          v = k_v$4[1];
    
      return equals(v, y.get(k));
    })));
  })(Array.from(x.entries()), Array.from(y.entries()))
    : typeof x.equals === "function"
    ? x.equals(y)
    : false);
});
export let concatenate = (function(x, y) {
    return ((!(!(x == null)) || !(!(y == null)))
    ? (function() {
    throw (new Error(("(concatenate) cannot concatenate with a (void) or (nil) value")))
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
    : ((!(null == x) && x.constructor === Object) && (!(null == y) && y.constructor === Object))
    ? Object.assign({  }, x, y)
    : ((!(null == x) && x.constructor === Set) && (!(null == y) && y.constructor === Set))
    ? (function() {
      
    xy.forEach((function(mset$1) {
          
      return mset$1.forEach((function(msetVal$1) {
              
        return (new Set([])).add(msetVal$1);
      }));
    }));
    return (new Set([]));
  }).call(this)
    : ((!(null == x) && x.constructor === Map) && (!(null == y) && y.constructor === Map))
    ? (function() {
        values.forEach((function(dict$1) {
            return dict$1.forEach((function(dictVal$1, dictKey$1) {
                return (new Map([])).set(dictKey$1, dictVal$1);
      }));
    }));
    return (new Map([]));
  }).call(this)
    : ((!(null == x) && x.constructor === Promise) && (!(null == y) && y.constructor === Promise))
    ? Promise.all([ x, y ])
    : typeof x.concat === "function"
    ? x.concat(y)
    : (function() {
    throw (new Error(("(concatenate) needs both arguments to be in the same semigroup")))
  }).call(this));
});
export let map = (function(x, mapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(map)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof mapper === "function")
    ? (function() {
    throw (new Error(("(map)" + _eArg1_ + "function, got " + show(mapper))))
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
    throw (new Error(("(map) needs the value to be a Functor")))
  }).call(this));
});
export let ap = (function(x, applicable) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(ap)" + _eGuard_ + show(x))))
  }).call(this)
    : !((!(applicable == null) || typeof applicable === "function" || typeof applicable.ap === "function" || Array.isArray(applicable) || (!(null == applicable) && applicable.constructor === Set)))
    ? (function() {
    throw (new Error(("(ap)" + _eArg2_ + "Apply, got " + show(applicable))))
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
    : ((!(null == x) && x.constructor === Object) && (!(null == applicable) && applicable.constructor === Object))
    ? (function(f) {
      
    return Object.entries(x).reduce((function(a, k_v$7) {
          
      var k = k_v$7[0],
          v = k_v$7[1];
    
      return f.reduce((function(r, l_f$1) {
              
        var l = l_f$1[0],
            f = l_f$1[1];
      
        return (function() {
          if (k === l) {
            r[k] = f(v);
            return r;
          } else {
            r[k] = v;
            return r;
          }
        }).call(this);
      }), a);
    }), Object.create(null));
  })(Object.entries(applicable))
    : ((!(null == x) && x.constructor === Map) && (!(null == applicable) && applicable.constructor === Map))
    ? (function(f) {
      
    return Array.from(x.entries()).reduce((function(a, k_v$8) {
          
      var k = k_v$8[0],
          v = k_v$8[1];
    
      return f.reduce((function(r, l_f$2) {
              
        var l = l_f$2[0],
            f = l_f$2[1];
      
        return (function() {
          if (k === l) {
            return r.set(k, f(v));
          } else {
            return r.set(k, v);
          }
        }).call(this);
      }), a);
    }), (new Map([])));
  })(Array.from(applicable.entries()))
    : (function() {
    throw (new Error(("(ap) needs the value to be a Functor")))
  }).call(this));
});
export let flatMap = (function(x, chainMapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(flat-map|chain)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof chainMapper === "function")
    ? (function() {
    throw (new Error(("(flat-map|chain)" + _eArg2_ + "function, got " + show(chainMapper))))
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
    : typeof x.chain === "function"
    ? x.chain(chainMapper)
    : Array.isArray(x)
    ? x.reduce((function(ls, v) {
      
    return ls.concat(v);
  }), [])
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    x.forEach((function(v) {
          
      return y = (function() {
              
        chainMapper(v).forEach((function(mset$2) {
                  
          return mset$2.forEach((function(msetVal$2) {
                      
            return y.add(msetVal$2);
          }));
        }));
        return y;
      }).call(this);
    }));
    return y;
  })((new Set([])))
    : (function() {
    throw (new Error(("(flat-map|chain) needs the value to be a Chain")))
  }).call(this));
});
export const chain = flatMap;
export let bimap = (function(x, lhsMapper, rhsMapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(bimap)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof lhsMapper === "function")
    ? (function() {
    throw (new Error(("(bimap)" + _eArg2_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("(bimap)" + _eArg3_ + "function, got " + show(rhsMapper))))
  }).call(this)
    : (!(null == x) && x.constructor === Promise)
    ? x.then(rhsMapper, (function() {
      
    return Promise.resolve(lhsMapper());
  }))
    : Array.isArray(x)
    ? (((x.size || x.length) || 0) < 1) ? [ lhsMapper() ] : x.map(rhsMapper)
    : (!(null == x) && x.constructor === Set)
    ? (x.size < 1) ? (new Set([ lhsMapper() ])) : (new Set(Array.from(x).map(rhsMapper)))
    : typeof x.bimap === "function"
    ? x.bimap(lhsMapper, rhsMapper)
    : (function() {
    throw (new Error(("(bimap) needs the first argument to be a BiFunctor")))
  }).call(this));
});
export let contramap = (function(x, lhsMapper) {
    return bimap(x, lhsMapper, identity);
});
export let promap = (function(x, preMapper, postMapper) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(promap)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof preMapper === "function")
    ? (function() {
    throw (new Error(("(promap)" + _eArg2_ + "function, got " + show(preMapper))))
  }).call(this)
    : !(typeof postMapper === "function")
    ? (function() {
    throw (new Error(("(promap)" + _eArg3_ + "function, got " + show(postMapper))))
  }).call(this)
    : typeof x === "function"
    ? (function(args) {
      
    var args = Array.prototype.slice.call(arguments, 0);
  
    return postMapper(x(preMapper.apply(null, args)));
  })
    : typeof x.promap === "function"
    ? x.promap(preMapper, postMapper)
    : (function() {
    throw (new Error(("(promap) needs the first argument to be a ProFunctor")))
  }).call(this));
});
export let reduce = (function(x, reducer, seed) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(reduce)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof reducer === "function")
    ? (function() {
    throw (new Error(("(reduce)" + _eArg2_ + "function, got " + show(reducer))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce(reducer, seed);
  })(Array.from(x.values()))
    : typeof x.reduce === "function"
    ? x.reduce(reducer, seed)
    : (function() {
    throw (new Error(("(reduce) needs the first argument to be a Foldable")))
  }).call(this));
});
export let foldMap = (function(x, liftMap) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(reduce)" + _eGuard_ + show(x))))
  }).call(this)
    : !(typeof liftMap === "function")
    ? (function() {
    throw (new Error(("(fold-map)" + _eArg2_ + "function, got " + show(liftMap))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return (a === null) ? liftMap(value) : a.concat(liftMap(value));
    }), null);
  })(Array.from(x.values()))
    : typeof x.foldMap === "function"
    ? x.foldMap(liftMap)
    : typeof x.reduce === "function"
    ? x.reduce((function(a, value) {
      
    return (a === null) ? liftMap(value) : a.concat(liftMap(value));
  }), null)
    : (function() {
    throw (new Error(("(fold-map) needs the first argument to be a Foldable")))
  }).call(this));
});
export let fold = (function(x, lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("(fold)" + _eArg2_ + "function, got " + show(lift))))
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
    throw (new Error(("(fold) needs the first argument to be a Foldable")))
  }).call(this));
});
export let traverse = (function(x, lift, transformer) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(traverse)" + _eArg1_ + "Traversable, got " + show(x))))
  }).call(this)
    : !(typeof lift === "function")
    ? (function() {
    throw (new Error(("(traverse)" + _eArg2_ + "function, got " + show(lift))))
  }).call(this)
    : !(typeof transformer === "function")
    ? (function() {
    throw (new Error(("(traverse)" + _eArg3_ + "function, got " + show(transformer))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return transformer(value).map((function(x) {
              
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
      
    return transformer(value).map((function(x) {
          
      return (function(y) {
              
        return y.concat(x);
      });
    })).ap(a);
  }), lift([]))
    : typeof x.traverse === "function"
    ? x.traverse(lift, transformer)
    : (function() {
    throw (new Error(("(traverse) needs the first argument to be a Traversable")))
  }).call(this));
});
export let sequence = (function(x, lift) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(sequence)" + _eArg1_ + "Traversable, got " + show(x))))
  }).call(this)
    : !(typeof lift === "function")
    ? (function() {
    throw (new Error(("(sequence)" + _eArg2_ + "function, got " + show(lift))))
  }).call(this)
    : (!(null == x) && x.constructor === Set)
    ? (function(y) {
      
    return y.reduce((function(a, value) {
          
      return value.map((function(x) {
              
        return (function(y) {
                  
          return (function() {
                      
            x.forEach((function(mset$4) {
                          
              return mset$4.forEach((function(msetVal$4) {
                              
                return y.add(msetVal$4);
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
    throw (new Error(("(sequence) needs the first argument to be a Traversable")))
  }).call(this));
});
export let alt = (function(x, altern) {
    return (!(!(x == null))
    ? (function() {
    throw (new Error(("(alt)" + _eArg1_ + "Alternative, got " + show(x))))
  }).call(this)
    : !(!(altern == null))
    ? (function() {
    throw (new Error(("(alt)" + _eArg2_ + "Alternative, got " + show(altern))))
  }).call(this)
    : ((!(null == x) && x.constructor === Set) && (!(null == altern) && altern.constructor === Set))
    ? (function(l) {
      
    return (l < 1) ? altern : x;
  })(x.size)
    : (Array.isArray(x) && Array.isArray(altern))
    ? (function(l) {
      
    return (l < 1) ? altern : x;
  })(((x.size || x.length) || 0))
    : typeof x.alt === "function"
    ? x.alt(altern)
    : (function() {
    throw (new Error(("(alt) expects both arguments to be Alternatives")))
  }).call(this));
});
export let clone = (function(x) {
    return ((typeof x === "string" || (typeof x === "number" && !(Number.isNaN(x))) || typeof x === "function" || (typeof x === "boolean") || (null == x || Number.isNaN(x)))
    ? x
    : Array.isArray(x)
    ? x.map((function(y) {
      
    return clone(y);
  }))
    : (!(null == x) && x.constructor === Set)
    ? (new Set(Array.from(x).map((function(y) {
      
    return clone(y);
  }))))
    : (!(null == x) && x.constructor === Object)
    ? Object.entries(x).reduce((function(a, k_v$9) {
      
    var k = k_v$9[0],
        v = k_v$9[1];
  
    a[k] = clone(v);
    return a;
  }), Object.create(null))
    : (!(null == x) && x.constructor === Map)
    ? Array.from(x.entries()).reduce((function(a, k_v$10) {
      
    var k = k_v$10[0],
        v = k_v$10[1];
  
    return a.set(k, clone(v));
  }), (new Map([])))
    : (!(null == x) && x.constructor === Date)
    ? (new Date(Number(x)))
    : (!(null == x) && x.constructor === RegExp)
    ? (new RegExp(x.source, x.flags))
    : typeof x.clone === "function"
    ? x.clone()
    : (function() {
    throw (new Error(("(clone) doesn't know how to clone " + show(x))))
  }).call(this));
});
export let zip = (function(lsA, lsB) {
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
  })(Math.min(((lsA.size || lsA.length) || 0), ((lsB.size || lsB.length) || 0)), 0, [])
    : ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))
    ? (function() {
      
    let a = Array.from(lsA);
    let b = Array.from(lsB);
    let l = Math.min(((a.size || a.length) || 0), ((b.size || b.length) || 0));
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
    throw (new Error(("(zip) expects both arguments to be a list or mset")))
  }).call(this));
});
export let unzip = (function(ls) {
    return ((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set))
    ? (function(ks, vs) {
      
    ls.forEach((function(k_v$11) {
          
      var k = k_v$11[0],
          v = k_v$11[1];
    
      ks.push(k);
      return vs.push(v);
    }));
    return [ ks, vs ];
  })([], [])
    : (function() {
    throw (new Error(("(unzip) expects the argument to be a list or mset")))
  }).call(this));
});
export let find = (function(ls, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("(find)" + _eArg2_ + "function, got " + show(predicate))))
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
  })(((ls.size || ls.length) || 0), 0, null)
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
  })(Array.from(ls), ((x.size || x.length) || 0), 0, null)
    : (function() {
    throw (new Error(("(find) expects the first argument to be a list or mset")))
  }).call(this));
});
export let filter = (function(ls, predicate) {
    return (!(typeof predicate === "function")
    ? (function() {
    throw (new Error(("(filter)" + _eArg2_ + "function, got " + show(predicate))))
  }).call(this)
    : Array.isArray(ls)
    ? ls.filter(predicate)
    : (!(null == ls) && ls.constructor === Set)
    ? (function(x) {
      
    return (new Set([ ls.filter(predicate) ]));
  })(Array.from(ls))
    : (function() {
    throw (new Error(("(filter) expects the first argument to be a list or mset")))
  }).call(this));
});
export const select = filter;
export let reject = (function(ls, predicate) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(reject) expects the first argument to be a list or mset")))
  }).call(this)
    : !(typeof predicate === "function")
    ? (function() {
    throw (new Error(("(reject)" + _eArg2_ + "function, got " + show(predicate))))
  }).call(this)
    : filter(ls, (function(x) {
      
    return !(predicate(x));
  })));
});
export let unique = (function(ls) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(unique)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : Array.isArray(ls)
    ? Array.from((new Set(ls)))
    : ls);
});
export let union = (function(lsA, lsB) {
    return (!(((Array.isArray(lsA) && Array.isArray(lsB)) || ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))))
    ? (function() {
    throw (new Error(("(union) expects the arguments to both be lists or msets")))
  }).call(this)
    : (Array.isArray(lsA) && Array.isArray(lsB))
    ? (function(ab) {
      
    return Array.from((new Set(ab)));
  })(lsA.concat(lsB))
    : (new Set(Array.from(lsA).concat(Array.from(lsB)))));
});
export let intersection = (function(lsA, lsB) {
    return (!(((Array.isArray(lsA) && Array.isArray(lsB)) || ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))))
    ? (function() {
    throw (new Error(("(intersection) expects the arguments to both be lists or msets")))
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
export let difference = (function(lsA, lsB) {
    return (!(((Array.isArray(lsA) && Array.isArray(lsB)) || ((!(null == lsA) && lsA.constructor === Set) && (!(null == lsB) && lsB.constructor === Set))))
    ? (function() {
    throw (new Error(("(difference) expects the arguments to both be lists or msets")))
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
export let take = (function(ls, count) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(take)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !((typeof count === "number" && !(Number.isNaN(count))))
    ? (function() {
    throw (new Error(("(take)" + _eArg2_ + "number, got " + show(count))))
  }).call(this)
    : Array.isArray(ls)
    ? (count <= ((ls.size || ls.length) || 0)) ? ls.slice(0, count) : ls
    : (count <= ls.size) ? (function() {
      
    let xs = Array.from(ls);
    let ys = xs.slice(0, count);
    return (function() {
          
      return (new Set(ys));
    })();
  }).call(this) : ls);
});
export let drop = (function(ls, count) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(drop)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !((typeof count === "number" && !(Number.isNaN(count))))
    ? (function() {
    throw (new Error(("(drop)" + _eArg2_ + "number, got " + show(count))))
  }).call(this)
    : Array.isArray(ls)
    ? (count <= ((ls.size || ls.length) || 0)) ? ls.slice(count) : []
    : (count <= ls.size) ? (function() {
      
    let xs = Array.from(ls);
    let ys = xs.slice(count);
    return (function() {
          
      return (new Set(ys));
    })();
  }).call(this) : (new Set([])));
});
export let partition = (function(ls, count) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(partition)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !((typeof count === "number" && !(Number.isNaN(count))))
    ? (function() {
    throw (new Error(("(partition)" + _eArg2_ + "number, got " + show(count))))
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
  })(l(((ls.size || ls.length) || 0)))
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
  })(Array.from(ls), [], 0, ((xs.size || xs.length) || 0)));
});
export let partitionWith = (function(ls, partitioner) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(partition-with)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !(typeof partitioner === "function")
    ? (function() {
    throw (new Error(("(partition-with)" + _eArg2_ + "list or mset, got " + show(ls))))
  }).call(this)
    : Array.isArray(ls)
    ? ls.reduce((function(acc, a) {
      
    return (acc === null
      ? [ [ a ] ]
      : !(partitioner(a))
      ? (function(b) {
          
      b.push(a);
      return acc;
    })(acc[(((acc.size || acc.length) || 0) - 1)])
      : acc.concat([ [ a ] ]));
  }), null)
    : (function(xs) {
      
    return (new Set(xs.reduce((function(acc, x) {
          
      return (acc === null
        ? [ [ x ] ]
        : !(partitioner(a))
        ? (function(b) {
              
        b.push(a);
        return acc;
      })(acc[(((acc.size || acc.length) || 0) - 1)])
        : acc.concat([ [ x ] ]));
    }), null)));
  })(Array.from(ls)));
});
export let groupBy = (function(ls, grouper) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(group-by)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : !(typeof grouper === "function")
    ? (function() {
    throw (new Error(("(group-by)" + _eArg2_ + "function, got " + show(grouper))))
  }).call(this)
    : Array.isArray(ls)
    ? xs.reduce((function(acc, x) {
      
    return (function(k) {
          
      (function() {
        if (!(acc.hasOwnProperty(k))) {
          return acc[k] = [];
        }
      }).call(this);
      acc[k].push(x);
      return acc;
    })(String(grouper(x)));
  }), Object.create(null))
    : (function(xs) {
      
    return xs.reduce((function(acc, x) {
          
      return (function(k) {
              
        (function() {
          if (!(acc.hasOwnProperty(k))) {
            return acc[k] = [];
          }
        }).call(this);
        acc[k].push(x);
        return acc;
      })(String(grouper(x)));
    }), Object.create(null));
  })(Array.from(ls)));
});
export let keep = (function(ls) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(keep)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : Array.isArray(ls)
    ? ls.reduce((function(acc, a) {
      
    return ((!(a == null) && !(Number.isNaN(a)))) ? acc.concat(a) : acc;
  }), [])
    : (function(xs) {
      
    return (new Set(xs.reduce((function(acc, x) {
          
      return ((!(x == null) && !(Number.isNaN(x)))) ? acc.concat(x) : acc;
    }), [])));
  })(Array.from(ls)));
});
export let intersperse = (function(ls, separator) {
    return (!((Array.isArray(ls) || (!(null == ls) && ls.constructor === Set)))
    ? (function() {
    throw (new Error(("(intersperse)" + _eArg1_ + "list or mset, got " + show(ls))))
  }).call(this)
    : (null == separator || Number.isNaN(separator))
    ? (function() {
    throw (new Error(("(intersperse)" + _eArg2_ + "to exist, got " + show(separator))))
  }).call(this)
    : Array.isArray(ls)
    ? ls.reduce((function(acc, x) {
      
    return (((acc.size || acc.length) || 0) < 1) ? acc.concat(x) : acc.concat([ separator, x ]);
  }), [])
    : (function(xs) {
      
    return xs.reduce((function(acc, x) {
          
      return (((acc.size || acc.length) || 0) < 1) ? acc.concat(x) : acc.concat([ separator, x ]);
    }), []);
  })(Array.from(ls)));
});
let lens_ = (function() {
    const sumtype$1 = Object.create(null);
  sumtype$1.prototype = { __sibilispType__: sumtype$1 };
  sumtype$1.lval = function lval(value) {
    const self$1 = Object.create(sumtype$1.prototype);
    const argCount$1 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$1 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + lens_ + "." + lval + "expects " + 1 + " arguments but got " + argCount$1)))
        }).call(this);
      }
    }).call(this);
    self$1.value = value;
    self$1.constructor = lval;
    self$1.__sibilispCtor__ = "lval";
    self$1.__sibilispTags__ = [ "value" ];
    return self$1;
  };;
  sumtype$1.lconst = function lconst(value) {
    const self$2 = Object.create(sumtype$1.prototype);
    const argCount$2 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$2 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + lens_ + "." + lconst + "expects " + 1 + " arguments but got " + argCount$2)))
        }).call(this);
      }
    }).call(this);
    self$2.value = value;
    self$2.constructor = lconst;
    self$2.__sibilispCtor__ = "lconst";
    self$2.__sibilispTags__ = [ "value" ];
    return self$2;
  };;
  sumtype$1.prototype.match = (function(ctors) {
      
    const self = this;
    const name = self.__sibilispCtor__;
    const keys = self.__sibilispTags__;
    const ctor = ctors[name];
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else if (typeof ctors.else === "function") {
        return ctors.else.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error((".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$1.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$1);
  });
  return sumtype$1;
}).call(this);
lens_.prototype.map = (function(f) {
    return this.match({
    lval: (function(v) {
          
      return lens_.lval(f(v));
    }),
    lconst: (function(v) {
          
      return lens_.lconst(v);
    })
  });
});
export let createLens = (function(gets, sets) {
    return (function(k) {
      
    return (function(a, f) {
          
      return map(f(gets(k, a)), (function(b) {
              
        return sets(k, b, a);
      }));
    });
  });
});
createLens.hlens = createLens((function(k, a) {
    return (function(b) {
      
    return (!(b == null)) ? b : null;
  })(a[k]);
}), (function(k, v, a) {
    return (function(b) {
      
    b[k] = v;
    return b;
  })((function() {
    if (Array.isArray(a)) {
      return a.slice();
    } else if ((!(null == a) && a.constructor === Object)) {
      return Object.assign({  }, a);
    }
  }).call(this));
}));
createLens.dlens = createLens((function(k, a) {
    return (a.has(k)) ? a.get(k) : null;
}), (function(k, v, a) {
    return (function(b) {
      
    return b.set(k, v);
  })((function() {
        values.forEach((function(dict$1) {
            return dict$1.forEach((function(dictVal$1, dictKey$1) {
                return (new Map([])).set(dictKey$1, dictVal$1);
      }));
    }));
    return (new Map([]));
  }).call(this));
}));
export let hashLens = (function(keys) {
    var keys = Array.prototype.slice.call(arguments, 0);

  return keys.reduce((function(a, k) {
      
    a[k] = createLens.hlens(k);
    return a;
  }), { nth: createLens.hlens });
});
export let dictLens = (function(keys) {
    var keys = Array.prototype.slice.call(arguments, 0);

  return keys.reduce((function(a, k) {
      
    a[k] = createLens.dlens(k);
    return a;
  }), { nth: createLens.dlens });
});
export let lset = (function(a, l, v) {
    return l(a, (function() {
      
    return lens_.lval(v);
  })).value;
});
export let lget = (function(a, l) {
    return l(a, lens_.lconst).value;
});
export let lmap = (function(a, l, f) {
    return l(a, (function(x) {
      
    return lens_.lval(f(x));
  })).value;
});
export let coyo = (function() {
    function type$1(value, mapper) {
    const self$3 = Object.create(type$1.prototype);
    const argCount$3 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$3 === 2)) {
        return (function() {
          throw (new Error(("coyo" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$3.value = value;
    self$3.mapper = mapper;
    return self$3;
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
    throw (new Error(("(coyo.lift)" + _eGuard_ + value)))
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
    throw (new Error(("(coyo.map)" + _eArg1_ + "function, got " + show(mapper))))
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
      throw (new Error(("(coyo.lower) requires the coyo:mapper property\n" +
      "                   to hold a function, but it holds " + show(mapper))))
    }).call(this)
      : !(!(value == null))
      ? (function() {
      throw (new Error(("(coyo.lower) requires the coyo:value property\n" +
      "                   to hold a non (void) or (nil) value, but it holds " + show(value))))
    }).call(this)
      : !(typeof value.map === "function")
      ? (function() {
      throw (new Error(("(coyo.lower) requires the coyo:value property\n" +
      "                   to implement the functor typeclass but it doesn't")))
    }).call(this)
      : coyo(value.map(mapper), identity));
  })(this.mapper, this.value);
});
coyo.prototype.reduce = (function(reducer, seed) {
    return (function(value, mapper) {
      
    return (!(typeof reducer === "function")
      ? (function() {
      throw (new Error(("(coyo.reduce)" + _eArg1_ + "function, got " + show(reducer))))
    }).call(this)
      : !(typeof seed !== "undefined")
      ? (function() {
      throw (new Error(("(coyo.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
    }).call(this)
      : typeof value.reduce === "function"
      ? value.reduce((function(acc, val) {
          
      return reducer(acc, mapper(val));
    }), seed)
      : reducer(seed, mapper(value)));
  })(this.value, this.mapper);
});
export let free = (function() {
    const sumtype$2 = Object.create(null);
  sumtype$2.prototype = { __sibilispType__: sumtype$2 };
  sumtype$2.result = function result(value) {
    const self$4 = Object.create(sumtype$2.prototype);
    const argCount$4 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$4 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + free + "." + result + "expects " + 1 + " arguments but got " + argCount$4)))
        }).call(this);
      }
    }).call(this);
    self$4.value = value;
    self$4.constructor = result;
    self$4.__sibilispCtor__ = "result";
    self$4.__sibilispTags__ = [ "value" ];
    return self$4;
  };;
  sumtype$2.compute = function compute(value, run) {
    const self$5 = Object.create(sumtype$2.prototype);
    const argCount$5 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$5 === 2)) {
        return (function() {
          throw (new Error(("Tagged constructor " + free + "." + compute + "expects " + 2 + " arguments but got " + argCount$5)))
        }).call(this);
      }
    }).call(this);
    self$5.value = value;
    self$5.run = run;
    self$5.constructor = compute;
    self$5.__sibilispCtor__ = "compute";
    self$5.__sibilispTags__ = [ "value", "run" ];
    return self$5;
  };;
  sumtype$2.prototype.match = (function(ctors) {
      
    const self = this;
    const name = self.__sibilispCtor__;
    const keys = self.__sibilispTags__;
    const ctor = ctors[name];
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else if (typeof ctors.else === "function") {
        return ctors.else.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error((".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$2.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$2);
  });
  return sumtype$2;
}).call(this);
free.of = (function(value) {
    return free.result(value);
});
free.lift = (function(type) {
    return free.compute(type, free.result);
});
free.prototype.map = (function(f) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(free.map)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : this.match({
    result: (function(value) {
          
      return free.result(f(value));
    }),
    compute: (function(value, run) {
          
      return free.compute(value, (function(x) {
              
        return run(x).map(f);
      }));
    })
  }));
});
free.prototype.ap = (function(tFree) {
    return (!(typeof tFree.map === "function")
    ? (function() {
    throw (new Error(("(free.ap)" + _eArg1_ + "functor, got " + show(tFree))))
  }).call(this)
    : this.match({
    result: (function(value) {
          
      return tFree.map(value);
    }),
    compute: (function(value, run) {
          
      return free.compute(value, (function(x) {
              
        return run(x).ap(tFree);
      }));
    })
  }));
});
free.prototype.flatMap = (function(f) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(free.flat-map | free.chain)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : this.match({
    result: (function(value) {
          
      return f(value);
    }),
    compute: (function(value, run) {
          
      return free.compute(value, (function(x) {
              
        return run(x).flatMap(f);
      }));
    })
  }));
});
free.prototype.chain = free.prototype.flatMap;
free.prototype.foldMap = (function(f, pointed) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(free.fold-map | free.interpret)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : !(typeof pointed.of === "function")
    ? (function() {
    throw (new Error(("(free.fold-map | free.interpret)" + _eArg2_ + "Pointed, got " + show(pointed))))
  }).call(this)
    : this.match({
    result: (function(value) {
          
      return pointed.of(value);
    }),
    compute: (function(value, run) {
          
      return ((null == value || Number.isNaN(value))) ? run().foldMap(f, pointed) : f(value).flatMap((function(x) {
              
        return run(x).foldMap(f, pointed);
      }));
    })
  }));
});
free.prototype.interpret = free.prototype.foldMap;
export let io = (function() {
    function type$2(unsafePerform) {
    const self$6 = Object.create(type$2.prototype);
    const argCount$6 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$6 === 1)) {
        return (function() {
          throw (new Error(("io" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$6.unsafePerform = unsafePerform;
    return self$6;
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
    throw (new Error(("(io.lift)" + _eGuard_ + value)))
  }).call(this)
    : typeof value === "function"
    ? io(value)
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
      
    ("(io " + show(fn));
    return ")";
  })(this.unsafePerform);
});
io.prototype.equals = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("(io.equals)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : this.unsafePerform === tIo.unsafePerform);
});
io.prototype.concat = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("(io.concat)" + _eArg1_ + "io, got " + show(tIo))))
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
    throw (new Error(("(io.map)" + _eArg1_ + "function, got " + show(mapper))))
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
    throw (new Error(("(io.contramp)" + _eArg1_ + "function, got " + show(preMapper))))
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
    throw (new Error(("(io.promap)" + _eArg1_ + "function, got " + show(preMapper))))
  }).call(this)
    : !(typeof postMapper === "function")
    ? (function() {
    throw (new Error(("(io.promap)" + _eArg2_ + "function, got " + show(postMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return postMapper(runSelf(preMapper(arg)));
    }));
  })(this.unsafePerform));
});
io.prototype.ap = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("(io.ap)" + _eArg1_ + "io, got " + show(tIo))))
  }).call(this)
    : (function(runSelf) {
      
    return tIo.map(runSelf);
  })(this.unsafePerform));
});
io.prototype.flatMap = (function(toIoMapper) {
    return (!(typeof toIoMapper === "function")
    ? (function() {
    throw (new Error(("(io.flat-map | io.chain)" + _eArg1_ + "io returning function, got " + show(toIoMapper))))
  }).call(this)
    : (function(runSelf) {
      
    return io((function(arg) {
          
      return toIoMapper(runSelf(arg)).unsafePerform(arg);
    }));
  })(this.unsafePerform));
});
io.prototype.chain = io.prototype.flatMap;
io.prototype.compose = (function(tIo) {
    return (!(io.is(tIo))
    ? (function() {
    throw (new Error(("(io.compose)" + _eArg1_ + "io, got " + show(tIo))))
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
export let maybe = (function() {
    const sumtype$3 = Object.create(null);
  sumtype$3.prototype = { __sibilispType__: sumtype$3 };
  sumtype$3.nothing = function nothing() {
    const self$7 = Object.create(sumtype$3.prototype);
    const argCount$7 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$7 === 0)) {
        return (function() {
          throw (new Error(("Tagged constructor " + maybe + "." + nothing + "expects " + 0 + " arguments but got " + argCount$7)))
        }).call(this);
      }
    }).call(this);
    self$7.constructor = nothing;
    self$7.__sibilispCtor__ = "nothing";
    self$7.__sibilispTags__ = [];
    return self$7;
  };;
  sumtype$3.just = function just(value) {
    const self$8 = Object.create(sumtype$3.prototype);
    const argCount$8 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$8 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + maybe + "." + just + "expects " + 1 + " arguments but got " + argCount$8)))
        }).call(this);
      }
    }).call(this);
    self$8.value = value;
    self$8.constructor = just;
    self$8.__sibilispCtor__ = "just";
    self$8.__sibilispTags__ = [ "value" ];
    return self$8;
  };;
  sumtype$3.prototype.match = (function(ctors) {
      
    const self = this;
    const name = self.__sibilispCtor__;
    const keys = self.__sibilispTags__;
    const ctor = ctors[name];
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else if (typeof ctors.else === "function") {
        return ctors.else.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error((".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$3.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$3);
  });
  return sumtype$3;
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
maybe.zero = maybe.empty;
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
        throw (new Error(("(maybe.equals)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
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
        throw (new Error(("(maybe.concat)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
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
                  throw (new Error(("(maybe.concat) can only concat when both of the carried values implement the semigroup typeclass")))
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
    throw (new Error(("(maybe.map)" + _eArg1_ + "function, got " + show(mapper))))
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
        throw (new Error(("(maybe.ap)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
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
    throw (new Error(("(maybe.flat-map|maybe.chain)" + _eArg1_ + "function, got " + show(toMaybeMapper))))
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
    throw (new Error(("(maybe.bimap)" + _eArg1_ + "function, got " + show(transformNothing))))
  }).call(this)
    : !(typeof transformJust === "function")
    ? (function() {
    throw (new Error(("(maybe.bimap)" + _eArg2_ + "function, got " + show(transformJust))))
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
    throw (new Error(("(maybe.alt)" + _eArg1_ + "instance of maybe, got " + show(tMaybe))))
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
    throw (new Error(("(maybe.reduce)" + _eArg1_ + "function, got " + show(reducer))))
  }).call(this)
    : !(typeof seed !== "undefined")
    ? (function() {
    throw (new Error(("(maybe.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
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
    throw (new Error(("(maybe.traverse)" + _eArg1_ + "function, got " + show(lift))))
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
    throw (new Error(("(maybe.sequence)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : this.traverse(lift, identity));
});
export let maybeTransformer = (function(t) {
    let maybeT = (function() {
      
    function type$3(stack) {
      const self$9 = Object.create(type$3.prototype);
      const argCount$9 = ((arguments.size || arguments.length) || 0);
      (function() {
        if (!(argCount$9 === 1)) {
          return (function() {
            throw (new Error(("maybeT" + " received invalid number of arguments.")))
          }).call(this);
        }
      }).call(this);
      self$9.stack = stack;
      return self$9;
    };
    type$3.is = (function(x$3) {
          
      return x$3 instanceof type$3;
    });
    return type$3;
  }).call(this);
  (function() {
    if (!(typeof t === "function")) {
      return (function() {
        throw (new Error(("(maybe-transformer)" + _eArg1_ + "function, got " + show(t))))
      }).call(this);
    }
  }).call(this);
  maybeT.lift = (function(v) {
      
    return (typeof t.lift === "function"
      ? maybeT(t.lift(maybe.lift(v)))
      : funtion__QUERY(t.of)
      ? maybeT(t.of(maybe.lift(v)))
      : (function() {
      throw (new Error(("(maybe-t.lift) cannot stack with " + t.name)))
    }).call(this));
  });
  maybeT.prototype.map = (function(mapper) {
      
    return (!(typeof mapper === "function")
      ? (function() {
      throw (new Error(("(maybe-transformer.map)" + _eArg1_ + "function, got " + show(mapper))))
    }).call(this)
      : maybeT(this.stack.map((function(tt) {
          
      return tt.map(mapper);
    }))));
  });
  maybeT.prototype.flatMap = (function(toMaybeMapper) {
      
    return (!(typeof toMaybeMapper === "function")
      ? (function() {
      throw (new Error(("(maybe-transformer.flat-map/chain)" + _eArg1_ + "function, got " + show(toMaybeMapper))))
    }).call(this)
      : maybeT(this.stack.flatMap((function(tt) {
          
      return tt.flatMap((function(v) {
              
        return toMaybeMapper(v).stack;
      }));
    }))));
  });
  maybeT.prototype.chain = maybeT.prototype.flatMap;
  return maybeT;
});
export let either = (function() {
    const sumtype$4 = Object.create(null);
  sumtype$4.prototype = { __sibilispType__: sumtype$4 };
  sumtype$4.left = function left(error) {
    const self$10 = Object.create(sumtype$4.prototype);
    const argCount$10 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$10 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + either + "." + left + "expects " + 1 + " arguments but got " + argCount$10)))
        }).call(this);
      }
    }).call(this);
    self$10.error = error;
    self$10.constructor = left;
    self$10.__sibilispCtor__ = "left";
    self$10.__sibilispTags__ = [ "error" ];
    return self$10;
  };;
  sumtype$4.right = function right(value) {
    const self$11 = Object.create(sumtype$4.prototype);
    const argCount$11 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$11 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + either + "." + right + "expects " + 1 + " arguments but got " + argCount$11)))
        }).call(this);
      }
    }).call(this);
    self$11.value = value;
    self$11.constructor = right;
    self$11.__sibilispCtor__ = "right";
    self$11.__sibilispTags__ = [ "value" ];
    return self$11;
  };;
  sumtype$4.prototype.match = (function(ctors) {
      
    const self = this;
    const name = self.__sibilispCtor__;
    const keys = self.__sibilispTags__;
    const ctor = ctors[name];
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else if (typeof ctors.else === "function") {
        return ctors.else.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error((".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$4.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$4);
  });
  return sumtype$4;
}).call(this);
either.of = (function(value) {
    return either.right(value);
});
either.lift = (function(value, isLeft__QUERY) {
    return (!(!(value == null))
    ? either.left((new Error((""))))
    : (Error.prototype.isPrototypeOf(value) || isLeft__QUERY)
    ? either.left(value)
    : either.of(value));
});
either.empty = (function() {
    return either.right([]);
});
either.zero = (function() {
    return either.left((new Error(("either-zero"))));
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
    throw (new Error(("(either.equals)" + _eArg1_ + "instance of either, got " + show(tEither))))
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
    throw (new Error(("(either.concat)" + _eArg1_ + "either, got " + show(tEither))))
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
                  throw (new Error(("(either.concat) cannot concat when both of the carried values implement the semigroup typeclass")))
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
    throw (new Error(("(either.map)" + _eArg1_ + "function, got " + show(mapper))))
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
        throw (new Error(("(either.ap)" + _eArg1_ + "instance of either, got " + show(tEither))))
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
    throw (new Error(("(either.flat-map|either.chain)" + _eArg1_ + "function, got " + show(toEitherMapper))))
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
    throw (new Error(("(either.bimap)" + _eArg1_ + "function, got " + show(transformLeft))))
  }).call(this)
    : !(typeof transformRight === "function")
    ? (function() {
    throw (new Error(("(either.bimap)" + _eArg2_ + "function, got " + show(transformRight))))
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
    throw (new Error(("(either.alt)" + _eArg1_ + "instance of either, got " + show(tEither))))
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
    throw (new Error(("(either.reduce)" + _eArg1_ + "function, got " + show(reducer))))
  }).call(this)
    : !(typeof seed !== "undefined")
    ? (function() {
    throw (new Error(("(either.reduce)" + _eArg2_ + "non (void) value, got " + show(seed))))
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
    throw (new Error(("(either.traverse)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : !(typeof transformer === "function")
    ? (function() {
    throw (new Error(("(either.traverse)" + _eArg2_ + "function, got " + show(transformer))))
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
    throw (new Error(("(either.sequence)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : this.traverse(lift, identity));
});
export let eitherTransformer = (function(t) {
    let eitherT = (function() {
      
    function type$4(stack) {
      const self$12 = Object.create(type$4.prototype);
      const argCount$12 = ((arguments.size || arguments.length) || 0);
      (function() {
        if (!(argCount$12 === 1)) {
          return (function() {
            throw (new Error(("eitherT" + " received invalid number of arguments.")))
          }).call(this);
        }
      }).call(this);
      self$12.stack = stack;
      return self$12;
    };
    type$4.is = (function(x$4) {
          
      return x$4 instanceof type$4;
    });
    return type$4;
  }).call(this);
  (function() {
    if (!(typeof t === "function")) {
      return (function() {
        throw (new Error(("(either-transformer)" + _eArg1_ + "function, got " + show(t))))
      }).call(this);
    }
  }).call(this);
  eitherT.lift = (function(v) {
      
    return (typeof t.lift === "function"
      ? eitherT(t.lift(either.lift(v)))
      : funtion__QUERY(t.of)
      ? eitherT(t.of(either.lift(v)))
      : (function() {
      throw (new Error(("(either-t.lift) cannot stack with " + t.name)))
    }).call(this));
  });
  eitherT.prototype.map = (function(mapper) {
      
    return (!(typeof mapper === "function")
      ? (function() {
      throw (new Error(("(either-transformer.map)" + _eArg1_ + "function, got " + show(mapper))))
    }).call(this)
      : eitherT(this.stack.map((function(tt) {
          
      return tt.map(mapper);
    }))));
  });
  eitherT.prototype.flatMap = (function(toEitherMapper) {
      
    return (!(typeof toEitherMapper === "function")
      ? (function() {
      throw (new Error(("(either-transformer.flat-map/chain)" + _eArg1_ + "function, got " + show(toEitherMapper))))
    }).call(this)
      : eitherT(this.stack.flatMap((function(tt) {
          
      return tt.flatMap((function(v) {
              
        return toEitherMapper(v).stack;
      }));
    }))));
  });
  eitherT.prototype.chain = eitherT.prototype.flatMap;
  return eitherT;
});
export let seq = (function() {
    function type$5(ls) {
    const self$13 = Object.create(type$5.prototype);
    const argCount$13 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$13 === 1)) {
        return (function() {
          throw (new Error(("seq" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$13.ls = ls;
    return self$13;
  };
  type$5.is = (function(x$5) {
      
    return x$5 instanceof type$5;
  });
  return type$5;
}).call(this);
seq.of = (function(values) {
    var values = Array.prototype.slice.call(arguments, 0);

  return seq(values);
});
seq.lift = (function(value) {
    return ((null == value || Number.isNaN(value))
    ? seq.empty()
    : Array.isArray(value)
    ? seq(value)
    : ((!(null == value) && value.constructor === Set) || (!(value.length == null) && !(typeof value === "function")))
    ? seq(Array.from(value))
    : (!(null == value) && value.constructor === (function * (){}).constructor)
    ? seq(Array.from(value()))
    : seq([ value ]));
});
seq.empty = (function() {
    return seq([]);
});
seq.zero = seq.empty;
seq.prototype.toString = (function() {
    return ("(seq " + show(this.ls) + ")");
});
seq.prototype.toList = (function() {
    return this.ls.slice();
});
seq.prototype.length = (function() {
    return this.ls.length;
});
seq.prototype.equals = (function(tSeq) {
    return (!(seq.is(tSeq))
    ? (function() {
    throw (new Error(("(seq.equals)" + _eArg1_ + "instance of seq, got " + show(tSeq))))
  }).call(this)
    : equals(this.ls, tSeq.ls));
});
seq.prototype.concat = (function(tSeq) {
    return (!(seq.is(tSeq))
    ? (function() {
    throw (new Error(("(seq.concat)" + _eArg1_ + "instance of seq, got " + show(tSeq))))
  }).call(this)
    : (function(ls, ks) {
      
    return seq(ls.concat(ks));
  })(this.ls, tSeq.ls));
});
seq.prototype.map = (function(f) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(seq.map)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : seq(this.ls.map(f)));
});
seq.prototype.flatMap = (function(f) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(seq.flat-map|seq.chain)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : seq(this.ls.flatMap((function(v) {
      
    return f(v).ls;
  }))));
});
seq.chain = seq.flatMap;
seq.prototype.ap = (function(tSeq) {
    return (!(seq.is(tSeq))
    ? (function() {
    throw (new Error(("(seq.ap)" + _eArg1_ + "instance of seq, got " + show(tSeq))))
  }).call(this)
    : seq(this.ls.flatMap((function(f) {
      
    return tSeq.map(f).ls;
  }))));
});
seq.prototype.reduce = (function(reducer, seed) {
    return (!(typeof reducer === "function")
    ? (function() {
    throw (new Error(("(seq.reduce)" + _eArg1_ + "function, got " + show(reducer))))
  }).call(this)
    : !(!(seed == null))
    ? (function() {
    throw (new Error(("(seq.reduce)" + _eArg2_ + "non-nil value, got " + show(seed))))
  }).call(this)
    : this.ls.reduce(reducer, seed));
});
seq.prototype.foldMap = (function(liftMap) {
    return (!(typeof liftMap === "function")
    ? (function() {
    throw (new Error(("(seq.fold-map)" + _eArg1_ + "function, got " + show(liftMap))))
  }).call(this)
    : this.ls.reduce((function(a, x, i) {
      
    return (i < 1) ? liftMap(x) : a.concat(liftMap(x));
  }), null));
});
seq.prototype.fold = (function(lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("(seq.fold)" + _eArg1_ + "function, got" + show(lift))))
  }).call(this)
    : this.ls.reduce((function(a, x, i) {
      
    return (i < 1) ? lift(x) : a.concat(lift(x));
  }), null));
});
seq.prototype.traverse = (function(lift, transformer) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("(seq.traverse)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : !(typeof transformer === "function")
    ? (function() {
    throw (new Error(("(seq.traverse)" + _eArg2_ + "function, got " + show(transformer))))
  }).call(this)
    : this.ls.reduce((function(a, x) {
      
    return transformer(x).map((function(v) {
          
      return (function(w) {
              
        return w.concat(v);
      });
    })).ap(a);
  }), lift(seq.empty())));
});
seq.prototype.sequence = (function(lift) {
    return (!(typeof lift === "function")
    ? (function() {
    throw (new Error(("(seq.sequence)" + _eArg1_ + "function, got " + show(lift))))
  }).call(this)
    : this.traverse(lift, (function(x) {
      
    return x;
  })));
});
seq.prototype.alt = (function(tSeq) {
    return (!(seq.is(tSeq))
    ? (function() {
    throw (new Error(("(seq.alt)" + _eArg1_ + "instance of seq, got " + show(tSeq))))
  }).call(this)
    : (this.length() === 0) ? tSeq : this);
});
seq.prototype.filter = (function(f) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(seq.filter)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : seq(this.ls.filter(f)));
});
seq.prototype.find = (function(f, T) {
    T = (typeof T !== "undefined") ? T : maybe;
  return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(seq.find)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : typeof this.ls.find === "function"
    ? T.lift(this.ls.find(f))
    : T.lift(this.ls.reduce((function(acc, x) {
      
    return ((!(acc === null) && f(x))) ? x : acc;
  }), null)));
});
seq.prototype.cons = (function(x) {
    return seq([ x ].concat(this.ls));
});
seq.prototype.snoc = (function(x) {
    return seq(this.ls.concat(x));
});
seq.prototype.take = (function(n) {
    return (!((typeof n === "number" && !(Number.isNaN(n))))
    ? (function() {
    throw (new Error(("(seq.take)" + _eArg1_ + "positive number, got " + show(n))))
  }).call(this)
    : seq(this.ls.slice(0, Math.min(Math.abs(n), ((this.ls.size || this.ls.length) || 0)))));
});
seq.prototype.takeWhile = (function(f) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(seq.take-while)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : (function(taking) {
      
    return seq(this.ls.reduce((function(acc, x) {
          
      return (function() {
        if (!(taking)) {
          return acc;
        } else {
          taking = f(x);
          return (taking) ? acc.concat(x) : acc;
        }
      }).call(this);
    }), []));
  })(true));
});
seq.prototype.drop = (function(n) {
    return (!((typeof n === "number" && !(Number.isNaN(n))))
    ? (function() {
    throw (new Error(("(seq.drop)" + _eArg1_ + "positive number, got " + show(n))))
  }).call(this)
    : seq(this.ls.slice(Math.min(Math.abs(n), ((this.ls.size || this.ls.length) || 0)))));
});
seq.prototype.dropWhile = (function(f) {
    return (!(typeof f === "function")
    ? (function() {
    throw (new Error(("(seq.drop-while)" + _eArg1_ + "function, got " + show(f))))
  }).call(this)
    : (function(dropping) {
      
    return seq(this.ls.reduce((function(acc, x) {
          
      return (function() {
        if (dropping) {
          dropping = f(x);
          return (dropping) ? acc : acc.concat(x);
        } else {
          return acc.concat(x);
        }
      }).call(this);
    }), []));
  })(true));
});
seq.prototype.reverse = (function() {
    return seq(this.ls.slice().reverse());
});
export let seqTransformer = (function() {
    let seqT = (function() {
      
    function type$6(stack) {
      const self$14 = Object.create(type$6.prototype);
      const argCount$14 = ((arguments.size || arguments.length) || 0);
      (function() {
        if (!(argCount$14 === 1)) {
          return (function() {
            throw (new Error(("seqT" + " received invalid number of arguments.")))
          }).call(this);
        }
      }).call(this);
      self$14.stack = stack;
      return self$14;
    };
    type$6.is = (function(x$6) {
          
      return x$6 instanceof type$6;
    });
    return type$6;
  }).call(this);
  (function() {
    if (!(typeof t === "function")) {
      return (function() {
        throw (new Error(("(seq-transformer)" + _eArg1_ + "function, got " + show(t))))
      }).call(this);
    }
  }).call(this);
  seqT.lift = (function(v) {
      
    return (typeof t.lift === "function"
      ? seqT(t.lift(seq.lift(v)))
      : funtion__QUERY(t.of)
      ? seqT(t.of(seq.lift(v)))
      : (function() {
      throw (new Error(("(seq-t.lift) cannot stack with " + t.name)))
    }).call(this));
  });
  seqT.prototype.map = (function(mapper) {
      
    return (!(typeof mapper === "function")
      ? (function() {
      throw (new Error(("(seq-transformer.map)" + _eArg1_ + "function, got " + show(mapper))))
    }).call(this)
      : seqT(this.stack[(function(tt) {
          
      return tt.map(mapper);
    })].map()));
  });
  seqT.prototype.flatMap = (function(toSeqMapper) {
      
    return (!(typeof toSeqMapper === "function")
      ? (function() {
      throw (new Error(("(seq-transformer.flat-map/chain)" + _eArg1_ + "function, got " + show(toSeqMapper))))
    }).call(this)
      : seqT(this.stack.flatMap((function(tt) {
          
      return tt.reduce((function(a, v) {
              
        return toSeqMapper(v).stack.flatMap((function(vt) {
                  
          return a.map((function(va) {
                      
            return va.concat(vt);
          }));
        }));
      }), (t.lift || t.of)(seq.empty()));
    }))));
  });
  seqT.prototype.chain = seqT.prototype.flatMap;
  return seqT;
});
export let proof = (function() {
    const sumtype$5 = Object.create(null);
  sumtype$5.prototype = { __sibilispType__: sumtype$5 };
  sumtype$5.falsy = function falsy(errors) {
    const self$15 = Object.create(sumtype$5.prototype);
    const argCount$15 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$15 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + proof + "." + falsy + "expects " + 1 + " arguments but got " + argCount$15)))
        }).call(this);
      }
    }).call(this);
    self$15.errors = errors;
    self$15.constructor = falsy;
    self$15.__sibilispCtor__ = "falsy";
    self$15.__sibilispTags__ = [ "errors" ];
    return self$15;
  };;
  sumtype$5.truthy = function truthy(value) {
    const self$16 = Object.create(sumtype$5.prototype);
    const argCount$16 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$16 === 1)) {
        return (function() {
          throw (new Error(("Tagged constructor " + proof + "." + truthy + "expects " + 1 + " arguments but got " + argCount$16)))
        }).call(this);
      }
    }).call(this);
    self$16.value = value;
    self$16.constructor = truthy;
    self$16.__sibilispCtor__ = "truthy";
    self$16.__sibilispTags__ = [ "value" ];
    return self$16;
  };;
  sumtype$5.prototype.match = (function(ctors) {
      
    const self = this;
    const name = self.__sibilispCtor__;
    const keys = self.__sibilispTags__;
    const ctor = ctors[name];
    return (function() {
      if (typeof ctor === "function") {
        return ctor.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else if (typeof ctors.else === "function") {
        return ctors.else.apply(self, keys.map((function(key) {
                  
          return self[key];
        })));
      } else {
        return (function() {
          throw (new Error((".match :: Cannot find " + name + " in patterns " + ctors)))
        }).call(this);
      }
    }).call(this);
  });
  sumtype$5.is = (function(x) {
      
    return (!(null == x) && x.__sibilispType__ === sumtype$5);
  });
  return sumtype$5;
}).call(this);
proof.of = (function(value) {
    return proof.truthy(value);
});
proof.lift = (function(value, isFalsy__QUERY) {
    return ((null == value || Number.isNaN(value))
    ? proof.falsy([ (new Error((_eNoValue_))) ])
    : (Error.prototype.isPrototypeOf(value) || isFalsy__QUERY)
    ? proof.falsy([ value ])
    : proof.truthy(value));
});
proof.empty = (function() {
    return proof.truthy(true);
});
proof.zero = (function() {
    return proof.falsy([ (new Error(("ProofZero"))) ]);
});
proof.prototype.toString = (function() {
    return this.match({
    truthy: (function(value) {
          
      return ("(proof.truthy " + show(value) + ")");
    }),
    falsy: (function(errors) {
          
      return ("(proof.falsy " + show(errors) + ")");
    })
  });
});
proof.prototype.equals = (function(tProof) {
    return (!(proof.is(tProof))
    ? (function() {
    throw (new Error(("(proof.equals)" + _eArg1_ + "instance of proof, got " + show(tProof))))
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
    throw (new Error(("(proof.concat)" + _eArg1_ + "proof, got " + show(tProof))))
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
    throw (new Error(("(proof.map)" + _eArg1_ + "function, got " + show(mapper))))
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
proof.prototype.flatMap = (function(toProofMapper) {
    return (!(typeof toProofMapper === "function")
    ? (function() {
    throw (new Error(("(proof.flat-map/chain)")))
  }).call(this)
    : this.match({
    truthy: (function(value) {
          
      return toProofMapper(value);
    }),
    falsy: (function(errors) {
          
      return proof.falsy(errors);
    })
  }));
});
proof.prototype.chain = proof.prototype.flatMap;
proof.prototype.bimap = (function(lhsMapper, rhsMapper) {
    return (!(typeof lhsMapper === "function")
    ? (function() {
    throw (new Error(("(proof.bimap)" + _eArg1_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("(proof.bimap)" + _eArg2_ + "function, got " + show(rhsMapper))))
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
    throw (new Error(("(proof.ap)" + _eArg1_ + "proof, got " + show(tProof))))
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
    throw (new Error(("(proof.alt)" + _eArg1_ + "proof, got " + show(tProof))))
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
export let proofTransformer = (function(t) {
    let proofT = (function() {
      
    function type$7(stack) {
      const self$17 = Object.create(type$7.prototype);
      const argCount$17 = ((arguments.size || arguments.length) || 0);
      (function() {
        if (!(argCount$17 === 1)) {
          return (function() {
            throw (new Error(("proofT" + " received invalid number of arguments.")))
          }).call(this);
        }
      }).call(this);
      self$17.stack = stack;
      return self$17;
    };
    type$7.is = (function(x$7) {
          
      return x$7 instanceof type$7;
    });
    return type$7;
  }).call(this);
  (function() {
    if (!(typeof t === "function")) {
      return (function() {
        throw (new Error(("(proof-transformer)" + _eArg1_ + "function, got " + show(t))))
      }).call(this);
    }
  }).call(this);
  proofT.lift = (function(v) {
      
    return (typeof t.lift === "function"
      ? proofT(t.lift(proof.lift(v)))
      : funtion__QUERY(t.of)
      ? proofT(t.of(proof.lift(v)))
      : (function() {
      throw (new Error(("(proof-t.lift) cannot stack with " + t.name)))
    }).call(this));
  });
  proofT.prototype.map = (function(mapper) {
      
    return (!(typeof mapper === "function")
      ? (function() {
      throw (new Error(("(proof-transformer.map)" + _eArg1_ + "function, got " + show(mapper))))
    }).call(this)
      : proofT(this.stack.map((function(tt) {
          
      return tt.map(mapper);
    }))));
  });
  proofT.prototype.flatMap = (function(toProofMapper) {
      
    return (!(typeof toProofMapper === "function")
      ? (function() {
      throw (new Error(("(proof-transformer.flat-map/chain)" + _eArg1_ + "function, got " + show(toProofMapper))))
    }).call(this)
      : proofT(this.stack.map((function(tt) {
          
      return tt.flatMap((function(v) {
              
        return toProofMapper(v).stack;
      }));
    }))));
  });
  proofT.prototype.chain = proofT.prototype.flatMap;
  return proofT;
});
export let task = (function() {
    function type$8(runTask) {
    const self$18 = Object.create(type$8.prototype);
    const argCount$18 = ((arguments.size || arguments.length) || 0);
    (function() {
      if (!(argCount$18 === 1)) {
        return (function() {
          throw (new Error(("task" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$18.runTask = runTask;
    return self$18;
  };
  type$8.is = (function(x$8) {
      
    return x$8 instanceof type$8;
  });
  return type$8;
}).call(this);
task.of = (function(value) {
    return task((function(fail, ok) {
      
    return ok(value);
  }));
});
task.zero = (function(value) {
    return task((function(fail) {
      
    return fail((Error.prototype.isPrototypeOf(value)) ? value : (new Error(("TaskZero" + value))));
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
task.prototype.toString = (function() {
    return "(task)";
});
task.prototype.concat = (function(tTask) {
    return (!(task.is(tTask))
    ? (function() {
    throw (new Error(("(task.concat)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return (function() {
              
        let done = false;
        let guard = (function(f) {
                  
          return (function(g) {
                      
            return (function() {
              if (!(done)) {
                done = true;
                return f(g);
              }
            }).call(this);
          });
        });
        return (function() {
                  
          runSelf(guard(fail), guard(ok));
          return runThat(guard(fail), guard(ok));
        })();
      }).call(this);
    }));
  })(this.runTask, tTask.runTask));
});
task.prototype.ap = (function(tTask) {
    return (!(task.is(tTask))
    ? (function() {
    throw (new Error(("(task.ap)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return (function() {
              
        let adone = false;
        let bdone = false;
        let aval = false;
        let bval = false;
        let rejected = false;
        let rej = (function(v) {
                  
          return (function() {
            if (!(rejected)) {
              rejected = true;
              return fail(v);
            }
          }).call(this);
        });
        let res = (function(f) {
                  
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
        });
        return (function() {
                  
          runSelf(rej, res((function(a) {
                      
            adone = true;
            return aval = a;
          })));
          return runThat(rej, res((function(b) {
                      
            bdone = true;
            return bval = b;
          })));
        })();
      }).call(this);
    }));
  })(this.runTask, tTask.runTask));
});
task.prototype.map = (function(mapper) {
    return (!(typeof mapper === "function")
    ? (function() {
    throw (new Error(("(task.map)" + _eArg1_ + "function, got " + show(mapper))))
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
    throw (new Error(("(task.flat-map)" + _eArg1_ + "function, got " + show(toTaskMapper))))
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
    throw (new Error(("(task.bimap)" + _eArg1_ + "function, got " + show(lhsMapper))))
  }).call(this)
    : !(typeof rhsMapper === "function")
    ? (function() {
    throw (new Error(("(task.bimap)" + _eArg2_ + "function, got " + show(rhsMapper))))
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
    return (!(task.is(tTask))
    ? (function() {
    throw (new Error(("(task.alt)" + _eArg1_ + "instance of task, got " + show(tTask))))
  }).call(this)
    : (function(runSelf, runThat) {
      
    return task((function(fail, ok) {
          
      return runSelf((function() {
              
        return runThat(fail, ok);
      }), ok);
    }));
  })(this.runTask, tTask.runTask));
});
export let coyoAsMaybe = (function(cyo) {
    return cyo.reduce((function(_, v) {
      
    return maybe.lift(v);
  }), null);
});
export let coyoAsEither = (function(cyo) {
    return cyo.reduce((function(_, v) {
      
    return either.lift(v);
  }), null);
});
export let coyoAsIo = (function(cyo) {
    return cyo.reduce((function(_, v) {
      
    return io.lift(v);
  }), null);
});
export let coyoAsTask = (function(cyo) {
    return cyo.reduce((function(_, v) {
      
    return task.lift(v);
  }), null);
});
export let coyoAsProof = (function(cyo) {
    return cyo.reduce((function(_, v) {
      
    return proof.lift(v);
  }), null);
});
export let maybeAsEither = (function(mbe) {
    return mbe.match({
    nothing: either.zero,
    just: either.lift
  });
});
export let maybeAsProof = (function(mbe) {
    return mbe.match({
    nothing: proof.zero,
    just: proof.lift
  });
});
export let maybeAsTask = (function(mbe) {
    return mbe.match({
    nothing: task.zero,
    just: task.lift
  });
});
export let eitherAsMaybe = (function(eth) {
    return eth.match({
    left: maybe.zero,
    right: maybe.lift
  });
});
export let eitherAsProof = (function(eth) {
    return eth.match({
    left: (function(e) {
          
      return proof.lift(e, true);
    }),
    right: proof.lift
  });
});
export let eitherAsTask = (function(eth) {
    return eth.match({
    left: task.zero,
    right: task.lift
  });
});
export let proofAsMaybe = (function(prf) {
    return prf.match({
    falsy: maybe.zero,
    truthy: maybe.lift
  });
});
export let proofAsEither = (function(prf) {
    return prf.match({
    falsy: (function(errs) {
          
      return either.left(errs[0]);
    }),
    truthy: either.lift
  });
});
export let proofAsTask = (function(prf) {
    return prf.match({
    falsy: (function() {
          
      return task.zero((new Error((arguments[0].reduce((function(a, e) {
              
        return (a + e.message + "\n");
      }), "")))));
    }),
    truthy: task.lift
  });
});
export let ioAsTask = (function(eff, args) {
    var args = Array.prototype.slice.call(arguments, 1);

  return task((function(fail, ok) {
      
    
  }), (function() {
    try {
      return ok(eff.run(args));
    } catch (e) {
      return fail((new Error(("Failed to run " + eff))));
    }
  }).call(this));
});