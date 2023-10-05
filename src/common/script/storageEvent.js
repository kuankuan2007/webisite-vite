const _localStorage = localStorage
const _sessionStorage = sessionStorage

const myLocalStorage = new Proxy(_localStorage, {
    get: function (target, key, receiver) {
        const specialValue = {
            setItem(key, value) {
                let setItemEvent = new Event('localStorageSetItemEvent');
                setItemEvent.oldValue = target.getItem(key);
                setItemEvent.newValue = value;
                setItemEvent.key = key;
                target.setItem(...arguments);
                window.dispatchEvent(setItemEvent);
            }, getItem(key, defaultsValue=null) {
                let getItemEvent = new Event('localStorageGetItemEvent');
                let value = target.getItem(key);
                getItemEvent.value = value;
                getItemEvent.key = key;
                window.dispatchEvent(getItemEvent);
                if(value===null){
                    return defaultsValue
                }
                return value;
            }, removeItem(key) {
                let removeItemEvent = new Event('localStorageRemoveItemEvent');
                removeItemEvent.key = key;
                removeItemEvent.oldValue = target.getItem(key);
                target.removeItem(...arguments);
                window.dispatchEvent(removeItemEvent);
            }
        }
        if (key in specialValue) {
            return specialValue[key].bind(target)
        }
        const getItemEvent = new Event('localStorageGetItemEvent');
        const value = target[key];
        getItemEvent.value = value;
        getItemEvent.key = key;
        window.dispatchEvent(getItemEvent);
        return value
    },set(target,key,value,receiver){
        const setItemEvent = new Event('localStorageSetItemEvent');
        setItemEvent.oldValue = target[key];
        setItemEvent.key = key;
        setItemEvent.newValue = value;
        target[key]=value
        window.dispatchEvent(setItemEvent);
    },deleteProperty(target,key,receiver){
        const removeItemEvent = new Event('localStorageRemoveItemEvent');
        removeItemEvent.key = key;
        removeItemEvent.oldValue = target.getItem(key);
        delete target[key]
        window.dispatchEvent(removeItemEvent);
    }
})

const mySessionStorage = new Proxy(_sessionStorage, {
    get: function (target, key, receiver) {

        const specialValue = {
            setItem(key, value) {
                const setItemEvent = new Event('sessionStorageSetItemEvent');
                setItemEvent.oldValue = target.getItem(key);
                setItemEvent.newValue = value;
                setItemEvent.key = key;
                target.setItem(...arguments);
                window.dispatchEvent(setItemEvent);
            }, getItem(key,defaultsValue=null) {
                const getItemEvent = new Event('sessionStorageGetItemEvent');
                const value = target.getItem(key);
                getItemEvent.value = value;
                getItemEvent.key = key;
                window.dispatchEvent(getItemEvent);
                if (value===null){
                    return defaultsValue
                }
                return value;
            }, removeItem(key) {
                const removeItemEvent = new Event('sessionStorageRemoveItemEvent');
                removeItemEvent.key = key;
                removeItemEvent.oldValue = target.getItem(key);
                target.removeItem(...arguments);
                window.dispatchEvent(removeItemEvent);
            }
        }
        if (key in specialValue) {
            return specialValue[key].bind(target)
        }

        const getItemEvent = new Event('sessionStorageGetItemEvent');
        const value = target[key];
        getItemEvent.value = value;
        getItemEvent.key = key;
        window.dispatchEvent(getItemEvent);

        return value
    },set(target,key,value,receiver){
        const setItemEvent = new Event('sessionStorageSetItemEvent');
        setItemEvent.oldValue = target[key];
        setItemEvent.key = key;
        setItemEvent.newValue = value;
        target[key]=value
        window.dispatchEvent(setItemEvent);
    },deleteProperty(target,key,receiver){
        const removeItemEvent = new Event('sessionStorageRemoveItemEvent');
        removeItemEvent.key = key;
        removeItemEvent.oldValue = target.getItem(key);
        delete target[key]
        window.dispatchEvent(removeItemEvent);
    }
})

Object.defineProperty(window, "localStorage", {
    value: myLocalStorage,
    writable: false,
    configurable: false
})
Object.defineProperty(window, "sessionStorage", {
    value: mySessionStorage,
    writable: false,
    configurable: false
})