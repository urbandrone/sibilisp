const { compl } = require('./utils/lambda');
const Async = require('./utils/async');
const List = require('./utils/list');
const transpile = require('./transpiler');
const repl = require('./repl');
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



const alterPathAndType = (to, from, type) => compl(
	util.replace('.sibilant')(type),
	util.replace('.slisp')(type),
	util.replace(from)(to)
);


const copyFilesToDest = (spath, dpath, ftype) => files => {
	return compl(
		List.map(util.over('path')(alterPathAndType(dpath, spath, ftype))),
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
		// filetype :: String js/mjs
		key === '--src' || key === '-s'
			? Object.assign(opts, { src: value })
			: key === '--dest' || key === '-d'
			? Object.assign(opts, { dest: value })
      : key === '--filetype' || key === '-f'
      ? Object.assign(opts, { ftype: (value === 'mjs' || value === 'js' ? '.' + value : '.js') })
      : key === '--repl' || key === '-r'
      ? Object.assign(opts, { repl: true })
			: opts
	)(
		{ ftype: '.js' }
	)(
		util.optPairs(process.argv)
	);

  if (options.repl) {
    return {
      type: 'repl',
      cmd: () => Async.lift((_, res) => res(repl()))
    }
  }

	if (!options.src) { throw new Error('Sibilisp CLI: Missing --src/-s argument.'); }
	if (!options.dest) { throw new Error('Sibilisp CLI: Missing --dest/-d argument.'); }
	
	const src = util.pjoin(util.getCwd(), options.src);
	const dest = util.pjoin(util.getCwd(), options.dest);
	
  return {
    type: 'compile',
    cmd: () => util.emptyDir(dest).then(_ => compl(
      findFilesInSrc,
      Async.chain(handleFilesInSrc),
      Async.chain(copyFilesToDest(src, dest, options.ftype)),
      Async.map(() => 'done!')
    )(src))
  }
};



module.exports = main;
