import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useFetch } from '../custom_hooks/useFetch';
import { API_ENDPOINT, PLACEHOLDER_IMG_URL } from '../utils/constants';
import { ImageGallery } from '../components/ImageGallery';
import { getStrPos } from '../utils/helpers';
import { Spinner } from '../components/Spinner';
import { useFilterContext } from '../contexts/filter_context';

export const SingleGamePage = () => {

    const {
        isLoading,
        data,
        error
    } = useFetch(`${API_ENDPOINT}${useLocation().search}`);

    const { url } = useFilterContext();

    if (isLoading) {
        return <Wrapper className='main-container'>
            <Spinner />
        </Wrapper>;
    }

    if (error || !data?.gameData) {
        return <main>
            <header className='error-header'>
                <h4>We couldn't find the game you are looking for.</h4>
                <h4>Please check back later.</h4>
                <Link to='/'>
                    <button type='button' className='btn'>
                        Go to Home Page
                    </button>
                </Link>
            </header>
        </main>;
    }

    const {
        title,
        release_year,
        platform,
        publisher,
        developer,
        genre,
        description,
        img_urls
    } = data.gameData;

    /* separate comma-separated image urls from the server */
    let urls = img_urls?.split(',') ?? [PLACEHOLDER_IMG_URL];

    /* get the game's front box url if it exists */
    const { index: indexFront, strMatch: urlFront } =
        getStrPos('front.', urls);
    if (indexFront > -1) {
        urls.splice(indexFront, 1);
    }

    /* get the game's back box url if it exists */
    const { index: indexBack, strMatch: urlBack } =
        getStrPos('back.', urls);
    if (indexBack > -1) {
        urls.splice(indexBack, 1);
    }

    /* put the front and back box images first */
    urls = [urlFront, urlBack, ...urls].filter(elem => elem !== null);

    return <Wrapper className='main-container'>
        <article className='game-container'>
            <section>
                <header className='title-dev-sm'>
                    <h2>{title}</h2>
                </header>
                <ImageGallery imgUrls={urls} />
                <Link to={url}>
                    <button type='button' className='btn'>Back to Games</button>
                </Link>
            </section>
            <section>
                <header className='title-dev-lg'>
                    <h2>{title}</h2>
                </header>
                <p className='info'><span className='info-header'>Publisher : </span>{publisher}</p>
                <p className='info'><span className='info-header'>Developer : </span>{developer}</p>
                <p className='info'><span className='info-header'>Release Year : </span>{release_year}</p>
                <p className='info'><span className='info-header'>Genre : </span>{genre}</p>
                <p className='info'><span className='info-header'>Platform : </span>{platform}</p>
                <div className='description'>
                    <span className='info-header'>Box Text : </span>
                    <span className='info' style={{ whiteSpace: 'pre-line' }}>
                        {description}
                    </span>
                </div>
            </section>
        </article>
    </Wrapper>;
};

const Wrapper = styled.main`
    .game-container {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: repeat(1, 1fr);
        margin: 1rem .5rem;
    }
    .title-dev-sm {
        display: block;
        text-align: center;
    }
    .title-dev-lg {
        display: none;
    }
    .game-img {
        display: block;
        margin-bottom: 1rem;
        max-width: 20rem;
        width: 100%;
    }
    .img-container {
        margin: 0 auto;
    }
    .info {
        margin-bottom: 1rem;
    }
    .info-header {
        font-weight: bold;
    }
    .quote {
        color: var(--clr-theme);
        font-size: 1.5rem;
    }
    .left-quote {
        margin-right: .4rem;
    }
    .right-quote {
        margin-left: .4rem;
    }
    @media screen and (min-width: 768px) {
        .game-container {
            grid-template-columns: repeat(2, 1fr);
        }
        .title-dev-sm {
            display: none;
        }
        .title-dev-lg {
            display: block;
        }
    }
`;