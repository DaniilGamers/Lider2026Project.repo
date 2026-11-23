import React from 'react';
import css from './ResetPasswordComponent.module.css'
import { Link } from 'react-router-dom';

const ResetPasswordComponent = () => {
    return (
        <div id={css.mainBox}>
            
            <div id={css.resetBox}>
                <div id={css.formBox}>
                    <form>

                        <label>Email: <br/> <input type="email" required/></label>

                       <label>Hasło: <br/> <input type="password" required/></label>

                       <label>Powtórz hasło: <br/> <input type="password" required/></label>

                       <label><button>Resetuj</button></label>

                       <Link to={'/login'}><h6 style={{textAlign: "center", marginTop: -50, fontSize: "20px", color: "darkBlue"}}>- zaloguj się -</h6></Link>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ResetPasswordComponent;