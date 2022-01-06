import { constructURL } from "../utils/helpers";

import { itemsPerListOptions } from "../utils/constants";

export const
    UPDATE_URL = 'UPDATE_URL',
    UPDATE_FILTERS = 'UPDATE_FILTERS',
    UPDATE_LOADING = 'UPDATE_LOADING',
    UPDATE_GAME_DATA = 'UPDATE_GAME_DATA',
    UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE',
    UPDATE_ITEMS_PER_LIST = 'UPDATE_ITEMS_PER_LIST',
    UPDATE_ERROR = 'UPDATE_ERROR',
    CLEAR_FILTER = 'CLEAR_FILTER';

export const filterReducer = (state, { type, payload }) => {
    switch (type) {
        case UPDATE_URL:
            /* construct the new URL showing filters applied */
            const entries = Object.entries(state.categories).map(([key, list]) => {
                const queryParams = list.filter(category => category.filterApplied)
                    .map(filter => filter.name).join('|');
                return [key, queryParams];
            });

            const newURL = constructURL(payload, ...[
                ...entries,
                ['ipl', state.itemsPerList],
                ['pgn', state.curPage]
            ]);

            return {
                ...state,
                url: newURL
            };

        case UPDATE_FILTERS: {

            const {
                category,
                index,
                newValue,
                valueKey
            } = payload;

            const tempList = { ...state.categories };
            tempList[category][index][valueKey] = newValue;

            return {
                ...state,
                filterList: tempList
            };
        }
        case UPDATE_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        case UPDATE_GAME_DATA:

            const {
                gameList,
                categories,
                totalGames
            } = payload.gameData;

            const {
                curPage,
                maxPage
            } = payload.pagination;

            return {
                ...state,
                gameList,
                categories,
                totalGames,
                curPage,
                maxPage
            };

        case UPDATE_CURRENT_PAGE:

            return {
                ...state,
                curPage: payload
            };

        case UPDATE_ITEMS_PER_LIST:

            if (!itemsPerListOptions.includes(payload)) {
                return state;
            }

            return {
                ...state,
                itemsPerList: payload
            };

        case UPDATE_ERROR:

            return {
                ...state,
                error: payload
            };

        case CLEAR_FILTER:

            if (state.categories.hasOwnProperty(payload)) {
                const tempList = { ...state.categories };

                tempList[payload].forEach(value => value.filterApplied = false);

                return {
                    ...state,
                    categories: tempList
                };
            }

            return state;
        default:
            console.warn(`No Matching "${type}" - action type`);
            return state;
    }
};