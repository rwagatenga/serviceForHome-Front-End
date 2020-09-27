import React from 'react';

import HomeServiceLogo from '../../assets/images/Logo3.JPG';
import './logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={HomeServiceLogo} alt="MyLogo" />
    </div>
);

export default logo;