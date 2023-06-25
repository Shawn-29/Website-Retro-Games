import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ImageMagnifier } from './ImageMagnifier';
import { CDN_ENDPOINT, PLACEHOLDER_IMG_URL } from '../utils/constants';

export const ImageGallery = ({ imgUrls = [] }) => {

    const [curIndex, setCurIndex] = useState(0);
    const smImgRefs = useRef([...imgUrls].fill(null));

    const changeImg = (index) => {
        setCurIndex(index);
    }

    /* show the first image by default */
    useEffect(() => {
        changeImg(0, imgUrls[0]);
    }, [imgUrls]);

    return <Wrapper>
        <ImageMagnifier
            backgroundColor='var(--clr-theme-secondary)'
            borderColor='var(--clr-border)'
            borderRadius='var(--radius)'
            imgUrl={`${CDN_ENDPOINT}${imgUrls[curIndex]}`}
            fallbackImgUrl={`${CDN_ENDPOINT}${PLACEHOLDER_IMG_URL}`}
            height='18rem'
            width='22rem'
            zoomPerc={2}
        />
        <div className='sm-img-container'>
            {imgUrls.map((url, index) => {
                return <div
                    ref={(ele) => smImgRefs.current[index] = ele}
                    className={`thumbnail ${index === curIndex ? 'selected' : ''}`}
                    key={index}
                    onClick={() => changeImg(index)}
                >
                    <img
                        src={`${CDN_ENDPOINT}${url}`}
                        alt=''
                        onLoad={() => {
                            /* this image loaded correctly so make its container
                                visible so users can view and enlarge it */
                            smImgRefs.current[index].style.display = 'block';
                        }}
                    />
                </div>;
            })}
        </div>
    </Wrapper>
};

const Wrapper = styled.article`
    margin-bottom: 2rem;
    max-width: 768px;
    width: 100%;
    .sm-img-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
    }
        .thumbnail {
            border: 1px solid var(--clr-border);
            border-radius: var(--radius);
            cursor: pointer;
            display: none;
            padding-top: 100%;
            position: relative;
            width: 100%;
        }
            .thumbnail > img {
                height: 100%;
                left: 0;
                padding: 5px;
                position: absolute;
                top: 0;
                width:100%;
            }
    .selected {
        box-shadow: 0 0 0 2px var(--clr-border);
    }
`;