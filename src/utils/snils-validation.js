/**
 * Validate snils
 * @see http://www.kholenkov.ru/data-validation/snils/
 * @param {string} snils - input snils string
 * @param {Object} error - object for adding error
 * @return {boolean} valid snils o not
 */
export default function validateSnils(snils, error) {
	let result = false;
	if (typeof snils === 'number') {
		snils = snils.toString();
	} else if (typeof snils !== 'string') {
		snils = '';
	}
	if (!snils.length) {
		error.code = 1;
		error.message = 'СНИЛС пуст';
	} else if (/[^0-9]/.test(snils)) {
		error.code = 2;
		error.message = 'СНИЛС может состоять только из цифр';
	} else if (snils.length !== 11) {
		error.code = 3;
		error.message = 'СНИЛС может состоять только из 11 цифр';
	} else {
		let sum = 0;
		for (let i = 0; i < 9; i++) {
			sum += parseInt(snils[i], 10) * (9 - i);
		}
		let checkDigit = 0;
		if (sum < 100) {
			checkDigit = sum;
		} else if (sum > 101) {
			checkDigit = parseInt(sum % 101, 10);
			if (checkDigit === 100) {
				checkDigit = 0;
			}
		}
		if (checkDigit === parseInt(snils.slice(-2), 10)) {
			result = true;
		} else {
			error.code = 4;
			error.message = 'Неправильное контрольное число';
		}
	}
	return result;
}