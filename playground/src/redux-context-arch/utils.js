/**
 * @param {Object} obj React Props object
 * @returns {Array<object>} One object per each Data property, methods are excluded 
 */
export function getValueProperties (obj) {
    return Object.entries(obj).filter((prop) => {
        return typeof prop[1] !== 'function';
    });
}

export function getMethodProperties (obj) {
    let methods = {};

    for (let k in obj) {
        if (obj.hasOwnProperty(k) && (typeof obj[k] === 'function')) {
            methods[k] = obj[k];
        }
    }

    return methods;
 }