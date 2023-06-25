import styled from 'styled-components';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { useFilterContext } from '../contexts/filter_context';
import { usePagination } from '../custom_hooks/usePagination';
import { itemsPerListOptions } from '../utils/constants';

export const PageSelector = ({ handlePageChange, updateItemsPerList, itemsPerList }) => {

    const {
        curPage,
        maxPage
    } = useFilterContext();

    const pageRange = usePagination({
        curPage, maxPage, offset: 4
    });

    return <Wrapper>
        <nav>
            <ul>
                {
                    curPage > 1 &&
                    <li>
                        <button
                            type='button'
                            onClick={() => { handlePageChange(curPage - 1) }}
                        ><ImArrowLeft2 /></button>
                    </li>
                }
                {
                    pageRange.map((num, index) => {
                        return <li
                            className={num === curPage ? 'selected' : 'num-btn'}
                            key={index}
                        >
                            {
                                num === curPage || num === '\u2026' ?
                                    <span>{num}</span> :
                                    <button
                                        type='button'
                                        onClick={() => { handlePageChange(num) }}
                                    >{num}</button>
                            }
                        </li>
                    })
                }
                {
                    curPage < maxPage &&
                    <li>
                        <button
                            type='button'
                            onClick={() => { handlePageChange(curPage + 1) }}
                        ><ImArrowRight2 /></button>
                    </li>
                }
            </ul>
            <section className='ipl-container'>
                <label>Items Per Page</label>
                <select
                    onChange={(e) => updateItemsPerList(+e.target.value)}
                    value={itemsPerList}
                >
                    {itemsPerListOptions.map((o, index) => {
                        return <option
                            key={index}
                            value={o}
                        >
                            {o}
                        </option>;
                    })}
                </select>
            </section>
        </nav>
    </Wrapper>;
};

const Wrapper = styled.article`
    nav {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
    }
    ul {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: .5rem;
    }
    button {
        background-color: transparent;
        border: none;
        color: var(--clr-font-secondary);
        cursor: pointer;
        font-weight: 700;
    }
    li {
        font-weight: 700;
        padding: .4rem 1rem;
    }
    a {
        color: var(--clr-font-secondary);
        cursor: pointer;
    }
    .selected {
        background-color: var(--clr-form-fill);
        border: 2px solid var(--clr-border);
        border-radius: 12px;
    }
    .ipl-container {
        margin: auto;
    }
`;