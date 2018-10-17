export default function arrToObj(arr) {
	return arr.map(item => ({
		index: item,
		value: item
	}))
}