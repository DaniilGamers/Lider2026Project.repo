import React from 'react';
import css from './RegisterComponent.module.css'

const RegisterComponent = () => {
    return (
        <div id={css.mainBox}>
            
            <div id={css.registerBox}>
                <div id={css.formBox}>
                    <form>
                       <label>Imie: <br/> <input type="text" required/></label>

                       <label>Nazwisko: <br/> <input type="text" required/></label>

                       <label>Hasło: <br/> <input type="password" required/></label>

                       <label>Email: <br/> <input type="email" required/></label>

                       <label><button>Registruj</button></label>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default RegisterComponent;