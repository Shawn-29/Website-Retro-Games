import { useMemo } from 'react';

export const usePagination = ({
    curPage,
    maxPage,
    offset
}) => {

    const pageRange = useMemo(() => {

        const rightExtra = curPage - offset < 1 ?
            offset - (curPage - 1) : 0;

        const leftExtra = curPage + offset > maxPage ?
            offset - (maxPage - curPage) : 0;

        const minValidPage = Math.max(1, curPage - offset - leftExtra);
        const maxValidPage = Math.min(maxPage, curPage + offset + rightExtra);

        const pageRange = Array.from({ length: maxValidPage - minValidPage + 1 },
            (_, i) => minValidPage + i);

        if (pageRange.length === offset * 2 + 1 &&
            maxPage > pageRange.length) {

            const atMidPage = leftExtra === 0 && rightExtra === 0;

            if (rightExtra > 0 || atMidPage) {
                pageRange[pageRange.length - 1] = maxPage;
                pageRange[pageRange.length - 2] = '\u2026';
            }
            if (leftExtra > 0 || atMidPage) {
                pageRange[0] = 1;
                pageRange[1] = '\u2026';
            }
        }

        return pageRange;

    }, [curPage, maxPage, offset]);

    return pageRange;
};