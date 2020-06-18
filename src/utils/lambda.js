// License



const compl = (f, ...fs) => (...args) => fs.
			reduce(
				(x, cc) => cc(x),
				f(...args)
			);

const compr = (...fs) => (...args) => fs.
			slice(0, -1).
			reduceRight(
				(x, cc) => cc(x),
				fs[fs.length - 1](...args)
			);

const converge = f => gs => (...args) =>
			f(...gs.map(g => g(...args)));

const call = f => (...args) =>
			args.length < 2
			? f(args[0])
			: f(...args);

const send = f => target => (...args) =>
			typeof f === 'function'
			? call(f.bind(target))(...args)
			: typeof f === 'string' && f in target
			? call(target[f].bind(target))(...args)
			: ((x, y) => {
				throw new TypeError('Cannot send ' + x + ' to ' + y);
			})(f, target);



module.exports = {
	compl, compr, converge, call, send
};
