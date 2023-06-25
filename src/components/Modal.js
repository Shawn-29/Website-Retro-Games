import { useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import { GrClose } from 'react-icons/gr';
import styled from "styled-components";
import { addGlobalHandler, removeGlobalHandler } from '../utils/global_handler';

export const Modal = ({
    closeModal = () => { },
    children,
    headerText = '',
    maxHeight = '100%',
    maxWidth = '100%',
    contentAriaRole = 'dialog'
}) => {

    const wrapperRef = useRef(null);
    const btnCloseRef = useRef(null);

    const lockScroll = () => {
        // document.querySelector('html').classList.add('no-overflow');
        document.body.classList.add('no-overflow');
    }
    const unlockScroll = () => {
        // document.querySelector('html').classList.remove('no-overflow');
        document.body.classList.remove('no-overflow');
    };

    const hideModal = () => {
        closeModal();
        unlockScroll();
    };

    useEffect(() => {
        wrapperRef.current.focus();
        lockScroll();

        const captureClicks = e => {
            if (
                /* close the modal if the user clicked outside of it
                    or clicked the close button */
                e.target.contains(wrapperRef.current) ||
                e.target.parentNode === btnCloseRef.current) {

                hideModal();
            }
        };

        document.body.addEventListener('click', captureClicks);

        addGlobalHandler({
            eventType: 'click',
            callback: captureClicks,
            priority: 1,
            isBlocking: true
        });

        /* the modal's consumer might reload the page while the modal is open
            so we need to unlock the document's primary scroll just in case */
        return () => {
            hideModal();
            removeGlobalHandler({
                eventType: 'click',
                callback: captureClicks
            });
        };
        // eslint-disable-next-line
    }, []);

    return createPortal(
        <Wrapper
            aria-modal='true'
            // onClick={e => e.target === e.currentTarget && hideModal()}
            // onTouchStart={e => e.target === e.currentTarget && hideModal()}
            onKeyDown={e => e.key === 'Escape' && hideModal()}
            ref={wrapperRef}
            /* onKeyDown won't work if tabIndex isn't set to a negative number */
            tabIndex='-1'
        >
            <section
                className='content-container'
                style={{
                    maxHeight,
                    maxWidth
                }}
            >
                <header>
                    <h3>{headerText}</h3>
                    <button
                        /* use aria-label over aria-labelledby when the element does not have text */
                        aria-label='close-modal'
                        type='button'
                        className='close-btn'
                        ref={btnCloseRef}
                        onClick={() => {
                            closeModal();
                            unlockScroll();
                        }}
                    >
                        <GrClose className='close-icon' />
                    </button>
                </header>
                <div role={contentAriaRole} className='content-wrapper'>
                    {children}
                </div>
            </section>
        </Wrapper>,
        /* using React's createPortal, render the modal as a child of the document's body
            so it will not be affected by other components' functionality (e.g. if another
            component would become hidden or change styling) */
        document.body
    );
};

const Wrapper = styled.article`
    background-color: #333c;
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: var(--z-index-modal);
    header {
        border-bottom: 2px solid var(--clr-border);
    }
    .content-container {
        background-color: var(--clr-form-fill);
        border: 2px solid var(--clr-border);
        border-radius: var(--radius);
        box-shadow: 0 0 4px 5px var(--clr-black);
        height: 95%;
        left: 50%;
        padding: 1rem;
        position: fixed;
        top: 1rem;
        transform: translateX(-50%);
        width: 95%;
    }
    .content-wrapper {
        height: inherit;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .close-btn {
        background-color: transparent;
        border: none;
        height: 1.6rem;
        margin: .35rem;
        position: absolute;
        right: 0;
        top: 0;
        width: 1.6rem;
    }
    .close-icon {
        height: inherit;
        width: inherit;
    }
`;