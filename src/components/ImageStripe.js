import { createContext, useRef, useState, useContext } from 'react';
import styled from 'styled-components';

export const ImageStripeContext = createContext();

export const ImageStripe = ({ imgData = [{
    url: '',
    altText: '',
    id: 0
}], children }) => {

    const ref = useRef([...imgData].fill(null));

    const [curKey, setCurKey] = useState(imgData?.[0]?.id ?? null);

    return <ImageStripeContext.Provider value={{curKey}}>
        <Wrapper>
            <ul>
                {
                    imgData.map((data, index) => {
                        const key = data.id ?? index;
                        return <li
                            key={key}
                            onClick={() => setCurKey(key)}
                            className={key === curKey ? 'selected' : ''}
                        >
                            <img
                                ref={(ele) => ref.current[index] = ele}
                                src={data.url}
                                alt={data.altText}
                                onLoad={() => {
                                    ref.current[index].style.opacity = '1';
                                }}
                            />
                        </li>
                    })
                }
            </ul>
        </Wrapper>
        {children}
    </ImageStripeContext.Provider>;
};

export const useImageStripeContext = () => {
    return useContext(ImageStripeContext);
};

const Wrapper = styled.article`
    ul {
        background-color: var(--clr-form-fill);
        border-color: var(--clr-border);
        border-style: solid;
        border-width: 1px 0;
        display: grid;
        height: 8rem;
        justify-content: safe center;
        overflow-x: auto;
        overflow-y: hidden;
    }
    li {
        border-right: 1px solid var(--clr-border);
        cursor: pointer;
        grid-row: 1;
        height: inherit;
        transition: var(--transition);
        width: 12rem;
    }
    li:not(.selected):hover {
        background-color: var(--clr-theme-primary);
    }
    li img {
        height: 100%;
        object-fit: contain;
        opacity: 0;
        width: 100%;
        transition: .5s opacity linear 0s;
    }
    li:first-child {
        border-left: 1px solid var(--clr-border);
    }
    .selected {
        background-color: var(--clr-btn-bg);
    }
`;