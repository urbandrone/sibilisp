const path = require('path');
const fs = require('fs-extra');
const sibilant = require('sibilant');
const { compl, converge } = require('./utils/lambda');
const Str = require('./utils/string');
const Async = require('./utils/async');
const List = require('./utils/list');



/* ====== GLOBAL CONSTANTS ====== */
const UTF8 = 'utf8';

const COMMENT_REGEX = /\/\*[a-z0-9\\\/\s\-_\?\!\+\*\#\(\)\:\.]+\*\/(\r|\n|\r\n)+/ig;
const SIBILANT_REGEX = /\.sibilant$/g;
const JAVASCRIPT_REGEX = /\.js$/g;
const SLISP_REGEX = /\.slisp$/g;

const MACRO_FILE = 'macros.sibilant';
const PROCS_FILE = 'prelude.sibilant';

const getCwd = process.cwd.bind(process);

const pjoin = path.join.bind(path);

const getMacroPath = () => pjoin(__dirname, '..', 'lang', MACRO_FILE);
const getProcsPath = () => pjoin(__dirname, '..', 'lang', PROCS_FILE);


/* ====== HELPER FUNCTIONS ====== */
const over = prop => fn => obj => {
	return prop in obj
		? Object.assign({}, obj, { [prop]: fn(obj[prop]) })
		: obj;
};

const readFile = fpath => {
	return Async.lift((rej, res) => {
		fs.readFile(fpath, UTF8, (err, fdata) => {
			if (err) {
				return rej(err);
			}
			return res({
				file: fpath,
				code: fdata
			});
		});
	});
};

const writeFile = file => {
	return Async.lift((rej, res) => {
		fs.outputFile(file.path, file.code, UTF8, err => {
			if (err) {
				return rej(err);
			}
			return res(file.path);
		});
	});
};

const readDir = dpath => {
	return Async.lift((rej, res) => {
		fs.readdir(dpath, UTF8, (err, contents) => {
			if (err) {
				return rej(err);
			}
			return res([dpath, contents]);
		});
	});
};

const writeDir = (dpath, mode = 0o2777) => {
	return Async.lift((rej, res) => {
		fs.ensureDir(dpath, mode, err => {
			if (err) {
				return rej(err);
			}
			return res(dpath);
		});
	});
};

const emptyDir = dpath => {
	return Async.lift((rej, res) => {
		fs.emptyDir(dpath, err => {
			if (err) {
				return rej(err);
			}
			return res(dpath);
		});
	});
};

const deleteDir = dpath => {
	return Async.lift((rej, res) => {
		fs.remove(dpath, err => {
			if (err) {
				return rej(err);
			}
			return res(dpath);
		});
	});
};



/* ====== FILTER FUNCTIONS ====== */

const toStat = fs.statSync.bind(fs);

const isDir = compl(toStat,	x => x.isDirectory());

const isFile = compl(toStat, x => x.isFile());

 

const isFileT = regex =>  converge((fp, tp) => Boolean(fp && tp))([
	isFile,
	x => regex.test(x)
]);

const isSibilantFile = isFileT(SIBILANT_REGEX);
const isJavaScriptFile = isFileT(JAVASCRIPT_REGEX);
const isSLispFile = isFileT(SLISP_REGEX);



const and = predicates => x => List.foldl((bool, p) => bool && p(x))(true)(predicates);
const or = predicates => x => List.foldl((bool, p) => bool || p(x))(false)(predicates);



/* ====== PROG DEFINITIONS ====== */
// ------ FILE SELECTION ------
const injectPreludeFunctions = flist => {
	// { file :: String, code :: String }
	return flist.concat(getProcsPath());
};

const findFilesInSrc = dpath => {
	return compl(
		Async.of,
		Async.chain(readDir),
		Async.map(([p, files]) => List.map(file => pjoin(p, file))(files)),
		Async.map(injectPreludeFunctions),
		Async.map(List.select(or([
		  isDir,
			isSibilantFile,
			isJavaScriptFile,
			isSLispFile
		])))
	)(dpath);
};



// ------ SOURCE MANIPULATION ------
const injectPrelude = fdata => {
	return `(import-namespace prelude)\n(include "${getMacroPath()}")\n\n` + fdata;
};

const removeComments = Str.
			replace(COMMENT_REGEX)('');



const transpile = compl(
	injectPrelude,
	sibilant,
	x => x.js,
	removeComments
);



const handleFilesInSrc = files => {
	return List.foldl(
		(asnc, file) => isDir(file)
			? compl(
					findFilesInSrc,
					Async.chain(handleFilesInSrc),
					Async.chain(x => Async.map(List.concat(x))(asnc))
			)(file)
			: isJavaScriptFile(file)
			? compl(
					readFile,
					Async.chain(x => Async.map(List.concat({
						path: file,
						code: x
					}))(asnc))
			)(file)
			: compl(
					readFile,
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
	Str.replace('.sibilant')('.js'),
	Str.replace('.slisp')('.js'),
	Str.replace(from)(to)
);

const alterPreludePath = to => fpath => {	
	return /sibilisp\/lang\/prelude.js$/.test(fpath)
		? pjoin(to, 'sibilisp-prelude.js')
		: fpath;
}

const copyFilesToDest = (spath, dpath, f = null) => files => {
	return compl(
		List.map(f ? f : over('path')(alterPathAndType(dpath)(spath))),
		List.map(over('path')(alterPreludePath(dpath))),
		List.foldl(
			(asnc, file) =>
				compl(
					writeFile,
					Async.chain(fpath => Async.map(List.concat(fpath))(asnc))
				)(file)
		)(
			compl(
				Async.of,
				Async.chain(emptyDir),
				Async.map(List.empty)
			)(dpath)
		)
	)(files);
};



const main = options => {
	const src = pjoin(getCwd(), options.src);
	const dest = pjoin(getCwd(), options.dest);
	
	const transpileFiles = compl(
		findFilesInSrc,
		Async.chain(handleFilesInSrc),
		Async.chain(copyFilesToDest(src, dest))
	);
	
	return emptyDir(dest).then(_ => compl(
		transpileFiles,
		Async.map(() => 'done!')
	)(src));
};



module.exports = main;
