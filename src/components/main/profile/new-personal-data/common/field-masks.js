import {createTextMask} from "redux-form-input-masks"

export const snilsMask = createTextMask({
	pattern: "999-999-999 99",
	placeholder: 'Χ'
})

export const phoneMask = createTextMask({
	pattern: "+7(999)-999-99-99",
	placeholder: 'Χ'
})