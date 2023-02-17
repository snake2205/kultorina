import { useState } from 'react';

export function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString == null) {
            return false;
        } else {
            const userToken = JSON.parse(tokenString);
            return userToken;
        }
    };

    const [ token, setToken, destroyToken ] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    const deleteToken = userToken => {
        sessionStorage.removeItem('token');
    };

    return {
        destroyToken: deleteToken,
        setToken: saveToken,
        token
    }
}