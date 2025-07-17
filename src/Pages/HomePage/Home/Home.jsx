import React from 'react';
import AdvertisementSection from '../AdvertisementSection/AdvertisementSection';
import LatestReviews from '../LatestReviews/LatestReviews';
import HomeBanner from '../HomeBanner/HomeBanner';
import YourLouxery from '../YourLouxery/YourLouxery';
import WhoWeAre from '../WhoWeAre/WhoWeAre';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <AdvertisementSection></AdvertisementSection>
            <LatestReviews></LatestReviews>
            <YourLouxery></YourLouxery>
            <WhoWeAre></WhoWeAre>
        </div>
    );
};

export default Home;