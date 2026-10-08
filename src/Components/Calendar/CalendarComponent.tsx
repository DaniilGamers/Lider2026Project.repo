import React, { useEffect, useState } from 'react';
import css from './CalendarComponent.module.css'

const CalendarComponent = () => {

    const [currentDate, setCurrentDate] = useState(new Date());

    const [daysInMonth, setDaysInMonth] = useState([]);

    const [startDay, setStartDay] = useState(0)

    const monthNumber = currentDate.getMonth() + 1;

    let monthName = currentDate.toLocaleString("default", { month: "long" });
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = new Date(year, month, 1);
        const days = [];
        
        while(date.getMonth() === month)
            {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
        // @ts-ignore
        setDaysInMonth(days);
        setStartDay(new Date(year, month, 1).getDay());
        

    },[currentDate])

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

    const weekdays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nied']

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

                    <div id={css.datesBox}>

                        <div id={css.calendarWeekDaysBox}>
                            {weekdays.map((day, i) => <div className={css.calendarWeekDaysTexts} key={i}>{day}</div>)}
                        </div>

                        <div id={css.daysBox}>
                            
                            {Array.from({ length: startDay }).map((_, index) => (<div className={css.emptyDays} key={index}></div>))}
                            
                            {daysInMonth.map((day) => <div className={css.daysEachBox} key={day}>{
                            // @ts-ignore
                            day.getDate()
                            }</div>)}
                        </div>

                    </div>

                        

                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;