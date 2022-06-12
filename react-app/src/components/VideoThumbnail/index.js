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
            <ReactPlayer
                volume={0}
                playing={profile.autoplayHover && isHover}
                url={video.videoUrl}
                width={isHover ? '300px' : '200px'}
                height={isHover ? '300px' : '200px'}
            />
        </div>
    );
}

export default VideoThumbnail;
