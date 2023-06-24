import { createApp } from "vue";
import infomations from "../components/infomtions.vue";
/**
 * 展示消息
 * @param {String} message
 * @param {Function} onclose
 */
export function showMessage(message,onclose=()=>{}){
    let dialog=document.createElement("div");
    dialog.classList.add("infomations")
    document.body.appendChild(dialog);
    createApp(infomations,{
        title:"提示",
        message:message,
        buttons:{
            "确认":"ok"
        },
        root:dialog,
        onclose:onclose
    }).mount(dialog)
    dialog.addEventListener("button",(event)=>{
        event.close()
    })
}