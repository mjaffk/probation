import React from 'react'

export default function Input( {
                                       input, placeholder, type, meta : { touched, error, warning }, icon : icon = 'user',
                                     } ) {
  return (
  <div className={`form-group text-left ${(!error) ? '' : 'has-danger' }`}>
    <div className={`input-group ${(!error) ? '' : 'rounded border-danger' }`}>
      {icon && <div className='input-group-prepend'>
          <span className='input-group-text'>
            <i className={`fa fa-${icon}`}/>
          </span>
      </div>}
      <input {...input} className='form-control' type={type} placeholder={placeholder}/>
    </div>
    { touched && (error && <span className="form-control-feedback text-danger">{ error }</span>) }
  </div>
  )

}

