import styled from 'styled-components';

export const Footer = () => {
    return <Wrapper>
        <h5>&copy;{new Date().getFullYear()}</h5>
        <h5 className='site-name'>&nbsp;Retro Game Site&nbsp;</h5>
        <h5>All rights reserved.</h5>
    </Wrapper>;
};

const Wrapper = styled.footer`
    background-color: var(--clr-theme-dark);
    color: var(--clr-white);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2.5rem 0;
    .site-name {
        color: var(--clr-orange);
    }
`;