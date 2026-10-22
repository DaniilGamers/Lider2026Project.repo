import React from 'react';
import css from '../Add & Update/AddUpdateRoomComponent.module.css'
import { useCreateMenu } from '../../../Context/CreateMenuContext';

const AddEditRoomComponent = () => {

    const { activeMenu, closeMenu } = useCreateMenu();

    if (activeMenu !== 'addUpdateRoom') return null;
    
    return (
        <div className={css.mainBox} onClick={() => closeMenu()}>

            <div id={css.roomAddEditBox} onClick={(e) => e.stopPropagation()}></div>
            
        </div>
    );
};

export default AddEditRoomComponent;