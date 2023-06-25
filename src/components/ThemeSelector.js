import styled from 'styled-components';
import { useTheme } from '../custom_hooks/useTheme';

export const ThemeSelector = () => {

    const {
        curTheme,
        setTheme,
        themes
    } = useTheme();

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return <Wrapper>
        <label htmlFor='theme'>Theme:</label>
        <select
            value={curTheme}
            onChange={handleThemeChange}
            name='theme'
            id='theme'
        >
            {
                themes.map((theme, index) =>
                    <option key={index} value={theme}>
                        {theme}
                    </option>)
            }
        </select>
    </Wrapper>
};

const Wrapper = styled.div`
    color: var(--clr-font-primary);
`;