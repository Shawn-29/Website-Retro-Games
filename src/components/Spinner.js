import styled from 'styled-components';

export const Spinner = () => {
    return <Wrapper>
        <div className='spinner'></div>
    </Wrapper>;
};

const Wrapper = styled.div`
    background-color: #2228;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    .spinner {
        animation: spinning .9s infinite linear;
        border: 6px solid var(--clr-theme-primary);
        border-radius: 50%;
        border-top-color: var(--clr-theme-secondary);
        box-shadow: 0 0 0 1px var(--clr-border), 0 0 0 1px var(--clr-border) inset;
        height: 3.5rem;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 3.5rem;
        z-index: 999;
    }
    @keyframes spinning {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;