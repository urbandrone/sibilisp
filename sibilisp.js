const { compl } = require('./src/utils/lambda');
const List = require('./src/utils/list');
const runTranspiler = require('./src/transpiler');

const log = console.log.bind(console);
const err = console.error.bind(console);



const optPairs = compl(
	List.pairwise,
	List.drop(1)
)

const options = List.foldl(
	(opts, [key, value]) => 
		// src :: String
		// dest :: String
		// entry :: String
	Object.assign(opts, { [key]: value })
)(
	{}
)(
	optPairs(process.argv)
);


runTranspiler(options).then(log).catch(err);
