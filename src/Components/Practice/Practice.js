import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Button from '../../ComponentsShared/Button/Button';
import Error from '../../ComponentsShared/Error/Error';
import Loader from '../../ComponentsShared/Loader/Loader';
import Logo from '../../ComponentsShared/Logo/Logo';
import useFetch from '../../Hooks/useFetch';
import './Practice.css'
import PracticeProgressBar from './PracticeProgressBar';


function Practice() {
  const [WordsList, SetWordList] = useState(null);

  const [PointsCounter, SetPointsCounter] = useState(0);
  const [Score, SetScore] = useState(null);
  const [ChoosenBtn, SetChoosenBtn] = useState([-1, ""]);
  const [Color, SetColor] = useState(['#D91E75 ', '#0367A6 ', '#8BBF1B ', '#F29F05'])
  let navigate = useNavigate();
  const { data, loading, error } = useFetch("https://nagwawordspractice.onrender.com/");




  useEffect(() => {
    if (data) {
      SetWordList(data)

    }
    // ON component mount we fetch the 10 random words and add them to the wordsList


  }, [data])

  /* 
1)We check if the answer is correct then we icrement the pointer 
2) we will pop an object from it so the new word can be shown 
3)as the WordList changed the UseEffect depending on it will trigger and it will check if WordsList is empty 
 which will mean that user finished the words so we Set the Score and then after the score is setted we The
 USeEffect depending on the Score will be triggered and it will send us to the Rank page 

*/

  function CheckAnswer(e, index) {

    let Inputvalue = e.target.value
    let CurrentWordValue = WordsList[WordsList.length - 1].pos
    if (Inputvalue === CurrentWordValue) {
      SetPointsCounter((prev) => prev = prev + 1)
      SetChoosenBtn([index, "Correct"])
    }
    else {
      SetChoosenBtn([index, "False"])
    }

    setTimeout(() => {
      SetColor((prev) => {
        let color = prev.pop();
        prev.unshift(color);
        return [...prev];



      })
      SetWordList((prev) => {
        prev.pop();
        return [...prev];
      })

      SetChoosenBtn((prev) => {
        return ([-1, ...prev[1]])
      })


    }, 1000)


  }

  useEffect(() => {
    if (WordsList !== null) {

      if (WordsList.length === 0) {
        SetScore(
          ((PointsCounter / 10) * 100)
        )

        // navigate("Rank")      //Go to Rank

      }

    }

  }, [WordsList, PointsCounter, navigate])

  useEffect(() => {
    if (Score !== null) {
      navigate("Rank", { state: Score })
    }

  }, [Score, navigate])





  if (loading) {
    return <Loader></Loader>

  }


  if (error) {
    console.log(error);
    return <Error error={error}></Error>
  }


  return (
    <div className='PracticeSection' >
      <Logo />

      <div style={{ backgroundColor: Color[Color.length - 1] }} className='PracticeContainer'>
        <div className='ProgressBar'>
          <PracticeProgressBar ChoosenBtn={ChoosenBtn} />


        </div>
        <h1 >{WordsList !== null && WordsList.length !== 0 && WordsList[WordsList.length - 1].word}</h1>
        <div className='PracticeBtnContainer'>
          {["verb", "noun", "adverb", "adjective"].map((item, index) => {
            return <Button value={item} index={index} ChoosenBtn={ChoosenBtn} key={index} CheckAnswer={CheckAnswer}></Button>

          })}

        </div>
      </div>
    </div >

  )
}

export default Practice