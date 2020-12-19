import React, { useState } from 'react';

interface textField {
    id: "id";
    name: string;
    type: "text" | "button" | "number";
}

const TextField: React.FC<textField> = ({ id, name, type, children}) => {
    const [text, setText] = useState<string>("");

    return (
        <input type={type} id={id} name={name}>
            {children}
        </input>
    );
}

export default TextField;