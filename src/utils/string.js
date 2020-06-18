const replace = pattern => replv => str => str.
			replace(pattern, replv);

const split = pattern => str => str.split(pattern);

const toChars = split('');


module.exports = {
	replace, split, toChars
}
