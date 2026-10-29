import React, { useEffect, useState } from 'react';
import css from './AdminPanelComponent.module.css'
import { useCreateMenu } from '../../Context/CreateMenuContext';
import { createGlobalState } from 'react-hooks-global-state';

const AdminPanelComponent = () => {

    const { openMenu } = useCreateMenu()

    const {optionId} = useCreateMenu()

    const [sala, setSala] = useState([])

    const [salaData, setSalaData] = useState([])

    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
    
                fetch('http://localhost:8000/sala')
                .then(res => res.json())
                .then(data => setSala(data))
                .catch(err => console.log(err));
            }
        )

    const handleDeletion = async (e: React.MouseEvent) => {
            e.preventDefault();
    
            if (!selectedId) {
                alert("Wybierz rezerwację do usunięcia!");
                return;
            }
    
            try {
                // Передаем ID переменной прямо в строке запроса через знак "?"
                const response = await fetch(`http://localhost:8000/sala?select=${selectedId}`, {
                    method: 'DELETE'
                });
    
                const data = await response.json();
                
                if (data.status === "success") {
                    setSalaData(salaData.filter((item: any) => item.id !== selectedId));
                    setSelectedId(null);
                    alert("Usunięto pomyślnie!");
                } else {
                    alert("Błąd: " + data.message);
                }
            } catch (error) {
                console.error("Ошибка запроса:", error);
                alert("Błąd połączenia z serwerem");
            }
        };

    return (
        <div id={css.mainBox}>
            <div id={css.adminBox}>
                <h1>Panel admina</h1>
                <div id={css.adminMainBox}>
                    <div id={css.roomListBox}>

                        {sala.map((s: any, i) => { 

                            const currentId = s.id;
                            const isSelected = selectedId === currentId;

                            return (

                            <h3 
                                key={i} 
                                className={`${css.roomOptions} ${isSelected ? css.activeOption : ''}`} 
                                onClick={() => {
                                    setSelectedId(currentId);
                                    console.log(currentId);
                                }}
                            >
                                {s.id}. {s.rodzaj_sala}
                                
                                </h3>

                             )})}

                    </div>
                    <div id={css.roomNavBox}>

                        <div id={css.roomOptionBox}>

                            <button onClick={() => {
                                optionId('3');
                                openMenu('addUpdateRoom')
                                }}>Stworzyć</button>
                            <button onClick={() => {
                                optionId('4');
                                openMenu('addUpdateRoom')
                                }}>Aktualizować</button>
                            <button onClick={handleDeletion}>Usunąć</button>


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