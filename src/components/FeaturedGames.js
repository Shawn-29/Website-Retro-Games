import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Game, Spinner } from '.';
import { getResource, getStrPos } from '../utils/helpers';
import { API_ENDPOINT, PLACEHOLDER_IMG_URL } from '../utils/constants';

export const FeaturedGames = () => {
    const [curIndex, setCurIndex] = useState(0);
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const nextSlide = useCallback(() => {
        setCurIndex(prevIndex => {
            const newIndex = prevIndex + 1;
            return newIndex > games.length - 1 ?
                0 : newIndex;
        });
    }, [games]);

    const prevSlide = useCallback(() => {
        setCurIndex(prevIndex => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ?
                games.length - 1 : newIndex;
        });
    }, [games]);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
        /* start the slide show when the games first load */
    }, [curIndex, games, nextSlide]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            await getResource(`${API_ENDPOINT}/featured`)
            .then(data => setGames(data.featured_games))
            .catch(_ => setGames([]));

            setIsLoading(false);
        })();
        // eslint-disable-next-line
    }, []);

    return <Wrapper className='jumbotron'>
        <h2 className='text-center'>Featured Games</h2>
        {
            (isLoading && <Spinner />) ||
            (games.length > 0 ?
                <div className='slider-box'>
                    {games.map((game, index) => {

                        let position = 'next-slide';
                        if (curIndex === index) {
                            position = 'active-slide';
                        }
                        else if (curIndex === index - 1 ||
                            (index === 0 && curIndex === games.length - 1)) {
                            position = 'prev-slide';
                        }

                        return <SliderGame
                            key={index}
                            position={position}
                            {...game}
                        />;
                    })}
                    {/* slider navigation buttons must be at the bottom of the slider box
                        for them to have input precedence over their sibling elements */}
                    <FiChevronLeft className='slide-btn left' onClick={prevSlide} />
                    <FiChevronRight className='slide-btn right' onClick={nextSlide} />
                </div> :
                <header className='error-header'>
                    <h4>There are no featured games at this time.</h4>
                    <h4>Please check back later.</h4>
                </header>
            )}
    </Wrapper>;
};

const SliderGame = (props) => {

    let imgUrl = null;

    if (typeof props.img_urls === 'string') {
        const gameImgUrls = props.img_urls.split(',');

        /* attempt to get the front box image;
            if no front box image was found, show the first image */
        imgUrl = getStrPos('front.', gameImgUrls, gameImgUrls[0]).strMatch;
    }

    return <SliderGameStyle className={props.position}>
        <Game {...props} img={imgUrl || PLACEHOLDER_IMG_URL} />
    </SliderGameStyle>;
};

const SliderGameStyle = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: all .35s linear;
    width: 100%;
    .game {
        border: 1px solid var(--clr-font-primary);
        height: 100%;
        width: 18rem;
    }
    .game a {
        color: var(--clr-font-primary);
    }
`;

const Wrapper = styled.article`
    background-color: var(--clr-theme-primary);
    color: var(--clr-font-primary);
    padding-top: 1rem;
    position: relative;
    .slider-box {
        margin: 0 auto;
        height: 24rem;
        max-width: 800px;
        text-align: center;
        position: relative;
        overflow: hidden;
        width: 80vw;
    }
    .slide-btn {
        background-color: var(--clr-theme-secondary);
        border-radius: var(--radius);
        color: var(--clr-font-secondary);
        cursor: pointer;
        height: 2rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: var(--transition);
        width: 2rem;
    }
    .slide-btn:hover {
        background-color: var(--clr-orange);
        color: var(--clr-white);
    }
    .slide-btn.left {
        left: 0;
    }
    .slide-btn.right {
        right: 0;
    }
    .active-slide {
        opacity: 1 !important;
        transform: translateX(0);
    }
    .prev-slide {
        transform: translateX(-100%);
    }
    .next-slide {
        transform: translateX(100%);
    }
`;