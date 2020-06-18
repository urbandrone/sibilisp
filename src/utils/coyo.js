// License

const Coyo = (a, fn) => Object.freeze({
	constructor: Coyo,
	map(g) { return Coyo(a, x => g(fn(x))); },
	lower() { return Coyo(a.map(fn), (x) => x); },
	run() { return fn(a); }
});



const of = a => Coyo(a, (x) => x);

const is = a => a != null && a.constructor === Coyo;



const map = fn => coyo => coyo.map(fn);

const lower = coyo => coyo.lower();

const run = coyo => coyo.run();



module.exports = {
	of, is, map, lower, run
};
