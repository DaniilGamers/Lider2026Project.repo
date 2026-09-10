import React from 'react';
import css from './loginComponent.module.css'

const LoginComponent = () => {
    return (
        <div id={css.mainBox}>
            
            <div id={css.loginBox}>
                <div id={css.formBox}>
                    <form>
                       <label>Imie użytkownika: <br/> <input type="text" required/></label>
                        <br/>
                       <label>Hasło: <br/> <input type="password" required/></label>
                       <br/>
                       <label><button>Zaloguj się</button></label>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default LoginComponent;