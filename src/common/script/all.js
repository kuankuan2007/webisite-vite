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
let sessionStorageSetItem=sessionStorage.setItem.bind(sessionStorage);
let sessionStorageGetItem=sessionStorage.getItem.bind(sessionStorage);
sessionStorage.setItem=function (key, value) {
    let setItemEvent = new Event('sessionStorageSetItemEvent');
    setItemEvent.oldValue = sessionStorageGetItem(key);
    setItemEvent.newValue = value;
    setItemEvent.key = key;
    sessionStorageSetItem(...arguments);
    window.dispatchEvent(setItemEvent);
};
sessionStorage.getItem=function (key) {
    let setItemEvent = new Event('sessionStorageGetItemEvent');
    let value = sessionStorageGetItem(...arguments);
    setItemEvent.value = value;
    setItemEvent.key = key;
    sessionStorageGetItem(this,...arguments);
    window.dispatchEvent(setItemEvent);
    return value;
};
window.passContextmenuEvent=null
window.addEventListener("contextmenu",(e)=>{
    if (window.passContextmenuEvent && e.target==window.passContextmenuEvent){
        window.passContextmenuEvent=null
    }
})
export default 1