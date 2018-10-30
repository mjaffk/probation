/**
 * @param {string} str - string which should be formed from 11 number to snils
 * @return {string} string in snils format (ххх-ххх-ххх хх)
 */
export function formatToSnils(str) {
	if (!str || (str && str.length < 11)) return ''
	let subst1 = str.slice(0, 3)
	let subst2 = str.slice(3, 6)
	let subst3 = str.slice(6, 9)
	let subst4 = str.slice(9)
	return [[subst1, subst2, subst3].join('-'), subst4].join(' ')
}

/**
 * @param {string} snils - string in snils format
 * @return {string} string formed as 11 numbers (ххххххххххх)
 *
 */
export function formatFromSnils(snils) {
	if (!snils ) return ''
	return snils.split('-').join('').split(' ').join('')
}

