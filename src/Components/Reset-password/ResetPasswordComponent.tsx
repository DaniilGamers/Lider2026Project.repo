import React from 'react';
import css from './ResetPasswordComponent.module.css'

const ResetPasswordComponent = () => {
    return (
        <div id={css.mainBox}>
            
            <div id={css.resetBox}>
                <div id={css.formBox}>
                    <form>

                       <label>Hasło: <br/> <input type="password" required/></label>

                       <label>Powtórz hasło: <br/> <input type="password" required/></label>

                       <label><button>Resetuj</button></label>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ResetPasswordComponent;