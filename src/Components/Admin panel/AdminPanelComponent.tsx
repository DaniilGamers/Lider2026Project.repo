import React, { useEffect, useState } from 'react';
import css from './AdminPanelComponent.module.css'
import { useCreateMenu } from '../../Context/CreateMenuContext';
import { createGlobalState } from 'react-hooks-global-state';

const AdminPanelComponent = () => {

    const { setGlobalState, useGlobalState } = createGlobalState({
        reserveBtnId: 0,
        language: 'en'
    })

    const { openMenu } = useCreateMenu()

    const [sala, setSala] = useState([])

    useEffect(() => {
    
                fetch('http://localhost:8000/sala')
                .then(res => res.json())
                .then(data => setSala(data))
                .catch(err => console.log(err));
            }
        )

        const menuOpener = (room_id: any) => {
            setGlobalState("reserveBtnId", room_id);
            openMenu('addUpdateRoom');
            return
        }

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

                            <button onClick={() => menuOpener(1)}>Stworzyć</button>
                            <button onClick={() => menuOpener(2)}>Aktualizować</button>
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