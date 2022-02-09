import styled from "styled-components";

export const CheckBox = ({id, labelText, onChange, isChecked}) => {
    return <Wrapper>
        <input
            type='checkbox'
            name={id}
            id={id}
            checked={isChecked}
            onChange={onChange}
        />
        <label htmlFor={id} className='link-label'>{labelText}</label>
    </Wrapper>;
};

const Wrapper = styled.div`
    align-items: baseline;
`;