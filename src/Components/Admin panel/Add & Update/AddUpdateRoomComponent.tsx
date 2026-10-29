import React from 'react';
import css from '../Add & Update/AddUpdateRoomComponent.module.css'
import { useCreateMenu } from '../../../Context/CreateMenuContext';

const AddEditRoomComponent = () => {

    const { activeMenu, closeMenu } = useCreateMenu();

    const {optionMenu} = useCreateMenu();
    
        let optionText = "";

    if (activeMenu !== 'addUpdateRoom') return null;

    if(optionMenu === '3')
        {
            optionText = "Dodać";
        }
    else if(optionMenu === '4')
        {
            optionText = "Aktualizować";
        }
    
    return (
        <div className={css.mainBox} onClick={() => closeMenu()}>

            <div id={css.roomAddEditBox} onClick={(e) => e.stopPropagation()}>

                <button>{optionText}</button>

            </div>

            
            
        </div>
    );
};

export default AddEditRoomComponent;