import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import useFetch from '../../Hooks/useFetch';
import Lottie from "lottie-react";
import Celebration from '../../Assests/Celebration.json'
import { useNavigate } from "react-router-dom";

import { ReactComponent as Rank90 } from '../../Assests/rank90.svg';
import { ReactComponent as RankGoodFirstTime } from '../../Assests/rankGoodFirstTime.svg';
import { ReactComponent as RankBadFirstTime } from '../../Assests/rankBadFirstTime.svg';
import { ReactComponent as RankImprove } from '../../Assests/rankImprove.svg';
import { ReactComponent as RankImproveHigh } from '../../Assests/rankImproveHigh.svg';
import { ReactComponent as RankImproveFail } from '../../Assests/rankImproveFail.svg';



import "./Rank.css"
import Loader from '../../ComponentsShared/Loader/Loader';
import Error from '../../ComponentsShared/Error/Error';
import Logo from '../../ComponentsShared/Logo/Logo';

function Rank() {
  const { state } = useLocation();
  const { data, loading, error } = useFetch("https://nagwawordspractice.onrender.com/", state);
  const [Rank, SetRank] = useState("");
  let navigate = useNavigate();

  const [PageState, SetPageState] = useState({
    Celebrate: false,
    CustomText: "",
    CustomImage: "",
  })

  /* 
  3 cases 
  1)if rnak is 90 or higher then send him to celevration with custom text for rank 90
  2)  if  there is no data in the storage which means it is his first time so 
       a)if rank  higher then 60 celebrate 
       b)add text of first time and celevration
       
  3)if there is data found in local storage then compare it with the new rank if the new rank is higher celebrate and show
  the custom rank higher celevration and if lower then show the custom text 
  */

  useEffect(() => {
    if (!state) {
      navigate('/')
    }

    if (data) {
      SetRank(data);
      let currentRank = parseFloat(data)

      if (PageState.CustomImage === "") {
        const prevRank = JSON.parse(localStorage.getItem('rank'));
        if (currentRank >= 90) {
          SetPageState({
            Celebrate: true,
            CustomText: "You did it!",
            CustomImage: <Rank90 />
          })

        }
        else {
          if (!prevRank) {
            if (currentRank >= 60) {
              SetPageState({
                Celebrate: true,
                CustomText: "Ranking" + { currentRank } + "from the first try is an indicator of how brillinat you are!",
                CustomImage: <RankGoodFirstTime />
              })

            }
            else {
              SetPageState({
                Celebrate: false,
                CustomText: "Keep going you can do it!",
                CustomImage: <RankBadFirstTime />
              })

            }
          }
          else {
            if (currentRank > prevRank) {
              if (currentRank - prevRank > 10) {
                SetPageState({
                  Celebrate: true,
                  CustomText: "Your Previous Rank was " + prevRank + " You are improving Significantly ,Keep going!",
                  CustomImage: <RankImproveHigh />
                })

              }
              else {
                SetPageState({
                  Celebrate: true,
                  CustomText: "Your Previous Rank was " + prevRank + " never underestimate the power of small steps ,Keep going!",
                  CustomImage: <RankImprove />
                })

              }



            }
            else {
              SetPageState({
                Celebrate: false,
                CustomText: "Your Previous Rank was " + prevRank + " Success was never a straight line keep going consistency is the key",
                CustomImage: <RankImproveFail />
              })


            }

          }


        }

      }




    }
    //Send to the end point a psot request iwth the state and wait for the data
    //send a post request to add this rank and then get all the user ranks and dispay them
    //is like a list?

  }, [data])



  function handlePress() {
    localStorage.setItem('rank', JSON.stringify(parseFloat(data)));
    navigate("/")

  }

  if (loading) {

    return <Loader></Loader>
  }

  if (error) {
    return <Error error={error}></Error>
  }
  return (
    <div className='RankSection'>
      <Logo />
      <div className='AnimationCont'>
        {PageState.Celebrate && <Lottie animationData={Celebration} loop={false} />}
      </div>
      <div className='RankCont'>
        <div className='RankContImage'>
          {PageState.CustomImage}
        </div>
        <h1 className='RankContRank'>Your rank is {Rank}</h1>
        <h2>{PageState.CustomText}</h2>
        <button onClick={handlePress} className='btn  RankBtn' >Try again</button>
      </div>


    </div>
  )
}

export default Rank