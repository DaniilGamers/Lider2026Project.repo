import React, { useEffect, useState } from 'react';
import css from './AdminPanelComponent.module.css'

const AdminPanelComponent = () => {

    const [sala, setSala] = useState([])

    useEffect(() => {
    
                fetch('http://localhost:8000/sala')
                .then(res => res.json())
                .then(data => setSala(data))
                .catch(err => console.log(err));
            }
        )

    return (
        <div id={css.mainBox}>
            <div id={css.adminBox}>
                <h1>Panel admina</h1>
                <div id={css.adminMainBox}>
                    <div id={css.roomListBox}>

                        {sala.map((s: any, i) => (<h3 key={i} className={css.roomOptions}>{s.id}. {s.rodzaj_sala}</h3>))}

                    </div>
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