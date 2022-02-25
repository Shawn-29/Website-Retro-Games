import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { DropDown, Game } from '.'
import { useFilterContext } from '../contexts/filter_context';
import { PLACEHOLDER_IMG_URL } from '../utils/constants';
import { getStrPos } from '../utils/helpers';
import { PageSelector } from './PageSelector'
import { Filters } from '.';

export const GameList = () => {

    const {
        gameList,
        totalGames,
        itemsPerList,
        updateCurPage,
        updateItemsPerList,
        error
    } = useFilterContext();

    const resetScrollRef = useRef(null);

    useEffect(() => {
        const scrollEvent = window.addEventListener('scroll', () => {
            if (resetScrollRef.current) {
                if (window.scrollY >= 768)
                    resetScrollRef.current.style.visibility = 'visible';
                else
                    resetScrollRef.current.style.visibility = 'hidden';
            }
        });

        return () => {
            window.removeEventListener('scroll', scrollEvent);
        }
    }, [gameList]);

    if (error) {
        return <article>
            <header className='error-header'>
                <h4>There are no games at this time.</h4>
                <h4>Please check back later.</h4>
            </header>
        </article>;
    }

    return <Wrapper>
        <DropDown
            ContentComponent={Filters}
            contentMsg='Filters'
        />
        <div>
            <section className='results-display'>
                Showing <span className='bold'>
                    {gameList.length}
                </span> of <span className='bold'>
                    {Number(totalGames).toLocaleString('en-us')}
                </span> Games
            </section>
            <section className='game-container'>
                {gameList.map((game, index) => {

                    let imgUrl = null;

                    if (typeof game.img_urls === 'string') {
                        const gameImgUrls = game.img_urls.split(',');

                        /* attempt to get the front box image;
                            if no front box image was found, show the first image */
                        imgUrl = getStrPos('front.', gameImgUrls, gameImgUrls[0]).strMatch;
                    }

                    return <Game key={index} {...game} img={imgUrl || PLACEHOLDER_IMG_URL} />;
                })}
            </section>
            <PageSelector
                handlePageChange={updateCurPage}
                updateItemsPerList={updateItemsPerList}
                itemsPerList={itemsPerList}
            />
            <button
                ref={resetScrollRef}
                type='button'
                className='btn-return'
                onClick={() => window.scrollTo({
                    top: 0,
                    behavior: 'auto'
                })}
            >
                To Top&nbsp;<FaAngleDoubleUp />
            </button>
        </div>
    </Wrapper>;
};

const Wrapper = styled.article`
    display: grid;
    grid-gap: .5rem;
    grid-template-columns: auto;
    padding-top: 0;
    width: 100%;
    ::after {
        display: block;
    }
    .btn-return {
        align-items: center;
        background-color: var(--clr-theme-primary);
        border: 2px solid var(--clr-border);
        border-radius: 24px;
        bottom: 1rem;
        box-shadow: -4px 4px 4px var(--clr-border);
        color: var(--clr-font-primary);
        display: flex;
        font-size: 1.25rem;
        justify-content: center;
        left: 100%;
        padding: .5rem 1rem;
        position: sticky;
        transition: var(--transition);
        visibility: hidden;
    }
    .btn-return:hover {
        background-color: var(--clr-font-primary);
        color: var(--clr-theme-primary);        
    }
    .results-display {
        margin-bottom: .5rem;
        text-align: center;
    }
    .game-container {
        align-items: center;
        display: grid;
        grid-gap: .5rem;
        grid-template-columns: repeat(auto-fill, 100%);
        justify-items: center;
        margin: 0 1.75rem;
    }
    @media screen and (min-width: 576px) {
        grid-template-columns: var(--sidebar-width) auto;
        padding-top: 1rem;
        .results-display {
            text-align: left;
        }
        .game-container {
            grid-gap: 1.75rem;
            grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
            margin: 0;
        }
    }
    @media screen and (min-width: 1200px) {
        grid-template-columns: var(--sidebar-width) auto var(--sidebar-width);
    }
`;