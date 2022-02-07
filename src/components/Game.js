import { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CDN_ENDPOINT } from '../utils/constants';

export const Game = ({ img, title, platform, release_year }) => {
    const wrapRef = useRef(null);
    return <Wrapper className='game'>
        <Link to={`/game?title=${title}_${platform}`}>
            <img ref={wrapRef}
                src={`${CDN_ENDPOINT}${img}`}
                alt={title}
                onLoad={() => wrapRef.current.style.opacity = '1'}
                onError={() => wrapRef.current.style.opacity = '1'}
                loading='lazy'
            />
            <div className='overlay'></div>
            <div className='game-info'>
                <h4>{title}</h4>
                <h5>{release_year}</h5>
            </div>
        </Link>
    </Wrapper>;
};

const Wrapper = styled.div`
    border: 1px solid var(--clr-border);
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    height: 16rem;
    justify-content: center;
    /* opacity: 0; */
    overflow: hidden;
    padding: .5rem;
    position: relative;
    text-align: center;
    user-select: none;
    width: 100%;
    .inner {
        display: flex;
    }
    a {
        width: inherit;
    }
    img {
        display: block;
        height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: .4s opacity linear 0s;
        width: inherit;
    }
    .game-info {
        bottom: 0;
        color: var(--clr-white);
        left: 0;
        padding: .25rem 0 .75rem;
        position: absolute;
        text-shadow: -3px 3px 6px #000, -3px 3px 6px #000;
        transform: translateY(100%);
        transition: var(--transition);
        width: 100%;
    }
    .game-info h4 {
        padding-bottom: .5rem;
    }
    :hover .game-info {
        transform: translateY(0);
    }
    .overlay {
        background-color: #000b;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
    :hover .overlay {
        opacity: .6;
    }
`;