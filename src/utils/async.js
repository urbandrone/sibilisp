// License

const of = a => Promise.resolve(a);

const empty = () => new Promise(() => void 0);

const zero = () => Promise.reject(new Error('Async.zero'));

const is = a => a != null && a.constructor === Promise;

const lift = fn => new Promise((res, rej) => { fn(rej, res); });


const combined = ls => Promise.all(ls);


const map = fn => promise => promise.then(fn);

const chain = fn => promise => promise.then(fn);

const ap = pApply => promise => pApply.then(promise.then.bind(promise));

const concat = pSemigroup => promise => Promise.race([pSemigroup, promise]);

const bimap = (fnRej, fnRes) => promise => promise.then(fnRes, fnRej);

const alt = pAlt => promise => bimap(() => pAlt, (a) => a)(promise);

const run = (rej, res) => promise => promise.then(res).catch(rej);



module.exports = {
	of, combined, empty, zero, is, lift, map, chain, ap, concat, bimap, alt, run
};
