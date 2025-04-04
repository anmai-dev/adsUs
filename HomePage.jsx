import React from 'react';
import './HomePage.scss';
import PostPage from './PostPage';
import Schedule from './Schedule';

const HomePage = () => {
    return (
        <div className="homePage">
            <div className="mainContent">
                <section className="scheduleSection">
                    <Schedule />
                </section>
                <section className="contentSection">
                    <PostPage />
                    {/* Removed unsafe document.write script injection */}
                </section>
            </div>
        </div>
    );
};

export default HomePage;
