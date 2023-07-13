import { sprintf } from "sprintf"
import { customRef, ref } from "vue"
/**
 * Creates a debounced version of a function that delays its execution until after a specified delay.
 * @param {function} fn - The function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} - The debounced function.
 */
export function debounce(fn, delay = 300) {
    let timer;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args);
        }, delay);
    };
}
/**
 * Create a textarea element and set its properties.
 * The element is styled to be hidden offscreen and is appended to the body.
 * 
 * @param {String} text - The text to set as the value of the textarea.
 * @returns {HTMLTextAreaElement} - The created textarea element.
 */
function createElement(text) {
    // Check if the document direction is right-to-left (RTL)
    var isRTL = document.documentElement.getAttribute('dir') === 'rtl';

    // Create the textarea element
    var element = document.createElement('textarea');

    // Set the font size to prevent zooming effect in iOS
    element.style.fontSize = '12pt';

    // Reset the box model
    element.style.border = '0';
    element.style.padding = '0';
    element.style.margin = '0';

    // Move the element offscreen
    element.style.position = 'absolute';
    element.style[isRTL ? 'right' : 'left'] = '-9999px';

    // Move the element to the bottom of the page
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    element.style.top = `${yPosition}px`;

    // Set the element as read-only
    element.setAttribute('readonly', '');

    // Set the value of the textarea to the provided text
    element.value = text;

    // Append the element to the body
    document.body.appendChild(element);

    // Return the created textarea element
    return element;
}
/**
 * 
 * @param {String} text 
 */
export function copyText(text) {
    var element = createElement(text);
    element.select();
    element.setSelectionRange(0, element.value.length);
    document.execCommand('copy');
    element.remove();
}
/**
 * Retrieves the value of a query variable from the URL.
 * If the variable is not found, returns the provided elsevalue.
 * @param {string} variable - The name of the query variable to retrieve.
 * @param {string} elsevalue - The value to return if the variable is not found.
 * @returns {string} - The value of the query variable, or elsevalue if not found.
 */
export function getQueryVariable(variable, elsevalue) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        let retsult = ""
        for (var j = 1; j < pair.length; j++) {
            retsult += "=" + pair[j]
        }
        retsult = retsult.substring(1)
        if (pair[0] == variable) { return retsult; }
    }
    return (elsevalue);
}
/**
 * format a date.
 * Replace the date information with %(xxx)s(see https://www.npmjs.com/package/sprintf-js#format-specification)
 * Effective information: year, month, day, hour, minute, second
 * @param {Date} date 
 * @param {String} base 
 * @returns {String}
 */
export function dateFormater(date, base) {
    let obj = {
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
        day: date.getDate().toString(),
        hour: date.getHours().toString(),
        minute: date.getMinutes().toString(),
        second: date.getSeconds().toString(),
    }
    return sprintf(base, obj)
}
/**
 * Returns a debounced ref that tracks changes to a value and triggers an update after a specified duration.
 * @param {*} value - The initial value.
 * @param {number} duration - The duration in milliseconds.
 * @returns {Ref} - The debounced ref.
 */
export function debounceRef(value, duration = 1000) {
    let timer;
    return customRef((track, trigger) => {
        return {

            get() {
                track()
                return value
            }, set(val) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    trigger()
                    value = val
                }, duration)
            }
        }
    })
}
/**
 * jump to a url
 * @param {String} url 
 */
export function jump(url) {
    window.location.href = url
}
function getStorageName(value)  {
    if (value ===localStorage){
        return "local"
    }if (value === sessionStorage){
        return "session"
    }
    return void 0
}
/**
 * Returns a reference to a value stored in a storage object, such as localStorage.
 * If the value does not exist, it returns the "elsevalue" parameter.
 * The value can be optionally parsed from a string using JSON.parse.
 * 
 * @param {String} key - The key used to store the value in the storage object.
 * @param {Function} by - The function used to create the reference.
 * @param {Storage} storage - The storage object where the value is stored.
 * @param {any} elsevalue - The value to return if the key does not exist in the storage object.
 * @param {boolean} stringify - Indicates whether the value should be parsed from a string.
 * @returns {Ref} - A reference to the value.
 */
export function getRefWithStorage(key , by = ref , storage = localStorage, elsevalue = null, stringify = false) {
    let getvalue = (value) => {
        if (!stringify) {
            return value
        }
        try {
            return JSON.parse(value)
        } catch {
            return value
        }
    }
    
    let val = by(getvalue(storage.getItem(key)) || elsevalue);
    window.addEventListener(`${getStorageName(storage)}StorageSetItemEvent`, (event) => {
        if (event.key === key) {
            val.value = getvalue(event.newValue);
        }
    })
    window.addEventListener("storage", (event) => {
        if (event.key === key && event.storageArea===storage) {
            val.value = getvalue(event.newValue);
        }
    })
    return val
}
/**
 * Download a file from the given data.
 * @param {Any} data - The data to be downloaded.
 * @param {String} name - The name of the file.
 * @param {String} [memi='text/plain'] - The MIME type of the file.
 */
export function downloadData(data,name,memi='text/plain') {
    const blob = new Blob([data], {
        type: memi
    })
    const objectURL = URL.createObjectURL(blob)
    const aTag = document.createElement('a')
    aTag.href = objectURL
    aTag.download = name
    aTag.click()
    aTag.remove()
    URL.revokeObjectURL(objectURL)
}