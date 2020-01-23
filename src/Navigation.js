import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn, username }) => {
    if (isSignedIn) {
        return (
            <nav>
                <h3>Hello {username}</h3>
                {
                    username === 'admin' ?
                        <>
                            <button onClick={() => onRouteChange('home')}>Home</button>
                            <button onClick={() => onRouteChange('add trip form')}>Add Trip</button>
                            <button onClick={() => onRouteChange('graph')}>Graph</button>
                        </>
                        : null
                }
                <button onClick={() => onRouteChange('signout')} >sign out</button>
            </nav>
        );
    } else {
        return (
            <nav>
                <button onClick={() => onRouteChange('signin')} >sign in</button>
                <button onClick={() => onRouteChange('register')} >register</button>
            </nav>
        )
    }
}

export default Navigation;