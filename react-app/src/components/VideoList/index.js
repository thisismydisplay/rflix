import './VideoList.css';
import './Swiper.css';
import React from 'react';
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
        'Thriller/Horror',
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
                        myListVideos.map((video) => (
                            <div
                                className='video-thumb-container'
                                key={`my-list-${video.id}`}
                            >
                                <VideoThumbnail
                                    profile={profile}
                                    video={video}
                                    isMyListCarousel
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
                            <Swiper
                                key={`my-list-browse-swiper-`}
                                slidesPerView={2}
                                spaceBetween={5}
                                slidesPerGroup={1}
                                breakpoints={{
                                    600: {
                                      slidesPerView: 2,
                                      slidesPerGroup: 2,
                                      spaceBetween: 0,
                                      centeredSlides: false

                                    },
                                     900: {
                                      slidesPerView: 3,
                                      slidesPerGroup: 3,
                                      spaceBetween: 0,
                                       centeredSlides: false

                                    },
                                    1200: {
                                      slidesPerView: 4,
                                      slidesPerGroup: 4,
                                      spaceBetween: 0,
                                      centeredSlides: false
                                    },

                                     1500: {
                                       slidesPerView: 5,
                                       slidesPerGroup: 5,
                                       spaceBetween: 0,
                                       centeredSlides: false
                                     },

                                    1800: {
                                      slidesPerView: 6,
                                      slidesPerGroup: 6,
                                      spaceBetween: 0,
                                      centeredSlides: false
                                    }
                                  }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                style={{ overflow: 'visible' }}
                                pagination={{
                                clickable: false,
                                type: 'progressbar',
                                }}
                                className='video-list-wrapper'
                            >
                                {myListVideos.map((video) => (
                                    <SwiperSlide
                                        className='video-thumb-container'
                                        key={`browse-list-${video.id}`}
                                    >
                                        <VideoThumbnail
                                            profile={profile}
                                            video={video}
                                            isMyListCarousel
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
            </div>

            <div className='browse-genre-container'>
                {!mylist &&
                    genres.map((genre, i) => (
                        <React.Fragment key={`${genre}-${i}`}>
                            <div
                                className='video-list-title'
                                key={`${genre}-div-${i}`}
                            >
                                {genre}
                            </div>
                            <Swiper
                                key={`${genre}-swiper-${i}`}
                                slidesPerView={2}
                                spaceBetween={5}
                                slidesPerGroup={1}
                                // loop={true}
                                // loopFillGroupWithBlank={true}

                                // observer={true}
                                // observeParents={true}
                                // observeSlideChildren={true}
                                // preloadImages={false}
                                // lazy={{enabled: true, loadOnTransitionStart: true}}
                                // virtual={true}
                                // height={160}
                                // slidesOffsetAfter={100}
                                // slidesOffsetBefore={100}
                                // pagination={{
                                // clickable: true,
                                // type: 'progressbar',
                                // }}
                                breakpoints={{
                                    600: {
                                      slidesPerView: 2,
                                      slidesPerGroup: 2,
                                      spaceBetween: 0,
                                      centeredSlides: false

                                    },
                                     900: {
                                      slidesPerView: 3,
                                      slidesPerGroup: 3,
                                      spaceBetween: 0,
                                       centeredSlides: false

                                    },
                                    1200: {
                                      slidesPerView: 4,
                                      slidesPerGroup: 4,
                                      spaceBetween: 0,
                                      centeredSlides: false
                                    },

                                     1500: {
                                       slidesPerView: 5,
                                       slidesPerGroup: 5,
                                       spaceBetween: 0,
                                       centeredSlides: false
                                     },

                                    1800: {
                                      slidesPerView: 6,
                                      slidesPerGroup: 6,
                                      spaceBetween: 0,
                                      centeredSlides: false
                                    }
                                  }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                style={{ overflow: 'visible' }}
                                className='video-list-wrapper'
                            >
                                {Object.values(videos).map(
                                    (video, i) =>
                                        // <div key={`${genre}-${i}-${video.id}`}>
                                        video.genre === genre && (
                                            <SwiperSlide
                                                key={`inner-${genre}-${video.id}`}
                                                className='video-thumb-container'
                                            >
                                                <VideoThumbnail
                                                    profile={profile}
                                                    video={video}
                                                />
                                            </SwiperSlide>
                                        )
                                        // </div>
                                )}
                            </Swiper>
                        </React.Fragment>
                    ))}
            </div>
        </>
    );
}

export default VideoList;
