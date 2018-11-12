import React from 'react'

export const Button = ({className, title, ...rest}) => {
	return <button type="button" className={`btn ${className}`} {...rest}>{title}</button>
}

export const Submit = ({className, title, ...rest}) => {
	return <button type="submit" className={`btn ${className}`} {...rest}>{title}</button>
}