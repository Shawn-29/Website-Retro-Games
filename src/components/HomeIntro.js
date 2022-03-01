import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CDN_ENDPOINT } from '../utils/constants';

export const HomeIntro = () => {
    return <Wrapper className='jumbotron'>
        <article className='main-container'>
            <section>
                <header>
                    <h1>Explore the World of Retro Videogames!</h1>
                    <p>
                        Search our database of thousands of games from your favorite classic game
                        consoles including Sega Genesis and Super Nintendo! Our simple search filters
                        make finding just the right game easy!
                    </p>
                    <Link to='./games'>
                        <button type='button' className='btn'>
                            Browse Games
                        </button>
                    </Link>
                </header>
            </section>
            <img src={`${CDN_ENDPOINT}game_home_image_2.png`} alt='A stack of retro video games.' />
        </article>
    </Wrapper>;
};

const Wrapper = styled.article`
    position: relative;
    .main-container {
        color: var(--clr-font-secondary);
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 1fr;
        padding: 2rem 1rem;
    }
    h1 {
        font-family: serif;
        text-align: center;
    }
    section {
        padding-left: 0;
    }
    a {
        display: inline-block;
        margin: 1rem 0;
    }
    img {
        display: block;
        filter: drop-shadow(0 0 2px var(--clr-border))
            drop-shadow(0 0 12px var(--clr-border));
        width: 100%;
    }
    @media screen and (min-width: 768px) {
        .main-container {
            grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        }
        section {
            padding-left: 20%;
        }
    }
`;
