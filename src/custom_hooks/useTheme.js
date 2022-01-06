import { useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/helpers';

const themes = new Set([
    'default',
    'retro',
    'dark'
]);

const getStorageTheme = () => {
    return getLocalStorage()?.getItem('theme') ?? 'default';
}

export const useTheme = () => {
    
    const [curTheme, setCurTheme] = useState(getStorageTheme);

    const setTheme = (newTheme) => {
        if (!themes.has(newTheme)) {
            return;
        }
        setCurTheme(newTheme);
    };

    useEffect(() => {
        getLocalStorage()?.setItem('theme', curTheme);
        document.body.className = curTheme;
    }, [curTheme]);

    return { curTheme, setTheme, themes: [...themes] };
};