import React from 'react';
import css from './CalendarComponent.module.css'

const CalendarComponent = () => {
    return (
        <div id={css.mainBox}>
            <div id={css.calendarBox}>

                <h1>Kalendarz rezerwacji</h1>

                <div id={css.calendarMainBox}>

                    <div id={css.monthBox}></div>

                    <div id={css.datesBox}></div>

                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;