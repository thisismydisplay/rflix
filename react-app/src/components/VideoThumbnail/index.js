import './VideoThumbnail.css';

import ReactPlayer from 'react-player';

import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

function VideoThumbnail({ video, profile }) {
    const [isHover, setIsHover] = useState(false);
    const history = useHistory();
    const handleClick = () => {
        history.push(`/video/${video.id}`);
    };

    return (
        <div
            className='video-thumb-wrapper'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={video.id}
            onClick={handleClick}
        >
            <div className={isHover ? 'thumbnail-overlay' : 'hidden-thumbnail-overlay' }>
                <div>{video.title}</div>
            </div>
            <ReactPlayer
                volume={0}
                playing={profile.autoplayHover && isHover}
                url={video.videoUrl}
                width={isHover ? '260px' : '180px'}
                height={isHover ? '180px' : '140px'}
            />
            {/* <div className={isHover ? 'thumbnail-overlay' : 'hidden-thumbnail-overlay' }>
                <div>{video.description}</div>
            </div> */}
        </div>
    );
}

export default VideoThumbnail;

// import './VideoThumbnail.css';

// import play from '../../images/play-btn.png';
// import add from '../../images/plus-grey.png';
// import muted from '../../images/muted-btn.png';
// import unmuted from '../../images/unmuted-btn.png';
// import expandDownArrow from '../../images/expand-down.png';

// import ReactPlayer from 'react-player';

// import React, { useState } from 'react';

// import { useHistory } from 'react-router-dom';

// function VideoThumbnail({ video, profile }) {
//     const [isHover, setIsHover] = useState(false);
//     const [isMuted, setIsMuted] = useState(true);
//     const history = useHistory();
//     const handleClick = () => {
//         history.push(`/video/${video.id}`);
//     };

//     return (
//         <div
//             className='video-thumb-wrapper'
//             onMouseEnter={() => setIsHover(true)}
//             onMouseLeave={() => setIsHover(false)}
//             key={video.id}
//             onClick={handleClick}
//         >

//                 <img
//                     className={
//                         isHover ? 'thumbnail-overlay' : 'hidden-thumbnail-overlay'
//                     }
//                     src={isMuted ? muted : unmuted}
//                     alt='mute button'
//                     onClick={() => setIsMuted(!isMuted)}
//                 />

//             <ReactPlayer
//                 className='player-thumbnail'
//                 volume={isMuted ? 0 : profile.defaultVolume}
//                 playing={profile.autoplayHover && isHover}
//                 url={video.videoUrl}
//                 width={isHover ? '300px' : '200px'}
//                 height={isHover ? '300px' : '200px'}
//             />
//             <div
//                 className='thumbnail-description'
//                 style={isHover ? { display: 'fixed' } : { display: 'none' }}
//             >
//                 <div>{video.title}</div>
//                 <div>{video.description}</div>
//             </div>
//         </div>
//     );
// }

// export default VideoThumbnail;
