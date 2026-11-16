import React, { useEffect, useState } from 'react';
import css from '../Add-Update/AddUpdateRoomComponent.module.css'
import { useCreateMenu } from '../../../Context/CreateMenuContext';

const AddEditRoomComponent = () => {

    const { activeMenu, closeMenu } = useCreateMenu();

    const {optionMenu} = useCreateMenu();

    const {selectedIdEdit} = useCreateMenu();
    
    let optionText = "";

    const [salaNazwa, setSalaNazwa] = useState("")

    useEffect(() => {
            
    
            if(optionMenu === '3')
                {
                    setSalaNazwa("")
                }
    
            if(optionMenu === '4')
                {
                    fetch(`http://localhost:8000/salaEdit?select=${selectedIdEdit}`)
                    .then(res => res.json())
                    .then(data => {
                        
                        if (data && data.length > 0) {
                            const reservation = data[0];
                            
                            
                            setSalaNazwa(reservation.rodzaj_sala)
                        }
                    })
                    .catch(err => console.log("Błąd ładowania:", err))
                
                }
        }, [optionMenu, selectedIdEdit]
    );


    if (activeMenu !== 'addUpdateRoom') return null;

    if(optionMenu === '3')
        {
            optionText = "Dodać";
        }
    else if(optionMenu === '4')
        {
            optionText = "Aktualizować";
        }

    const handleSubmit = () => {
    
    if (!salaNazwa.trim()) {
        alert("Pola są wymagane!");
        return;
    }

    
    const reservationData = {
        rodzaj_sala: salaNazwa
    };

    if(optionMenu === '3'){
        fetch('http://localhost:8000/sala', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        })
        .then(res => {
        if (!res.ok) {
            return res.json().then(errData => {
                throw new Error(errData.message || 'Server Internal Error');
            });
        }
        return res.json();
        })
        .then(result => {
            
            setSalaNazwa("");
            closeMenu();
            window.location.reload();
        })
        .catch(err => {
            alert(err.message); 
        });
    }
    if(optionMenu === '4'){
        fetch(`http://localhost:8000/sala?select=${selectedIdEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        })
        .then(res => {
        if (!res.ok) {
            return res.json().then(errData => {
                throw new Error(errData.message || 'Server Internal Error');
            });
        }
        return res.json();
        })
        .then(result => {
            
            setSalaNazwa("");
            closeMenu();
            window.location.reload();
        })
        .catch(err => {
            alert(err.message); 
        });
    }
};
    
    return (
        <div className={css.mainBox} onClick={() => closeMenu()}>

            <div id={css.roomAddEditBox} onClick={(e) => e.stopPropagation()}>

                <div>

                    <br/>

                    <h2>Nazwa rezerwacji</h2>

                    <br/>

                    <input type='text' value={salaNazwa} onChange={(e: any) => setSalaNazwa(e.target.value)} style={{width: "90%", borderRadius: "15px", borderWidth: "1px", height: "35px", fontSize: "20px", textAlign: "center"}} />

                    <br/>

                </div>

                <button onClick={handleSubmit}>{optionText}</button>

                <button onClick={() => closeMenu()}>Anulować</button>

            </div>

            
            
        </div>
    );
};

export default AddEditRoomComponent;