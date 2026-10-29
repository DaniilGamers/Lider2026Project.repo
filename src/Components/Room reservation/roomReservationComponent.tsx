import React, { useEffect, useState } from 'react';
import css from './roomReservationComponent.module.css'
import cssAddEdit from './Add & Edit/AddEditComponent.module.css'
import { useCreateMenu } from '../../Context/CreateMenuContext';
import axios from 'axios';

const RoomReservationComponent = () => {

    const { openMenu } = useCreateMenu()

    const {optionId} = useCreateMenu()

    const [listData, setListData] = useState([])

    const [sala, setSala] = useState([])

    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
       
            fetch('http://localhost:8000/rezerwacje')
            .then(res => res.json())
            .then(data => setListData(data))
            .catch(err => console.log(err));

            fetch('http://localhost:8000/sala')
            .then(res => res.json())
            .then(data => setSala(data))
            .catch(err => console.log(err));
        },[]
    )

    function formatDate(dateString: any) {
    return new Date(dateString).toLocaleString("UTC", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        });
    }

    const handleDeletion = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!selectedId) {
            alert("Wybierz rezerwację do usunięcia!");
            return;
        }

        try {
            // Передаем ID переменной прямо в строке запроса через знак "?"
            const response = await fetch(`http://localhost:8000/rezerwacje?select=${selectedId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            
            if (data.status === "success") {
                setListData(listData.filter((item: any) => item.id !== selectedId));
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
            <div id={css.reservationsBox}>
                <h1>List rezerwacji</h1>
                <div id={css.listReservationMainBox}>
                    <div id={css.listBox}>

                        {listData.map((d: any, i) => {
                            const currentId = d.id;
                            const isSelected = selectedId === currentId;

                            return (
                                <h4 
                                    key={i} 
                                    className={`${css.listOptions} ${isSelected ? css.activeOption : ''}`} 
                                    onClick={() => {
                                        setSelectedId(currentId);
                                        console.log(currentId);
                                    }}
                                >
                                    {d.nazwa}, Pojemność: {d.pojemność}, sala:{' '}
                                    {sala.map((s: any) => d.rodzaj_id === s.id && s.rodzaj_sala)},{' '}
                                    {formatDate(d.date)}
                                </h4>
                            );
                        })}

                    </div>
                    <div id={css.reservationNavBox}>

                        <div id={css.reservationOptionBox}>

                            <button onClick={() => {
                                optionId('1'); 
                                openMenu('addEditReserve')
                                }}>Stworzyć</button>
                            <button onClick={() => {
                                optionId('2');
                                openMenu('addEditReserve')
                                }}>Edytować</button>
                            <button onClick={handleDeletion}>Anulować</button>

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