import React from 'react';

export const WelcomeMessage = () => {
    const userName = localStorage.getItem('userName');

    return (
        <div className="text-center">
            <h1 className="h1">¡Bienvenido/a de vuelta {userName}!</h1>
        </div>
    );
};
