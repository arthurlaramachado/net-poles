import React from 'react';
import './styles.css';

interface buttonType {
    type: "button" | "submit";
    onClick: Function;
}

const Button: React.FC<buttonType> = ({ type, onClick, children }) => {
    return (
        <button
            className={'button'}
            onClick={() => onClick()} 
            type={type}
        >
            {children}
        </button>
    );
}

export default Button;