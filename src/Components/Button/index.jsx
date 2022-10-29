import React from 'react'

import './style.scss';

const Button = (props) => {
  const { title, onClick, padding } = props;

  return (
    <div
      className='button'
      onClick={() => onClick()}
      style={{
        padding: padding
      }}
    >
      <p>{title}</p>
    </div>
  )
}

export default Button