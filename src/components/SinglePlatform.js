import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PLACEHOLDER_IMG_URL, API_ENDPOINT, CDN_ENDPOINT } from "../utils/constants";
import { Chart } from "./Chart";
import { useImageStripeContext } from './ImageStripe';
import { ImageMagnifier } from './ImageMagnifier';
import { getRoundedPercentages, getResource } from "../utils/helpers";

export const SinglePlatform = () => {

    const [isPercData, setIsPercData] = useState(false);
    const [pData, setPData] = useState({});

    const { curKey } = useImageStripeContext();

    useEffect(() => {
        (async () => {
            await getResource(`${API_ENDPOINT}/platform?pId=${curKey}`)
                .then(data => {
                    setPData(data);
                })
                .catch(_ => setPData({}));
        })();
    }, [curKey]);

    const chartData = useMemo(() => {
        const genres = pData.genres ?? [];
        let chartData = null;
        if (isPercData) {
            const totalGames = genres.reduce((sum, d) => sum + d.count, 0);

            const percentValues = getRoundedPercentages(genres.map(g => Math.max(1, g.count / totalGames * 100)));

            chartData = genres.map((g, index) => {
                return {
                    field: g.type,
                    value: percentValues[index]
                }
            })
                .sort((a, b) => new Intl.Collator('en').compare(a.field, b.field));
        }
        else {
            chartData = (genres
                .map(g => ({ field: g.type, value: g.count }))
                .sort((a, b) => new Intl.Collator('en').compare(a.field, b.field)));
        }
        return chartData;
    }, [pData.genres, isPercData]);

    const {
        name,
        release_year,
        img_url,
    } = pData ?? {};

    return <Wrapper className='main-container'>
        <ImageMagnifier
            backgroundColor={'var(--clr-theme-secondary)'}
            borderColor={'var(--clr-border)'}
            borderRadius={'var(--radius)'}
            fallbackImgUrl={`${CDN_ENDPOINT}${PLACEHOLDER_IMG_URL}`}
            height={'18rem'}
            imgUrl={`${CDN_ENDPOINT}${img_url}`}
            width={'18rem'}
            zoomPerc={2}
        />
        <section className='data-area'>
            <header>
                <h2>{name}</h2>
            </header>
            <p className='info'><span className='bold'>Release Year : </span>{release_year}</p>
            <p className='info'>
                <Link to={`./games?platforms=${name}`}>
                    <button type='button' className='btn'>Explore {name} Games</button>
                </Link>
            </p>
            <Chart
                title={`Games by Genre (${isPercData ? '%' : 'Quantity'})`}
                data={chartData}
                barColors={'var(--clr-theme-primary)'}
            />
            <div style={{
                display: "flex",
                justifyContent: 'center',
                marginTop: '.5rem'
            }}>
                <label htmlFor='chkPerc' className='link-label'>Show As Percent</label>
                <input
                    type='checkbox'
                    id='chkPerc'
                    checked={isPercData}
                    onChange={() => setIsPercData(!isPercData)}
                />
            </div>
        </section>
    </Wrapper>
};

const Wrapper = styled.article`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    padding: 1rem;
    .data-area {
        display: block;
        text-align: center;
        width: 100%;
    }
    .info {
        margin-bottom: 1rem;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 1rem 0;
        .data-area {
            text-align: left;
        }
    }
`;