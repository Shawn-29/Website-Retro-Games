import { useEffect, useRef } from "react";
import styled from "styled-components";

export const Chart = ({
    data = [],
    title = '',
    barColors = [
        '#900', '#090', '#009',
        '#990', '#409', '#940'
    ]
}) => {

    const fieldRefs = useRef([...data].fill(null));

    useEffect(() => {
        if (Array.isArray(fieldRefs.current)) {
            /* get the highest value whose bar will fill 100% of the chart's
                width and be used to calculate the width of the other bars */
            const highValue = Math.max(...data.map(d => d.value));

            /* increase bar length for each category */
            fieldRefs.current.forEach((ele, index) => {
                if (!(ele instanceof HTMLDivElement)) {
                    return;
                }
                ele.style.transitionDuration = '1s';
                ele.style.maxWidth = `${(data[index].value / highValue * 100) | 0}%`;
            });
        }
    }, [data]);

    /* reset all bar lengths */
    if (Array.isArray(fieldRefs.current)) {
        fieldRefs.current.forEach((ele) => {
            if (!(ele instanceof HTMLDivElement)) {
                return;
            }
            /* the bar length reset should happen immediately */
            ele.style.transitionDuration = '0s';
            ele.style.maxWidth = '0';
        });
    }

    return <Wrapper>
        <table className='chart-area'>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>{title}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, index) => {
                    const { field, value } = d;
                    return <tr key={index}>
                        <td className='field-name'>{field}</td>
                        <td className='field-bar-wrapper'>
                            <div className='field-bar'
                                style={{
                                    backgroundColor: Array.isArray(barColors) ?
                                        barColors[index % barColors.length] : barColors
                                }}
                                ref={(ele) => fieldRefs.current[index] = ele}
                            >{value}
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </Wrapper>;
};

const Wrapper = styled.article`
    overflow-x: hidden;
    width: 100%;
    .chart-title {
        text-align: center;
    }
    .chart-area {
        border: 1px solid var(--clr-border);
        border-radius: var(--radius);
        opacity: 1;
        padding: .25rem;
        position: relative;
        width: inherit;
    }
    .field-name {
        line-height: 1;
        padding-right: .5rem;
        text-align: right;
    }
    .field-bar-wrapper {
        width: 100%;
    }
    .field-bar {
        align-items: center;
        box-shadow: 0 0 1rem var(--clr-black) inset;
        color: var(--clr-white);
        display: flex;
        justify-content: right;
        max-width: 0;
        min-width: min-content;
        /* text might overflow its bar when it initially appears */
        overflow-x: hidden;
        padding-right: 4px;
        transition: max-width ease 0s;
    }
`;