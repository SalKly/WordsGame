import React from 'react'
import { ReactComponent as ErrorBackGround } from '../../Assests/Error.svg';
import "./Error.css"

function Error({ error }) {

  return (
    <div className='ErrorCont'>
      <div className='ErrorImgCont'>
        <ErrorBackGround />
      </div>
      <h1 className='ErrorMsg'>{error.message}</h1>
    </div>
  )
}

export default Error