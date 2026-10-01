import React, { useEffect, useState } from 'react';
import css from './roomReservationComponent.module.css'

const RoomReservationComponent = () => {

    const [listData, setListData] = useState([])

    const [sala, setSala] = useState([])

    useEffect(() => {
       
            fetch('http://localhost:8000/rezerwacje')
            .then(res => res.json())
            .then(data => setListData(data))
            .catch(err => console.log(err));

            fetch('http://localhost:8000/sala')
            .then(res => res.json())
            .then(data => setSala(data))
            .catch(err => console.log(err));
        }
    )

    function formatDate(dateString: any) {
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        });
    }




    return (
        <div id={css.mainBox}>
            <div id={css.reservationsBox}>
                <h1>List rezerwacji</h1>
                <div id={css.listReservationMainBox}>
                    <div id={css.listBox}>

                        {listData.map((d: any, i) => 
                            
                            (<h4 key={i} className={css.listOptions}>{d.nazwa}, Pojemność: {d.pojemność}, sala: {sala.map((s: any, i) => d.rodzaj_id === s.id  && (s.rodzaj_sala))}, {formatDate(d.date)}</h4>))}

                    </div>
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