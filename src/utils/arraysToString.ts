
export function arrayToString(array: string[]) {
    if (!Array.isArray(array)) {
        throw new Error('El argumento debe ser un array');
    }
    return array.join(',');
}

export function stringToArray(string: string) {
    if (typeof string !== 'string') {
        throw new Error('El argumento debe ser un string');
    }
    return string.split(',').map(item => item.trim());
}