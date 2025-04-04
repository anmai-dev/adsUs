import React from 'react';
import './FeaturedPosts.scss';
import FeaturedItem from './FeaturedItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedPosts = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className='featuredPosts'>
            <h2>Bài viết nổi bật</h2>
            <FeaturedItem image='path/to/image1.jpg' title='Bài viết 1' />
            <FeaturedItem image='path/to/image2.jpg' title='Bài viết 2' />
            <FeaturedItem image='path/to/image3.jpg' title='Bài viết 3' />
            {/* Thêm các bài viết nổi bật khác ở đây */}
            <div className='imageSlider'>
                <Slider {...settings}>
                    <div>
                        <img src='path/to/image1.jpg' alt='Slide 1' />
                    </div>
                    <div>
                        <img src='path/to/image2.jpg' alt='Slide 2' />
                    </div>
                    <div>
                        <img src='path/to/image3.jpg' alt='Slide 3' />
                    </div>
                    {/* Thêm các slide khác ở đây */}
                </Slider>
            </div>
        </div>
    );
}

export default FeaturedPosts;