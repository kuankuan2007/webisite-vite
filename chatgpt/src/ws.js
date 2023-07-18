import { reactive, ref } from "vue"
import { getRefWithStorage } from "../../src/common/script/normal"
import { showError, showMessage } from "../../src/common/script/infomations"

let username = getRefWithStorage("username", ref, sessionStorage, "", false)
class ChatgptMessage {
    constructor(user, message, statue = 0, error = undefined) {
        this.message = message
        this.user = user
        this.statue = statue
        this.error = error
    }
    add(text) {
        this.message += text
    }
}
export let history = reactive([
    new ChatgptMessage(
        "Sysyem",
        "Welcome to chatgpt!",
        1,
    )
])
function onmessage(e) {
    let data = JSON.parse(e.data)
    if (data.type === undefined) {
        history[history.length - 1].add(data.text)
    }
    else if (data.type === "END") {
        history[history.length - 1].statue = 1
    }
    else if (data.type === "ERROR") {
        history[history.length - 1].statue = -1
        showError(`ERROR: ${data.content}`)
        history[history.length - 1].error = data.content
    }
}
export function send(value) {
    if (/^\s*$/.test(value)) {
        showMessage("消息为空哦")
        return false
    }if (history[history.length - 1].statue === 0) {
        showError("上次响应还未结束，请耐心等待")
        return false
    }
    history.push(new ChatgptMessage(
        username.value,
        value,
        1
    ))
    history.push(new ChatgptMessage(
        'chatGPT',
        "",
    ))
    gptConnect.send(JSON.stringify({
        check: localStorage.getItem("check"),
        question: value
    }))
    return true
}
let gptConnect
export function init() {
    gptConnect = new WebSocket("wss://kuankuan.site/chatgpt")
    gptConnect.onmessage = onmessage
}


