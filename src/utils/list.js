// License

const __for = (ls, fn) => {
	for (let i = 0, l = ls.length; i < l; i += 1) {
		((_i) => { fn(ls[_i], _i, ls); })(i);
	}
};

const __forr = (ls, fn) => {
	for (let i = ls.length; i > -1; i -= 1) {
		((_i) => { fn(ls[_i], _i, ls); })(i);
	}
};

const __foldl = (ls, a, fn) => {
	let retv = a;
	__for(ls, (x, i) => {
		retv = fn(retv, x, i, ls);
	});
	return retv;
};

const __foldr = (ls, a, fn) => {
	let retv = a;
	__forr(ls, (x, i) => {
		retv = fn(retv, x, i, ls);
	});
	return retv;
};

const __map = (ls, fn) => __foldl(ls, [], (a, x) => [...a, fn(x)]);

const __mmap = (ls, fn) => {
	let s = fn.length;
	let retv = [];
	for (let i = 0, l = ls.length; i < l; i += s) {
		retv.push(fn(...ls.slice(i, i + s)));
	}
	return retv;
}

const __select = (ls, fn) => __foldl(ls, [], (a, x) => fn(x) ? [...a, x] : a);

const __reject = (ls, fn) => __select(ls, x => !fn(x));



const of = (...as) => as;

const is = a => a != null && a.constructor === Array;

const empty = () => [];

const zero = () => [];

const lift = a => is(a)
			? a
			: typeof a === 'object' && typeof a.length === 'number'
			? __map(a, (x) => x)
			: [a];



const concat = a => b => b.concat(a);

const map = fn => a => __map(a, fn);

const chain = fn => a => typeof a.flatMap === 'function'
			? a.flatMap(fn)
			: __foldl(a, [], (b, x) => b.concat(fn(x)));

const select = fn => a => __select(a, fn);

const reject = fn => a => __reject(a, fn);

const foldl = fn => a => b => __foldl(b, a, fn);

const foldr = fn => a => b => __foldr(b, a, fn);

const traverse = toF => fn => a => __foldl(
	a,
	toF([]),
	(F, x) => fn(x).map(concat).ap(F)
);

const sequence = toF => traverse(toF)((x) => x);

const keep = select(x => x != null);

const ap = fs => a => __map(a, (x) => __foldl(fs, x, (_x, _f) => _f(_x)));

const nth = n => a => Math.abs(n) >= a.length
			? a[a.length - 1]
			: a[Math.abs(n)];

const first = nth(0);

const second = nth(1);

const third = nth(2);

const fourth = nth(3);

const fifth = nth(4);

const sixth = nth(5);

const seventh = nth(6);

const last = a => a[a.length - 1];

const butFirst = a => a.slice(1);

const butLast = a => a.slice(0, a.length - 1);

const take = n => a => a.slice(0, n);

const drop = n => a => a.slice(n);

const pairwise = a => __mmap(a, (x, y) => [x, y]); 



module.exports = {
	of, is, empty, zero, lift, concat, map, chain, select, reject, foldl, foldr,
	traverse, sequence, keep, ap, first, second, third, fourth, fifth, sixth,
	seventh, last, butFirst, butLast, take, drop, pairwise
};
