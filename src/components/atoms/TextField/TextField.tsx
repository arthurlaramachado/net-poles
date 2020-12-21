import React from 'react';
import './styles.css';

interface textField {
    id: string;
    name: string;
    type: "text" | "number";
    setValue: Function;
}

const TextField: React.FC<textField> = ({ id, name, type, setValue }) => {
    return (
        <div className="textField">
            <label>{name}</label>
            <input className="input" type={type} id={id} onChange={(e) => setValue(e.target.value)}/>
        </div>
    );
}

export default TextField;