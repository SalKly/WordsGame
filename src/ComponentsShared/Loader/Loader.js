import React from 'react'
import LoaderSpinner from "../../Assests/Loader.json";

import Lottie from "lottie-react";
import "./Loader.css"


function Loader() {
  return (
    <div className='Loader'>
      <Lottie animationData={LoaderSpinner} loop={true} />
    </div>)
}

export default Loader