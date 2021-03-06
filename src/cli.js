const { compl } = require('./utils/lambda');
const Async = require('./utils/async');
const List = require('./utils/list');
const transpile = require('./transpiler');
const util = require('./helpers');




/* ====== PROG DEFINITIONS ====== */

const findFilesInSrc = dpath => {
	return compl(
		Async.of,
		Async.chain(util.readDir),
		Async.map(([p, files]) => List.map(file => util.pjoin(p, file))(files)),
		Async.map(List.select(util.or([
		  util.isDir,
			util.isSibilantFile,
			util.isJavaScriptFile,
			util.isSLispFile
		])))
	)(dpath);
};



const handleFilesInSrc = files => {
	return List.foldl(
		(asnc, file) => util.isDir(file)
			? compl(
					findFilesInSrc,
					Async.chain(handleFilesInSrc),
					Async.chain(x => Async.map(List.concat(x))(asnc))
			)(file)
			: util.isJavaScriptFile(file)
			? compl(
					util.readFile,
					Async.chain(x => Async.map(List.concat({
						path: file,
						code: x
					}))(asnc))
			)(file)
			: compl(
					util.readFile,
					Async.chain(x => Async.map(List.concat({
						path: file,
						code: transpile(x.code)
					}))(asnc))
			)(file)
	)(
		Async.of(List.empty()),
	)(
		files
	);
};



const alterPathAndType = to => from => compl(
	util.replace('.sibilant')('.js'),
	util.replace('.slisp')('.js'),
	util.replace(from)(to)
);


const copyFilesToDest = (spath, dpath, f = null) => files => {
	return compl(
		List.map(f ? f : util.over('path')(alterPathAndType(dpath)(spath))),
		List.foldl(
			(asnc, file) =>
				compl(
					util.writeFile,
					Async.chain(fpath => Async.map(List.concat(fpath))(asnc))
				)(file)
		)(
			compl(
				Async.of,
				Async.chain(util.emptyDir),
				Async.map(List.empty)
			)(dpath)
		)
	)(files);
};



const main = () => {
	const options = List.foldl(
		(opts, [key, value]) => 
		// src :: String
		// dest :: String
		// entry :: String
		key === 'src' || key === '--src' || key === '-s'
			? Object.assign(opts, { src: value })
			: key === 'dest' || key === '--dest' || key === '-d'
			? Object.assign(opts, { dest: value })
			: opts
	)(
		{}
	)(
		util.optPairs(process.argv)
	);

	if (!options.src) { throw new Error('Sibilisp CLI: Missing src/--src/-s argument.'); }
	if (!options.dest) { throw new Error('Sibilisp CLI: Missing dest/--dest/-d argument.'); }
	
	const src = util.pjoin(util.getCwd(), options.src);
	const dest = util.pjoin(util.getCwd(), options.dest);
	
	return util.emptyDir(dest).then(_ => compl(
		findFilesInSrc,
		Async.chain(handleFilesInSrc),
		Async.chain(copyFilesToDest(src, dest)),
		Async.map(() => 'done!')
	)(src));
};



module.exports = main;
