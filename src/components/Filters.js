import { useRef, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../contexts/filter_context';
import { FilterBar } from './FilterBar';
import { DropDown } from '.';
import { getEleDimensions } from '../utils/helpers';

export const Filters = forwardRef((_, ref) => {

    const wrapperRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getContentHeight: () => {
            return `${getEleDimensions(wrapperRef.current).height}px`;
        }
    }));

    const {
        categories,
        clearFilter,
        updateFilters
    } = useFilterContext();

    return <Wrapper ref={wrapperRef}>
        <DropDown
            ContentComponent={FilterBar}
            contentMsg={'Platforms'}
            bgColor={'#940'}
            headerText={'Platforms:'}
            filterKey={'platforms'}
            valueKey={'name'}
            filterData={categories.platforms}
            clearFilterFn={clearFilter}
            updateFilterFn={updateFilters}
        />
        <DropDown
            ContentComponent={FilterBar}
            contentMsg={'Publishers'}
            bgColor={'#940'}
            headerText={'Publishers:'}
            filterKey={'publishers'}
            valueKey={'name'}
            filterData={categories.publishers}
            clearFilterFn={clearFilter}
            updateFilterFn={updateFilters}
        />
        <DropDown
            ContentComponent={FilterBar}
            contentMsg={'Developers'}
            bgColor={'#940'}
            headerText={'Developers:'}
            filterKey={'developers'}
            valueKey={'name'}
            filterData={categories.developers}
            clearFilterFn={clearFilter}
            updateFilterFn={updateFilters}
        />
        <DropDown
            ContentComponent={FilterBar}
            contentMsg={'Genres'}
            bgColor={'#940'}
            headerText={'Genres:'}
            filterKey={'genres'}
            valueKey={'name'}
            filterData={categories.genres}
            clearFilterFn={clearFilter}
            updateFilterFn={updateFilters}
        />
        <DropDown
            ContentComponent={FilterBar}
            contentMsg={'Release Years'}
            bgColor={'#940'}
            headerText={'Release Years:'}
            filterKey={'releaseYears'}
            valueKey={'name'}
            filterData={categories.releaseYears}
            clearFilterFn={clearFilter}
            updateFilterFn={updateFilters}
        />
    </Wrapper>;
});

const Wrapper = styled.aside`
    background-color: var(--clr-theme-secondary);
`;