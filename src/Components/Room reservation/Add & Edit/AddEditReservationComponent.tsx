import React, { useEffect } from 'react';
import css from '../Add & Edit/AddEditReservationComponent.module.css'
import { useCreateMenu } from '../../../Context/CreateMenuContext';

const AddEditReservationComponent = () => {

    const { activeMenu, closeMenu } = useCreateMenu();

    const {optionMenu} = useCreateMenu();

    let optionText = "";

    if (activeMenu !== 'addEditReserve') return null;

    if(optionMenu === '1')
        {
            optionText = "Dodać";
        }
    else if(optionMenu === '2')
        {
            optionText = "Edytować";
        }

    

    
    
    return (
        <div className={css.mainBox} onClick={() => closeMenu()}>

            <div id={css.reservationAddEditBox} onClick={(e) => e.stopPropagation()}>

                <div id={css.inputMainBox}></div>

                <div id={css.optionsBtnBox}>

                    <button>{optionText}</button>

                </div>

                

            </div>
            
        </div>
    );
};

export default AddEditReservationComponent;