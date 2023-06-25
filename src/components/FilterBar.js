import { useState, useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { DEFAULT_NUM_CATEGORY_DISPLAY } from '../utils/constants';
import { getEleDimensions } from '../utils/helpers';
import { Modal } from './Modal';
import { CheckBox } from '.';

export const FilterBar = forwardRef(({
    headerText = '',
    filterKey = '',
    valueKey = '',
    filterData = [],
    clearFilterFn,
    updateFilterFn
}, ref) => {

    const [showModal, setShowModal] = useState(false);

    const wrapperRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getContentHeight: () => {
            return `${getEleDimensions(wrapperRef.current).height}px`;
        }
    }));

    const filters = useMemo(() => {
        let lastChar = '';
        return filterData.map((value, index) => {
            const { count, filterApplied } = value;
            const name = String(value[valueKey]);
            let capFirstChar = false;
            if (name[0] !== lastChar) {
                capFirstChar = true;
                lastChar = name[0];
            }
            const id = `chk${name + filterKey}`;
            return <CheckBox
                key={index}
                id={id}
                labelText={capFirstChar ?
                    <>
                        <span className='first-char'>{name[0]}</span>{`${name.substring(1)} (${count})`}
                    </> :
                    `${name} (${count})`}
                onChange={(e) => updateFilterFn(e, filterKey, index)}
                isChecked={filterApplied}
            />;
        });
    }, [filterData, filterKey, updateFilterFn, valueKey]);

    const previewFilters = useMemo(() => {
        return filterData
            .map((value, index) => ({ ...value, index }))
            .sort((a, b) => b.count - a.count)
            .slice(0, DEFAULT_NUM_CATEGORY_DISPLAY)
            .map(value => {
                const {
                    [valueKey]: name,
                    count,
                    filterApplied,
                    index
                } = value;
                const id = `chk${name + filterKey}`;
                return <CheckBox
                    key={index}
                    id={id}
                    labelText={`${name} (${count})`}
                    onChange={(e) => updateFilterFn(e, filterKey, index)}
                    isChecked={filterApplied}
                />;
            });
    }, [filterData, filterKey, updateFilterFn, valueKey]);

    return <FormControl ref={wrapperRef}>
        <h5>{headerText}</h5>
        {
            filterData.some(filter => filter.filterApplied) &&
            <button
                type='button'
                className='btn-filter'
                onClick={() => clearFilterFn(filterKey)}
            >
                <FiChevronsLeft className='chevron' />Clear Filter
            </button>
        }
        {previewFilters}
        {
            filterData.length > DEFAULT_NUM_CATEGORY_DISPLAY &&
            <button
                type='button'
                className='btn-filter'
                onClick={(e) => {
                    setShowModal(true)
                }}
            >
                See All <FiChevronsRight className='chevron' />
            </button>
        }
        {
            showModal &&
            <Modal
                closeModal={() => setShowModal(false)}
                headerText={headerText}
                maxWidth='40rem'
            >
                <FilterContainer>
                    {/* display filters as two separate columns */}
                    <section>{filters.slice(0, filters.length >>> 1)}</section>
                    <section>{filters.slice(filters.length >>> 1)}</section>
                </FilterContainer>
            </Modal>
        }
    </FormControl>;
});

const FilterContainer = styled.article`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    .first-char {
        font-weight: 700;
        font-size: 1.4rem;
        letter-spacing: 1px;
        text-decoration: underline;
    }
`;

const FormControl = styled.div`
    background-color: var(--clr-form-fill);
    border: 2px solid var(--clr-border);
    border-radius: 12px;
    margin-bottom: 0;
    padding: .6rem .6rem 1.2rem;
    @media screen and (min-width: 576px) {
        margin-bottom: .6rem;
    }
    .btn-filter {
        background-color: var(--clr-theme-primary);
        border: 1px solid var(--clr-border);
        border-radius: 14px;
        color: var(--clr-font-primary);
        cursor: pointer;
        padding: .2rem .8rem;
        transition: var(--transition);
    }
    .btn-filter:hover {
        background-color: var(--clr-font-primary);
        color: var(--clr-theme-primary);
    }
    .chevron {
        vertical-align: bottom;
    }
`;