import React from 'react';
import css from './roomReservationComponent.module.css'

const RoomReservationComponent = () => {
    return (
        <div id={css.mainBox}>
            <div id={css.reservationsBox}>
                <h1>List rezerwacji</h1>
                <div id={css.listReservationMainBox}>
                    <div id={css.listBox}></div>
                    <div id={css.reservationNavBox}>

                        <div id={css.reservationOptionBox}>

                            <button>Stworzyć</button>
                            <button>Edytować</button>
                            <button>Anulować</button>

                        </div>

                        <div id={css.reservationHistoryBox}>
                            
                        </div>

                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default RoomReservationComponent;