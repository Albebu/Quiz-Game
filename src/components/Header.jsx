import React from 'react';
import '../styles/Header.css';

const Header = ({ name }) => {
    return (
        <div className="header">
            <h1>JavaScript Talent Show</h1>
            {name && <h2>Welcome {name}</h2>}
        </div>
    );
};

export default Header;
