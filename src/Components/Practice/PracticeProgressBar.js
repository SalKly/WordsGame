import React, { useEffect, useState } from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import Lottie from "lottie-react";
import CheckMark from "../../Assests/CheckMark.json";
import WrongAnswer from "../../Assests/WrongAnswer.json";

/*Each time the user Choose an answer the choosen btn is set to here we make a state of history to keep track 
of all the choosen btns values as each one  is needed to keep a history of the faults and correects answer in the progress bar  
  */

function PracticeProgressBar({ ChoosenBtn }) {
  const [Progress, SetProgress] = useState(0);
  const [History, SetHistory] = useState([]);
  useEffect(() => {
    if (ChoosenBtn[0] !== -1) {
      SetHistory((prev) => {
        return ([...prev, ChoosenBtn])
      })
      SetProgress((prev) => prev = prev + 10)
    }
  }, [ChoosenBtn])
  return (
    <ProgressBar
      percent={Progress}
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)">
      <Step transition="scale">
        {({ accomplished }) => (
          <div></div>


        )}
      </Step>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
        return (
          <Step key={index} transition="scale">
            {({ accomplished }) => (
              <div style={{
                filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: !accomplished ? ' #f2f2f2'
                  : History[index][1] === "Correct" ? '#38c172' : '#CC7272'
              }} className='Circle'>
                {accomplished && <div className='MarkHolder'><Lottie animationData={History[index][1] === "Correct" ? CheckMark : WrongAnswer} loop={false} /></div>}
              </div>

            )}
          </Step>
        )


      })}







    </ProgressBar>)
}

export default PracticeProgressBar