import { useState, useRef, useEffect } from 'react';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import styled from 'styled-components';
import { addGlobalHandler, removeGlobalHandler } from '../utils/global_handler';

export const DropDown = ({
    /* component the drop down wraps and hides/unhides */
    ContentComponent,
    /* drop down button text */
    contentMsg = '',
    /* supply a valid CSS color value */
    bgColor = null,
    /* if false, clicking in the ContentComponent will not close the drop down;
        useful for interacting with components once they are visible */
    forceClose = false,
    /* props to pass to the ContentComponent */
    ...props
}) => {

    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const contentWrapRef = useRef(null);
    const btnRef = useRef(null);

    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {

        const temp = wrapperRef.current;

        if (!isHidden) {
            contentWrapRef.current.style.overflowY = 'visible';
            contentWrapRef.current.style.maxHeight =
                contentRef.current.getContentHeight();
        }
        else {
            contentWrapRef.current.style.overflowY = 'hidden';
            contentWrapRef.current.style.maxHeight = '0';
        }

        const hideCheck = (e) => {
            if (temp) {
                if (e.target === btnRef.current) {
                    if (isHidden) {
                        setIsHidden(false);
                    }
                    else {
                        setIsHidden(true);
                    }
                }
                else if ((!temp.contains(e.target) || forceClose) && !isHidden) {
                    setIsHidden(true);
                }
            }
        }

        addGlobalHandler({
            eventType: 'click',
            callback: hideCheck,
            priority: 0
        });

        return () => {
            removeGlobalHandler({
                eventType: 'click',
                callback: hideCheck
            });
        }
    }, [isHidden, forceClose]);

    return <Wrapper ref={wrapperRef}>
        <button
            ref={btnRef}
            type='button'
            className='btn toggle-vis-btn'
            style={{ backgroundColor: typeof bgColor === 'string' ? bgColor : '' }}
        >
            {
                isHidden ?
                    <>
                        {`Show ${contentMsg}\u00A0`}
                        <div className='drop-arrow'><BsCaretDownFill /></div>
                    </> :
                    <>
                        {`Hide ${contentMsg}\u00A0`}
                        <div className='drop-arrow'><BsCaretUpFill /></div>
                    </>
            }
        </button>
        <section ref={contentWrapRef} className='content-wrapper'>
            <ContentComponent {...props} ref={contentRef} />
        </section>
    </Wrapper>;
};

const Wrapper = styled.article`
    /* reset line-height for outermost container otherwise browsers
        such as Chrome and Edge will add extra height */
    line-height: 1;
    .content-wrapper {
        box-shadow: 0 4px 7px var(--clr-black);
        line-height: var(--line-height);
        margin: auto;
        max-height: 0;
        overflow-y: hidden;
        position: absolute;
        width: 100%;
        z-index: var(--z-index-drop-down);
    }
    .toggle-vis-btn {
        align-items: center;
        border-bottom: 2px solid var(--clr-black);
        display: inline-flex;
        justify-content: center;
        width: 100%;
    }
    .drop-arrow {
        position: absolute;
        right: 8px;
    }
    @media screen and (min-width: 576px) {
        .content-wrapper {
            box-shadow: none;
            max-height: 100% !important;
            position: static;
        }
        .toggle-vis-btn {
            display: none;
        }
    }
`;