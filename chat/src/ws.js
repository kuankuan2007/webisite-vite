import { reactive, ref } from "vue"
import {showMessage} from "../../src/common/script/infomations"
class Message extends reactive{
    constructor (id,user,statue,message,time){
        super({})
        this.id = id;
        this.user = user;
        this.statue = statue;
        this.message = message;
        this.time = time;
    }
}
export let history = reactive([])
export let hasMore = ref(2)
const simpleGetHistoryMaxLength=20
let chatConnect
let inited=false
let load=void 0;
export let bottomAdded=ref(0)
/**
 * Try getting more history.
 */
export function getMore(){
    if (hasMore.value===1){
        showMessage("没有更多啦")
    }
    hasMore.value=2
    chatConnect.send(JSON.stringify({
        check:localStorage.getItem("check"),
        type:"history",
        from:history.length,
        to:history.length+simpleGetHistoryMaxLength
    }))
}
/**
 * Try sending message
 * @param {String} message 
 */
export function send(message){
    if (/^\s*$/.test(message)){
        showMessage("消息为空哦")
        return
    }
    chatConnect.send(JSON.stringify({
        "check":localStorage.getItem("check"),
        "message": message,
        "type":"send"
    }))
}
function onmessage(e){
    let data= JSON.parse(e.data)
    if (data.type==="history"){
        if(data.data.length!=0){
            hasMore.value=0
        }else{
            hasMore.value=1
            return
        }
        for (let i=0;i<data.data.length;i++){
            history.unshift(new Message(data.data[i].id,data.data[i].user,data.data[i].statue,data.data[i].message,data.data[i].time))
        }
        if (history.length===data.data.length){
            load && setTimeout(load)
        }
    }
    if (data.type==="message"){
        history.push(new Message(data.id,data.user,data.statue,data.message,data.time))
        bottomAdded.value++
    }
    if (data.type==="recall"){
        for (let i=0;i<history.length;i++){
            if (history[i].id==data.id){
                history[i].statue=1
                history[i].message=data.user
                return
            }
        }
    }if (data.type==="ERROR"){
        location.reload()
    }
}
/**
 * @param {function} fn 
 */
export function onFinishFirstLoad(fn){
    load=fn
}
/**
 * init the connection
 */
export function init(){
    if (inited){
        return
    }
    chatConnect=new WebSocket("wss://kuankuan.site/chat/ws")
    chatConnect.onmessage=onmessage
    chatConnect.onopen=getMore
    inited=true
}