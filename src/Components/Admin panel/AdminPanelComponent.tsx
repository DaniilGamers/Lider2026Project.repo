import React from 'react';
import css from './AdminPanelComponent.module.css'

const AdminPanelComponent = () => {
    return (
        <div id={css.mainBox}>
            <div id={css.adminBox}>
                <h1>Panel admina</h1>
                <div id={css.adminMainBox}>
                    <div id={css.roomListBox}></div>
                    <div id={css.roomEditBox}></div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanelComponent;