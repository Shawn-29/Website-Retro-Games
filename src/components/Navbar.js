import { useRef, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFilterContext } from '../contexts/filter_context';
import { ThemeSelector } from '.';
import { getEleDimensions } from '../utils/helpers';

export const Navbar = forwardRef((_, ref) => {

    const { url } = useFilterContext();

    const links = [
        { id: 1, text: 'home', url: '/', },
        { id: 2, text: 'games', url, },
        { id: 3, text: 'platforms', url: '/platforms', }
    ];

    const linksRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getContentHeight: () => {
            return `${getEleDimensions(linksRef.current).height}px`;
        }
    }));

    return <Wrapper>
        <ul ref={linksRef} className='links-container'>
            {links.map(link => {
                const { id, text, url } = link;
                return <li key={id}>
                    <Link to={url}>{text}</Link>
                </li>;
            })}
            <li>
                <ThemeSelector />
            </li>
        </ul>
    </Wrapper>;
});

const Wrapper = styled.nav`
    background-color: var(--clr-theme-primary);
    a {
        color: var(--clr-font-primary);
        display: block;
        width: 100%;
    }
    a:hover {
        border-bottom: none;
    }
    li {
        margin: 0;
        width: 100%;
    }
    .links-container {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        min-height: 4rem;
        text-align: center;
    }
    @media screen and (min-width: 576px) {
        .nav-container {
            position: static;
            max-height: 100% !important;
        }
        li {
            margin: 0 2rem;
            width: auto;
        }
    }
`;