import { useState, useEffect } from 'react';

export const PaginationContext = React.createContext();

export const PaginationProvider = ({ children, pageOffset = 5 }) => {

    const [curPage, setCurPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [pageRange, setPageRange] = useState([]);

    const updateCurPage = (newPage) => {
        const validNewPage = Math.min(1, Math.max(newPage, maxPage));

        setCurPage(validNewPage);
    };

    const updateMaxPage = (maxPage) => {
        setMaxPage(maxPage);
    };

    const updatePageRange = () => {
        const minValidPage = Math.max(1, curPage - pageOffset);
        const maxValidPage = Math.min(maxPage, curPage + pageOffset);

        setPageRange(Array.from({ length: maxValidPage - minValidPage },
            (_, index) => minValidPage + index));
    };

    useEffect(() => {
        updatePageRange();

    }, [curPage, maxPage]);

    return <PaginationContext.Provider
        value={{
            curPage,
            maxPage,
            pageRange,
            updateCurPage,
            updateMaxPage
        }}
    >
        {children}
    </PaginationContext.Provider>;
};