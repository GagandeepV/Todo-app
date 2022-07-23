let storage = window.localStorage

export function setItem(key, value) {
    if ("object" === typeof (value)) value = JSON.stringify(value)
    storage.setItem(key, value)
}

export function getItem(key) {
    return JSON.parse(storage.getItem(key))
}

export function removeItem(key) {
    storage.removeItem(key)
}

export function clear() {
    storage.clear()
}