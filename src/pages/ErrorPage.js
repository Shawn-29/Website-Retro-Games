import { Link } from 'react-router-dom'
import styled from 'styled-components';

export const ErrorPage = () => {
    return <Wrapper className='main-container'>
        <article>
            <header>
                <h1>Page Not Found</h1>
                <p>You've stumbled upon a page that doesn't exist.</p>
                <Link to='/'>
                    <button type='button' className='btn'>
                        Go to Home Page
                    </button>
                </Link>
            </header>
        </article>
    </Wrapper>;
};

const Wrapper = styled.main`
    margin-top: 1rem;
    text-align: center;
`;