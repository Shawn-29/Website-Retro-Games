export const constructURL = (url, ...entries) => {

    let newURL = '';

    for (const [key, value] of entries) {
        if (value.length === 0) {
            continue;
        }

        if (newURL.length > 0) {
            newURL += '&';
        }
        newURL += `${key}=${value}`;
    }
    if (newURL.length > 0) {
        newURL = '?' + newURL;
    }

    newURL = url + newURL;

    return newURL;
};

export const getResource = async (url) => {

    const response = await fetch(url);

    /* response.status must be in the range of 200-299 for it to be considered ok */
    if (!response.ok) {
        throw new Error(`Error getting resource. Network responded with "${response.statusText}."`);
    }

    const data = await response.json();

    return data;
};

export const getStrPos = (strSearch, arr, strDefault = null) => {

    const index = arr.findIndex(str => str.includes(strSearch)),
        strMatch = index > -1 ? arr[index] : strDefault;

    return {
        index,
        strMatch
    };
};

export const getEleDimensions = (el) => {

    const computedStyle = getComputedStyle(el);

    return {
        height: el.offsetHeight +
            parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom),
        width: el.offsetWidth +
            parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight)
    };
}

export const getLocalStorage = () => {

    try {
        if (navigator.cookieEnabled && window.localStorage) {
            return window.localStorage;
        }
    }
    catch (e) {
        return null;
    }
}

export const getRoundedPercentages = (dataset) => {

    const diff = 100 - dataset.reduce((sum, val) => sum + Math.floor(val), 0);

    // return [...dataset].sort(x => Math.floor(x) - x)
    return dataset
        .map((val, index) => {
            return index < diff ? Math.floor(val) + 1 : Math.floor(val);
        });
};