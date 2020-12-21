import React from 'react';
import Navbar from '../organisms/Navbar/Navbar';

const DefaultTemplate: React.FC = ({ children }) => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <body>
                {children}
            </body>
        </div>
    )
}

export default DefaultTemplate;