import React from 'react'

export default function Icon( { type, iconId, onClick } ) {
  return (<div className={ `input-group-${type}` } onClick={ onClick }>
          <span className='input-group-text'>
            <i className={ `fa fa-${iconId}` }/>
          </span>
  </div>)
}