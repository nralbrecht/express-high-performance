function jsonToArray(jsonData) {
    const array = [];
    for(const i in jsonData)
        array.push([i, jsonData[i]]);
    return array;
}

function toXWwwFormUrlencoded(objectData) {
    let xWwwFormUrlencoded = [];
    for (const property in objectData) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(objectData[property]);
        xWwwFormUrlencoded.push(encodedKey + "=" + encodedValue);
    }
    xWwwFormUrlencoded = xWwwFormUrlencoded.join("&");
    return xWwwFormUrlencoded;
}


export {
    jsonToArray,
    toXWwwFormUrlencoded
}