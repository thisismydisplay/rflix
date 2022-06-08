import './BrowsePage.css';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom'



import React, { useState } from 'react';

function BrowsePage () {

  return (
      <ReactPlayer
          playing
          width='100%'
          height='100%'
          controls
          url="https://youtu.be/-dsy5fJoMq4"
/>);
}

export default BrowsePage
