import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const BORDER_WIDTH = 4;

export const ImageMagnifier = ({
    backgroundColor = '#eee',
    borderColor = '#bbb',
    borderRadius = '0',
    imgUrl = '',
    fallbackImgUrl = '',
    height = '100px',
    width = '100px',
    zoomPerc = 1.5
}) => {

    const [imgSrc, setImgSrc] = useState(imgUrl);

    const imgRef = useRef(null);
    const magRef = useRef(null);

    const getCursorPos = e => {
        /* get the x and y positions of the image */
        const { left, top } = imgRef.current.getBoundingClientRect();

        let x = 0,
            y = 0;

        /* is this event a touch event? */
        const touchInfo = e.changedTouches?.[0];
        if (touchInfo) {
            /* calculate the cursor's x and y coordinates, relative to the image */
            x = touchInfo.pageX;
            y = touchInfo.pageY;
        }
        else {
            x = e.pageX;
            y = e.pageY;
        }

        return {
            x: x - left - window.scrollX,
            y: y - top - window.scrollY
        };
    };

    const updateMagnifierSize = useCallback(() => {
        magRef.current.style.backgroundSize = `
            ${imgRef.current.width * zoomPerc}px ${imgRef.current.height * zoomPerc}px`;
    }, [zoomPerc]);

    const setMagVisible = (isVisible) => {
        magRef.current.style.display = isVisible ? 'block' : 'none';
    }

    useEffect(() => {
        window.addEventListener('resize', updateMagnifierSize);

        setImgSrc(imgUrl);

        return () => {
            window.removeEventListener('resize', updateMagnifierSize);
        }
    }, [imgUrl, updateMagnifierSize]);

    useEffect(() => {
        magRef.current.style.backgroundImage = `url("${imgSrc}")`;
    }, [imgSrc]);

    const moveMagnifier = useCallback(e => {
        e.preventDefault();

        let { x, y } = getCursorPos(e);

        const img = imgRef.current;
        const magnifier = magRef.current;

        const magWidth = magnifier.offsetWidth >> 1;
        const magHeight = magnifier.offsetHeight >> 1;

        /* prevent the magnifier magnifier from being positioned outside the image */
        const leftBounds = magWidth / zoomPerc - 0,
            rightBounds = img.width - leftBounds,
            topBounds = magHeight / zoomPerc,
            botBounds = img.height - topBounds;

        if (x < leftBounds)
            x = leftBounds;
        else if (x > rightBounds)
            x = rightBounds;
        if (y < topBounds)
            y = topBounds;
        else if (y > botBounds)
            y = botBounds;

        /* set the position of the magnifier magnifier */
        magnifier.style.left = (x - magWidth + img.offsetLeft) + "px";
        magnifier.style.top = (y - magHeight + img.offsetTop) + "px";

        /* display what the magnifier "sees" */
        magnifier.style.backgroundPosition = `
            ${-(x * zoomPerc - magWidth + BORDER_WIDTH)}px
            ${-(y * zoomPerc - magHeight + BORDER_WIDTH)}px
        `;
    }, [zoomPerc]);

    return <Wrapper style={{
        backgroundColor,
        borderColor,
        borderRadius
    }}
        onMouseLeave={() => { setMagVisible(false); }}
        onMouseMove={moveMagnifier}
        onMouseEnter={() => { setMagVisible(true); }}
        onTouchStart={() => { setMagVisible(true); }}
        onTouchEnd={() => { setMagVisible(false); }}
        onTouchMove={moveMagnifier}
    >
        <>
            <img
                ref={imgRef}
                alt=''
                src={imgSrc}
                onLoad={() => {
                    /* ensure the image fills its available space proportionately */
                    const img = imgRef.current;
                    if (img.naturalHeight > img.naturalWidth) {
                        imgRef.current.style.height = '100%';
                        imgRef.current.style.width = 'auto';
                    }
                    else {
                        imgRef.current.style.height = 'auto';
                        imgRef.current.style.width = '100%';
                    }
                    updateMagnifierSize();
                }}
                onError={() => {
                    setImgSrc(fallbackImgUrl);
                }}
            />
            <div
                ref={magRef}
                className='magnifier'
                style={{
                    backgroundColor,
                    backgroundPosition: 'center',
                    borderColor,
                    borderRadius,
                    height,
                    width
                }}
            ></div>
        </>
    </Wrapper>;
};

const Wrapper = styled.article`
    align-items: center;
    border-style: solid;
    border-width: 1px;
    cursor: none;
    display: flex;
    height: 20rem;
    justify-content: center;
    position: relative;
    width: 100%;
    img {
        display: block;
        max-height: 100%;
        max-width: 100%;
        touch-action: none;
    }
    .magnifier {
        background-repeat: no-repeat;
        border: ${BORDER_WIDTH}px solid var(--clr-border);
        display: none;
        /* prevent the magnifier from blocking move events on the main image */
        pointer-events: none;
        position: absolute;
        z-index: 999;
    }
`;