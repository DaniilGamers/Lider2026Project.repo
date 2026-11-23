import React from 'react';
import css from './RegisterComponent.module.css'
import { Link } from 'react-router-dom';

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

                       <Link to={'/login'}><h6 style={{textAlign: "center", marginTop: -50, fontSize: "20px", color: "darkBlue"}}>- Masz użytkownik? Zaloguj się -</h6></Link>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default RegisterComponent;