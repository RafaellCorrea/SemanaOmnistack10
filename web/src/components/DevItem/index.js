import React from 'react';
import Button from '@material/react-button';

import './styles.css';

function DevItem({ dev }) {
    return (
        <li className="dev-item">
            <header>
                <Button
                    raised
                    className='button-alternate edit'
                    onClick={() => console.log('clicked!')}
                    >
                    Click Me!
                </Button>
                
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
    );
}

export default DevItem;
