import { useContext, useReducer, createContext } from 'react';
import { DEFAULT_ITEMS_PER_LIST } from '../utils/constants';
import { getResource } from '../utils/helpers';
import {
    filterReducer,
    UPDATE_FILTERS,
    UPDATE_LOADING,
    UPDATE_GAME_DATA,
    UPDATE_URL,
    UPDATE_ERROR,
    CLEAR_FILTER,
    UPDATE_CURRENT_PAGE,
    UPDATE_ITEMS_PER_LIST
} from '../reducers/filter_reducer';

const initialState = {
    url: '/games',
    isLoading: false,
    gameList: [],
    categories: {
        platforms: [],
        publishers: [],
        developers: [],
        genres: [],
        releaseYears: []
    },
    totalGames: 0,
    curPage: 1,
    maxPage: 1,
    itemsPerList: DEFAULT_ITEMS_PER_LIST,
    error: null
};

const FilterContext = createContext();

export const FilterProvider = ({ children, url = '/games' }) => {

    const [state, dispatch] = useReducer(filterReducer, initialState);

    const updateFilters = (e, category, index) => {

        let newValue = null,
            valueKey = '';

        if (e.target.hasOwnProperty('checked')) {
            newValue = e.target.checked;
            valueKey = 'filterApplied';
        }

        dispatch({ type: UPDATE_FILTERS, payload: { category, index, newValue, valueKey } });

        dispatch({ type: UPDATE_CURRENT_PAGE, payload: 1 });

        dispatch({ type: UPDATE_URL, payload: url });
    };

    const loadGameData = async (url) => {

        dispatch({ type: UPDATE_LOADING, payload: true });

        await getResource(url)
            .then(data => {
                dispatch({
                    type: UPDATE_GAME_DATA, payload: {
                        gameData: data.gameData,
                        pagination: data.pagination
                    }
                });
                dispatch({ type: UPDATE_ERROR, payload: null });
            })
            .catch(error => dispatch({ type: UPDATE_ERROR, payload: error }));

        dispatch({ type: UPDATE_LOADING, payload: false });
    };

    const clearFilter = (filterType) => {
        dispatch({ type: CLEAR_FILTER, payload: filterType });

        dispatch({ type: UPDATE_CURRENT_PAGE, payload: 1 });

        dispatch({ type: UPDATE_URL, payload: url });
    };

    const updateCurPage = (newPage) => {
        dispatch({ type: UPDATE_CURRENT_PAGE, payload: newPage });

        dispatch({ type: UPDATE_URL, payload: url });
    }

    const updateItemsPerList = (qty) => {
        dispatch({ type: UPDATE_ITEMS_PER_LIST, payload: qty });

        dispatch({ type: UPDATE_CURRENT_PAGE, payload: 1 });

        dispatch({ type: UPDATE_URL, payload: url });
    }

    return <FilterContext.Provider
        value={{
            ...state,
            updateFilters,
            clearFilter,
            updateCurPage,
            updateItemsPerList,
            loadGameData
        }}
    >
        {children}
    </FilterContext.Provider>;
};

export const useFilterContext = () => {
    return useContext(FilterContext);
}