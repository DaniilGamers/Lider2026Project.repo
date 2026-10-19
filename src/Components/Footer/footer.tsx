import React from 'react';
import css from './footer.module.css'
import { Link } from 'react-router-dom';

const FooterComponent = () => {
    return (
        <div id={css.footerBox}>

            <Link to={'/panel_admina'}><div id={css.adminBtn}></div></Link>
            
        </div>
    );
};

export default FooterComponent;