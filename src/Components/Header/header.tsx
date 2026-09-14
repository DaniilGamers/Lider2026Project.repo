import React from 'react';
import css from './header.module.css'
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div id={css.headerBox}>

            <div id={css.optionBox}>

                <Link to={'/kalendarz'}><h3 className={css.optionSelect}>Kalendarz</h3></Link>

                <Link to={'/list_rezerwacja'}><h3 className={css.optionSelect}>List rezerwacji</h3></Link>

            </div>
        </div>
    );
};

export default HeaderComponent;