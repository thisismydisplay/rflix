import './VideoList.css';
import './Swiper.css';
import '../VideoThumbnail/VideoThumbnail.css';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import VideoThumbnail from '../VideoThumbnail';

function VideoList({ videos, mylist }) {
    const genres = [
        'Nature',
        'Cartoons',
        'Comedy',
        'Drama',
        'Horror',
        'Action & Adventure',
    ];

    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
    );
    const myListVideos = Object.values(videos).filter((video) =>
        profile.watchlistVideos.includes(video.id)
    );
    if (!profile) return <Redirect to='/profile' />;
    return (
        <>
            {mylist && (
                <>
                    {myListVideos.length > 0 ? (
                        myListVideos.map((video, i) => (
                            <div
                                className='video-thumb-container-list'
                                key={`my-list-${i}`}
                            >
                                <VideoThumbnail
                                    profile={profile}
                                    video={video}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='my-list-no-videos-yet-text'>
                            You haven't added any videos to My List yet.
                        </div>
                    )}
                </>
            )}

            <div className='my-list-browse-container'>
                {!mylist && myListVideos.length > 0 && (
                    <div className='video-carousel-wrapper'>
                        <div className='video-carousel-wrapper'>
                            <div className='video-list-title'>My List</div>
                            {/* <div className='video-list-wrapper'> */}
                            <Swiper
                                slidesPerView={5}
                                spaceBetween={0}
                                slidesPerGroup={5}
                                // height={160}
                                loop={true}
                                // slidesOffsetAfter={100}
                                // slidesOffsetBefore={100}
                                loopFillGroupWithBlank={true}
                                pagination={{
                                    clickable: true,
                                    type: 'progressbar',
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                style={{ overflow: 'visible' }}
                                className='video-list-wrapper'
                            >
                                {myListVideos.map((video, i) => (
                                    // <div key={`browse-list-${i}`}>
                                        <SwiperSlide className='video-thumb-container' key={`browse-list-${i}`}>
                                            <VideoThumbnail
                                                profile={profile}
                                                video={video}
                                            />
                                        </SwiperSlide>
                                    // </div>
                                ))}
                            </Swiper>
                            {/* </div> */}
                        </div>
                    </div>
                )}
            </div>

            <div className='browse-genre-container'>
                {!mylist &&
                    genres.map((genre, i) => (
                        <React.Fragment key={`genre-${i}`}>
                            <div
                                className='video-list-title'
                                key={`genre-div-${i}`}
                            >
                                {genre}
                            </div>
                            <Swiper
                                key={`genre-swiper-${i}`}
                                slidesPerView={5}
                                spaceBetween={0}
                                slidesPerGroup={5}
                                // observer={true}
                                // observeParents={true}
                                // observeSlideChildren={true}
                                // preloadImages={false}
                                // lazy={{enabled: true, loadOnTransitionStart: true}}
                                // virtual={true}
                                // height={160}
                                loop={true}
                                // slidesOffsetAfter={100}
                                // slidesOffsetBefore={100}
                                loopFillGroupWithBlank={true}
                                pagination={{
                                    clickable: true,
                                    type: 'progressbar',
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                style={{ overflow: 'visible' }}
                                className='video-list-wrapper'
                            >
                                {Object.values(videos).map((video, i) => (
                                    // <div key={`${genre}-${i}-${video.id}`}>
                                        video.genre === genre && (
                                            <SwiperSlide key={`inner-${genre}-${video.id}`} className='video-thumb-container'>
                                                <VideoThumbnail
                                                    profile={profile}
                                                    video={video}
                                                />
                                            </SwiperSlide>
                                        )
                                    // </div>
                                ))}
                            </Swiper>
                        </React.Fragment>
                    ))}
            </div>
        </>
    );
}

export default VideoList;
