import React from 'react';

import HeaderComponent from '../Components/Header/header';
import FooterComponent from '../Components/Footer/footer';
import { Outlet } from 'react-router-dom';
import AddEditReservationComponent from '../Components/Room reservation/Add & Edit/AddEditReservationComponent';
import AddUpdateRoomComponent from '../Components/Admin panel/Add & Update/AddUpdateRoomComponent';
import { CreateMenuProvider } from '../Context/CreateMenuContext';

const MainPage = () => {
    return (
        <div><CreateMenuProvider>


                <AddEditReservationComponent/>

                <AddUpdateRoomComponent/>

                <HeaderComponent/>
                    <Outlet/>
                <FooterComponent/>

            </CreateMenuProvider>
        </div>
        
    );
};

export default MainPage;