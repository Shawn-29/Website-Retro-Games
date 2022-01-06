import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GameList } from '../components';
import { useFilterContext } from '../contexts/filter_context';
import { Spinner } from '../components/Spinner';
import { API_ENDPOINT, API_GAMES_DIR } from '../utils/constants';
import { useTheme } from '../custom_hooks/useTheme';

export const GamesPage = () => {

    useTheme();

    const history = useHistory();

    const isFirstLoad = useRef(true);

    const {
        url,
        isLoading,
        loadGameData,
    } = useFilterContext();

    useEffect(() => {

        (async () => {

            if (!isFirstLoad.current) {
                history.push(url);
            }

            await loadGameData(`${API_ENDPOINT}${API_GAMES_DIR}${window.location.search}`);

            isFirstLoad.current = false;
        })();
        // eslint-disable-next-line
    }, [url]);

    return <main className='main-container'>
        {isLoading ?
            <Spinner></Spinner> :
            <>
                <GameList />
            </>}
    </main>;
};