let timer = []
let cont=0
let all=0
/**
 * @template _T
 * @param {_T} item 
 * @returns {_T}
 */
function copyItem(item) {
    return JSON.parse(JSON.stringify(item))
}
/**
 * 
 * @param {number} now 
 * @param {number[]} rest 
 * @param {number} choiceStart
 * @param {string[]} history
 */
class ArrayLike {
    /**
     * 
     * @param {Any[]} data 
     */
    constructor(data) {
        for (let i = 0; i < data.length; i++) {
            this[i] = data[i]
        }
        this.length = data.length
    }
    /**
     * 
     * @returns {Any[]}
     */
    toArray() {
        let array = new Array(this.length)
        for (let i = 0; i < this.length; i++) {
            array[i] = this[i]
        }
        return array
    }
} /**
* 
* @returns {Any[]}
*/
function toArray(data) {
    let array = new Array(data.length)
    for (let i = 0; i < data.length; i++) {
        array[i] = data[i]
    }
    return array
}
function dfs(now, rest, choiceStart, history) {
    // console.log(now, rest, choiceStart, history)
    if (rest.length <= 0) {
        if (now === 24) {
            postMessage({type:"ans",data:new ArrayLike(history)})
        }
        cont++
        if (cont>=all){
            postMessage({type:"finish",data:{}})
        }
        return
    }
    for (let i = choiceStart; i < rest.length; i++) {
        // +
        let nowdata = copyItem(rest)
        nowdata.splice(i,1)
        let nowHistory = copyItem(history)
        let nowAns = now+rest[i]
        nowHistory.push(`${now}+${rest[i]}=${nowAns}`)

        timer.push(setTimeout(dfs, 0, nowAns, nowdata, i, nowHistory))
        // -
        
        nowHistory = copyItem(history)
        nowAns = now-rest[i]
        nowHistory.push(`${now}-${rest[i]}=${nowAns}`)

        timer.push(setTimeout(dfs, 0, nowAns, nowdata, i, nowHistory))
        // *
        
        nowHistory = copyItem(history)
        nowAns = now*rest[i]
        nowHistory.push(`${now}*${rest[i]}=${nowAns}`)

        timer.push(setTimeout(dfs, 0, nowAns, nowdata, i, nowHistory))
        // /
        
        nowHistory = copyItem(history)
        nowAns = now/rest[i]
        nowHistory.push(`${now}/${rest[i]}=${nowAns}`)

        timer.push(setTimeout(dfs, 0, nowAns, nowdata, i, nowHistory))
        // \
        
        nowHistory = copyItem(history)
        nowAns = rest[i]/now
        nowHistory.push(`${rest[i]}/${now}=${nowAns}`)

        timer.push(setTimeout(dfs, 0, nowAns, nowdata, i, nowHistory))
    }
}
/**
 * 
 * @param {MessageEvent} event
 * @param {"start"|"stop"} event.data.type
 * @param {number[]} data
 */
onmessage = function (event) {
    let {type,data} = event.data
    if (type == "stop") {
        for (let i of timer) {
            clearTimeout(i)
        }
        timer.slice(0, timer.length)
        postMessage({type:"stop",data:{}})
    }
    if (type == "start") {
        data=toArray(data)
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let nowdata = copyItem(data)
            nowdata.splice(i, 1)
            timer.push(setTimeout(dfs, 0, data[i], nowdata, i, []))
        }cont=0
        all=5**(data.length-1)
    }
}