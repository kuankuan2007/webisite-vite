import { createApp } from "vue";
import infomations from "../components/dialogs/infomtions.vue";
import errors from "../components/dialogs/errors.vue";

/**
 * Displays a message in a dialog box and returns a promise that resolves when the dialog is closed.
 *
 * @param {string} message - The message to be displayed in the dialog box.
 * @param {function} [onclose=()=>{}] - An optional callback function to be called when the dialog is closed.
 * @return {Promise} A promise that resolves when the dialog is closed.
 */
export function showMessage(message,onclose=()=>{}){
    return new Promise((resolve,reject)=>{
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
            resolve()
        })
    })
}
/**
 * 展示错误
 * @param {String} message
 * @param {Function} onclose
 */
export function showError(message,onclose=()=>{}){
    return new Promise((resolve,reject)=>{
        let dialog=document.createElement("div");
        dialog.classList.add("infomations")
        document.body.appendChild(dialog);
        createApp(errors,{
            title:"错误",
            message:message,
            buttons:{
                "确认":"ok"
            },
            root:dialog,
            onclose:onclose
        }).mount(dialog)
        dialog.addEventListener("button",(event)=>{
            event.close()
            resolve()
        })
    })
}