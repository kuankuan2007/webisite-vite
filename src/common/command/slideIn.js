import { setDefaultsValue } from "../script/normal"
const upAnimationMap = new WeakMap();
const downAnimationMap = new WeakMap();
const configsMap = new WeakMap();
const dataMap = new WeakMap();
const ob = new IntersectionObserver(li => {
    console.log(li)
    for (let i = 0; i < li.length; i++) {
        let upAnimation = upAnimationMap.get(li[i].target)
        let downAnimation = downAnimationMap.get(li[i].target)
        let data = dataMap.get(li[i].target)
        const lastPosition = data.position
        const position = getPosition(li[i].target)
        data.position = position
        if (li[i].isIntersecting) {
            // upAnimation.play()
        }
        if (li[i].target.id === "contactInformationPage") {
            console.log(li[i].target, li[i].isIntersecting, lastPosition, position)
        }
    }
})
const defaultValue = {
    up: {
        keyFrames: [{
            transform: "translate(0,150px)",
            opacity: 0
        }, {
            transform: "translate(0,0)",
            opacity: 1
        }],
        duration: 500,
        singleTime: false
    }, down: {
        keyFrames: [{
            transform: "translate(0,-150px)",
            opacity: 0.5
        }, {
            transform: "translate(0,0)",
            opacity: 1
        }],
        duration: 500,
        singleTime: false
    }
}
/**
 * 
 * @param {HTMLElement} el 
 * @returns {"above"|"in"|"below"}
 */
function getPosition(el) {
    const rect = el.getBoundingClientRect()
    const parentRect=el.parentElement.getBoundingClientRect()
    if (el.id === "contactInformationPage") {
        console.log(el,rect, parentRect)
    }
    if (rect.top > parentRect.bottom) {
        return "below"
    } else if (rect.bottom<=parentRect.top) {
        return "above"
    } else {
        return "in"
    }
}
export default {
    /**
     * 
     * @param {HTMLElement} el 
     * @param {Object} binding 
     * @param {String} binding.args
     * @param {Object} binding.modifiers
     * @param {Object} binding.value
     */
    mounted(el, binding, vnode, prevVnode) {
        console.log(el);
        let value = binding.value
        if (typeof value !== "object") {
            value = {}
        }
        setDefaultsValue(value, defaultValue)
        configsMap.set(el, value)
        dataMap.set(el, {
            position: getPosition(el)
        })
        const animationsUp = el.animate(value.up.keyFrames, {
            duration: value.up.duration,
            easing: "ease"
        })
        animationsUp.pause()
        upAnimationMap.set(el, animationsUp)
        ob.observe(el)
    },
    unmounted(el) {
        ob.unobserve(el)
        upAnimationMap.delete(el)
    },
    updated(el) {
        dataMap.get(el).position = getPosition(el)
    }
}