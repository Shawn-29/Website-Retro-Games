import { useState, useEffect, useCallback } from 'react';
import { getResource } from '../utils/helpers';

export const useFetch = (url) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    /*
        use useCallback to only recreate this function when a
        new url is provided (different data is to be fetched);
        
        without useCallback and a dependency array which includes url,
        an infinite loop of rerenders will occur because setData will
        cause useEffect to run which in turn will call fetchData again
    */
    const fetchData = useCallback(async () => {

        setIsLoading(true);

        await getResource(url)
        .then(data => {
            setData(data);
            setError(null);
        })
        .catch(error => {
            setData(null);
            setError(error);
        })

        setIsLoading(false);
    }, [url]);

    useEffect(() => {
        (async () => {
            await fetchData(url);
        })();
    }, [url, fetchData]);

    return { isLoading, data, error };
};