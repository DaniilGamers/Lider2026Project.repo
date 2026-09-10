import React from 'react';

import HeaderComponent from '../Components/Header/header';
import FooterComponent from '../Components/Footer/footer';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <HeaderComponent/>
                <Outlet/>
            <FooterComponent/>
        </div>
    );
};

export default MainPage;