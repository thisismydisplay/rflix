import './BrowsePage.css';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom'



import React, { useState } from 'react';

function BrowsePage () {

  return (
      <ReactPlayer
          playing
          width='100%'
          height='50%'
          controls={false}
          volume={0}
          url="https://archive.org/download/Destroy_All_Planets/Destroy_All_Planets_512kb.mp4"
/>
// map movies in carousels by genre

);
}

export default BrowsePage
