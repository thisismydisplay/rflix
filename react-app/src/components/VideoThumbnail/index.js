// import './VideoThumbnail.css';
// import '../../index.css';
// import ReactPlayer from 'react-player';
// import { findDOMNode } from 'react-dom';

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectProfile } from '../../store/profile';
// import { Redirect } from 'react-router-dom';

// function VideoThumbnail({ video, profile }) {
//     const profile = useSelector(
//         (state) => state.profile.profiles[state.profile.currentProfileId]
//     );
//     const [isHover, setIsHover] = useState(false)
//     //HOVER SETS ALL VIDEOS, NEED TO SEPERATE INTO COMPONENT

//     console.log(profile);
//     if (!profile) return <Redirect to='/profile' />;
//     return (

//                 <div className='video-thumb-wrapper' onMouseEnter={()=> setIsHover(true)} onMouseLeave={() => setIsHover(false)} key={video.id}>
//                     <ReactPlayer
//                         volume={0}
//                         playing={profile.autoplayHover && isHover}
//                         url={video.videoUrl}
//                         width='200px'
//                         height='200px'
//                         // active={currentProfile?.id === profile.id}

//                     />
//                 </div>

//         // map movies in carousels by genre
//     );
// }

// export default VideoThumbnail;
