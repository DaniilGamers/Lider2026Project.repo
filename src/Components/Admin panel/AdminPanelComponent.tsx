import React from 'react';
import css from './AdminPanelComponent.module.css'

const AdminPanelComponent = () => {
    return (
        <div id={css.mainBox}>
            <div id={css.adminBox}>
                <h1>Panel admina</h1>
                <div id={css.adminMainBox}>
                    <div id={css.roomListBox}></div>
                    <div id={css.roomNavBox}>

                        <div id={css.roomOptionBox}>

                            <button>Stworzyć</button>
                            <button>Aktualizować</button>
                            <button>Usunąć</button>


                        </div>

                        <div id={css.roomReservationHistoryBox}>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanelComponent;