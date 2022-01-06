const globalHandler = {};
const bodyEvents = {};

const binarySearch = (sortedArray, pred) => {
    let lo = -1,
        hi = sortedArray.length;
    while (1 + lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        pred(sortedArray[mid]) ?
            hi = mid : lo = mid;
    }
    return hi;
}

const updateEventHandler = (eventType) => {
    document.body.removeEventListener(eventType, bodyEvents[eventType]);
    bodyEvents[eventType] = (e) => {
        /* must make a copy of the array as a callback might remove
            itself as a result of its execution, which would invalidate
            the iterator */
        const arr = [...globalHandler[eventType]];
        for (const event of arr) {
            event.callback(e);
            if (event.isBlocking) {
                break;
            }
        }
    };
    document.body.addEventListener(eventType, bodyEvents[eventType]);
}

export const addGlobalHandler = ({
    eventType,
    callback,
    priority = 0,
    isBlocking = false,
}) => {
    if (!Array.isArray(globalHandler[eventType])) {
        globalHandler[eventType] = [];
    }

    const temp = globalHandler[eventType];

    const insertIndex = binarySearch(temp, a => priority > a.priority);

    globalHandler[eventType] = [
        ...(temp.slice(0, insertIndex)),
        { callback, priority, isBlocking },
        ...(temp.slice(insertIndex))
    ];

    updateEventHandler(eventType);
};

export const removeGlobalHandler = ({ eventType, callback }) => {
    if (!Array.isArray(globalHandler[eventType])) {
        return false;
    }
    const deleteIndex = globalHandler[eventType].findIndex(event => event.callback === callback);
    if (deleteIndex > -1) {
        globalHandler[eventType].splice(deleteIndex, 1);
        updateEventHandler(eventType);
        return true;
    }
    return false;
};