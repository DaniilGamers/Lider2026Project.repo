import React, { useEffect, useState } from 'react';
import css from '../Add-Edit/AddEditReservationComponent.module.css'
import { useCreateMenu } from '../../../Context/CreateMenuContext';

const AddEditReservationComponent = () => {

    const { activeMenu, closeMenu } = useCreateMenu();

    const {optionMenu} = useCreateMenu();
    
    const [salaList, setSalaList] = useState([]);

    let optionText = "";

    const [nazwa, setNazwa] = useState("")

    const [pojemnosc, setPojemnosc] = useState("")

    const [rodzaj, setRodzaj] = useState("0");

    const [data, setData] = useState("");

    useEffect(() => {
        fetch('http://localhost:8000/sala')
            .then(res => res.json())
            .then(data => {
                setSalaList(data);
                
                if (data.length > 0) {
                    setRodzaj(data[0].id); 
                }
            })
            .catch(err => console.log(err));
    }, []
);
    const handleSubmit = () => {
    
    if (!nazwa.trim() || !pojemnosc || !rodzaj || !data) {
        alert("Wszystkie pola są wymagane!");
        return;
    }

    
    const formattedDate = data.replace('T', ' ') + ':00';

    
    const reservationData = {
        nazwa: nazwa,
        pojemnosc: Number(pojemnosc),
        rodzaj: rodzaj,
        data: formattedDate
    };

    
    fetch('http://localhost:8000/rezerwacje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Błąd podczas dodawania rezerwacji przez serwera');
        }
        return res.json();
    })
    .then(result => {
        console.log('Pomyślnie dodano:', result);
        
        
        setNazwa("");
        setPojemnosc("");
        setData("");
        
        
        closeMenu();
    })
    .catch(err => {
        console.error('Send error accured:', err);
        alert('Rezerwacje nie było stworzone');
    });
};

    

    if (activeMenu !== 'addEditReserve') return null;

    if(optionMenu === '1')
        {
            optionText = "Dodać";
        }
    else if(optionMenu === '2')
        {
            optionText = "Edytować";
        }
    
    if (Number(pojemnosc) < 0)
        {
            setPojemnosc("0")
        }
    
    return (
        <div className={css.mainBox} onClick={() => closeMenu()}>

            <div id={css.reservationAddEditBox} onClick={(e) => e.stopPropagation()}>

                <div id={css.inputMainBox}>

                    <br/>

                    <h3>Nazwa rezerwacji</h3>

                    <input type='text' value={nazwa} onChange={(e: any) => setNazwa(e.target.value)} style={{width: "80%", borderRadius: "15px", borderWidth: "1px", height: "25px", fontSize: "15px", textAlign: "center"}} />

                    <br/>

                    <h3>Ilość osób</h3>

                    <input type='number' value={Number(pojemnosc)} onChange={(e: any) => setPojemnosc(e.target.value)} style={{width: "10%", borderRadius: "150px", borderWidth: "1px", height: "25px", fontSize: "15px"}} />

                    <br/>

                    <h3>Sala</h3>

                    <select 
                    value={rodzaj}
                    
                    onChange={(e: any) => setRodzaj(e.target.value)}

                    style={{width: "30%", height: "55px", borderRadius: "15px", borderWidth: "1px", textAlign: "center", fontSize: "15px"}}>
                        <option value="0">Wybierz</option>
                        {salaList.map((s: any, i) => <option key={i} value={s.id}>{s.rodzaj_sala}</option>)}
                    </select>

                    <br/>

                    <h3>Data</h3>

                    <input type='datetime-local' value={data} onChange={(e) => setData(e.target.value)}  style={{width: "31%", borderRadius: "15px", borderWidth: "1px", height: "25px", fontSize: "15px"}} />

                </div>

                <div id={css.optionsBtnBox}>

                    <button onClick={handleSubmit}>{optionText}</button>

                    <button onClick={() => closeMenu()}>Anulować</button>

                </div>

                

            </div>
            
        </div>
    );
};

export default AddEditReservationComponent;