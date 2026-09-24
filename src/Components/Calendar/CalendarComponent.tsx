import React, { useEffect, useState } from 'react';
import css from './CalendarComponent.module.css'

const CalendarComponent = () => {

    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNumber = currentDate.getMonth() + 1;

    let monthName = currentDate.toLocaleString("default", { month: "long" });
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    useEffect(() => {
        ///console.log(monthNumber);
    })

    function nextMonth() {

        setCurrentDate((prevDate) => {
        const nextDate = new Date(prevDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        return nextDate;
        });
    }

    function prevMonth() {

        setCurrentDate((nextDate) => {
        const prevDate = new Date(nextDate);
        prevDate.setMonth(prevDate.getMonth() - 1);
        return prevDate;
        });
    }

    return (
        <div id={css.mainBox}>
            <div id={css.calendarBox}>

                <h1>Kalendarz rezerwacji</h1>

                <div id={css.calendarMainBox}>

                    <div id={css.monthBox}>
                        <button onClick={prevMonth}>{"<"}</button>
                        <div id={css.monthNameBox}>
                            <h1>{monthName}</h1>
                        </div>
                        <button onClick={nextMonth}>{">"}</button>
                    </div>

                    <div id={css.datesBox}></div>

                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;