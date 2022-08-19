const path = require('path');
const fs = require('fs-extra');
const { compl, converge } = require('./utils/lambda');
const Async = require('./utils/async');
const List = require('./utils/list');



/* ====== GLOBAL CONSTANTS ====== */
const UTF8 = 'utf8';

const COMMENT_REGEX = /\/\*[a-z0-9\\\/\s\-_\?\!\+\*\#\(\)\:\.]+\*\/(\r|\n|\r\n)+/ig;
const SIBILANT_REGEX = function () { return /\.sibilant$/g; };
const JAVASCRIPT_REGEX = function () { return /\.js$/g; };
const SLISP_REGEX = function () { return /\.slisp$/g; };

const MACRO_FILE = 'macros.sibilant';

const getCwd = process.cwd.bind(process);

const pjoin = path.join.bind(path);

const pnormal = path.normalize.bind(path);

const getMacroPath = () => pjoin(__dirname, '..', 'lang', MACRO_FILE);

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
	x => regex().test(x)
]);

const isSibilantFile = isFileT(SIBILANT_REGEX);
const isJavaScriptFile = isFileT(JAVASCRIPT_REGEX);
const isSLispFile = isFileT(SLISP_REGEX);



const and = predicates => x => List.foldl((bool, p) => bool && p(x))(true)(predicates);
const or = predicates => x => List.foldl((bool, p) => bool || p(x))(false)(predicates);



const replace = pattern => repl => a => String(a).replace(pattern, repl);



const optPairs = compl(
	List.pairwise,
	List.drop(1)
);



module.exports = {
  optPairs,
  and,
  or,
  over,
  replace,
  UTF8,
  COMMENT_REGEX,
  pjoin,
  pnormal,
  getCwd,
  getMacroPath,
  isSLispFile,
  isJavaScriptFile,
  isSibilantFile,
  isFile,
  isDir,
  readFile,
  writeFile,
  readDir,
  writeDir,
  emptyDir,
  deleteDir
};
