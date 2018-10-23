/**
 * Prepare data to be used in select options
 * @param {Array} arr
 * @return {Object}
 */
export default function arrToObj(arr) {
	return arr.map(item => ({
		index: item,
		value: item
	}))
}