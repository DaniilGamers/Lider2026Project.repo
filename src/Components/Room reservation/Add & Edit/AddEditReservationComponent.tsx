import React, { useEffect } from 'react';
import css from '../Add & Edit/AddEditReservationComponent.module.css'
import { useCreateMenu } from '../../../Context/CreateMenuContext';

const AddEditReservationComponent = () => {

    const { activeMenu, closeMenu } = useCreateMenu();

    if (activeMenu !== 'addEditReserve') return null;

    let optionText = "";

    let optionId = 0;

    
    
    return (
        <div className={css.mainBox} onClick={() => closeMenu()}>

            <div id={css.reservationAddEditBox} onClick={(e) => e.stopPropagation()}>

                <button></button>

            </div>
            
        </div>
    );
};

export default AddEditReservationComponent;