import React from 'react';
import css from './loginComponent.module.css'
import { Link } from 'react-router-dom';

const LoginComponent = () => {
    return (
        <div id={css.mainBox}>
            
            <div id={css.loginBox}>
                <div id={css.formBox}>
                    <form>
                       <label>Imie użytkownika: <br/> <input type="text" required/></label>

                       <label>Hasło: <br/> <input type="password" required/></label>
                       <Link to={'/password-reset'}><h6 style={{textAlign: "left", marginTop: -50, fontSize: "20px", color: "darkBlue"}}>Resetuj hasło?</h6></Link>

                       <label><button>Zaloguj się</button></label>

                       <Link to={'/register'}><h6 style={{textAlign: "center", marginTop: -50, fontSize: "20px", color: "darkBlue"}}>- Stworzyć użytkownik -</h6></Link>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default LoginComponent;