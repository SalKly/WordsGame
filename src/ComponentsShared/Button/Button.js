import React from 'react'
import './Button.css';

function Button({ value, CheckAnswer, index, ChoosenBtn }) {

  /*Check if the choosen button is this button then according to the answer Set the background color and also dismess all buttons 
     when ChoosenBtn not equal -1 as the Choosenbutton consist of [indexof the button,answer(correct or false)] and after each answer 
     we reset the Choosenbtn back to -1 again so the buttons become pressable
  */
  return (
    <button className='btn btnMain' style={ChoosenBtn[0] === index ?
      ChoosenBtn[1] === 'False' ? { backgroundColor: 'red' } : { backgroundColor: 'Green' }
      : null} disabled={ChoosenBtn[0] !== -1} value={value} onClick={(e) => CheckAnswer(e, index)} > {value}
    </button>
  )
}

export default Button