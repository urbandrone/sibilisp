const rollup = require('rollup');
const buble = require('@rollup/plugin-buble');
const json = require('@rollup/plugin-json');
const terser = require('rollup-plugin-terser');
const { compl, converge } = require('./utils/lambda');
const Async = require('./utils/async');


const inputOptions = entry => {
	return {
		// external, // currently not in use, but needed sooner or later
		input: entry
	};
};

const outputOptions = dpath => {
	return {
		dir: dpath,
		file: 'app.min.js',
		format: 'umd', // required
		// globals, // currently not in use, needed when inputOptions external comes
		name: 'App',
		plugins: [
			buble(),
			terser()
		]
	};
};



const makeInMemoryBundle = iopts => rollup.rollup(iopts);

const makeOutputBundle = oopts => inMemory => inMemory.write(oopts);

const make = converge(
	(iopt, oopt) => Async.chain(makeOutputBundle(oopt), makeInMemoryBundle(iopt))
	[
		(entry, _) => inputOptions(entry),
		(_, dpath) => outputOptions(dpath)
	]
);



const bundle = (entry = 'main.js') => (dpath = 'build/') => {
	console.log(entry, dpath);
	return make(entry, dpath);
};



module.exports = bundle;
