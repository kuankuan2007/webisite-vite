let localStorageSetItem=localStorage.setItem.bind(localStorage);
let localStorageGetItem=localStorage.getItem.bind(localStorage);
localStorage.setItem=function (key, value) {
    let setItemEvent = new Event('localStorageSetItemEvent');
    setItemEvent.oldValue = localStorageGetItem(key);
    setItemEvent.newValue = value;
    setItemEvent.key = key;
    localStorageSetItem(...arguments);
    window.dispatchEvent(setItemEvent);
};
localStorage.getItem=function (key) {
    let setItemEvent = new Event('localStorageGetItemEvent');
    let value = localStorageGetItem(...arguments);
    setItemEvent.value = value;
    setItemEvent.key = key;
    localStorageGetItem(this,...arguments);
    window.dispatchEvent(setItemEvent);
    return value;
};
export default 1