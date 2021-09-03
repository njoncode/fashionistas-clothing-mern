import React from 'react';

import '../styles/homepage.scss'
import Directory from './Directory';
import { HomePageContainer } from '../styles/homepage.styles';

const Homepage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default Homepage;


/**
    <div className='homepage'>
        <Directory />
    </div>

    Using styled component, we can write:
 
    <HomePageContainer>
        <Directory />
    </HomePageContainer>

 */

    