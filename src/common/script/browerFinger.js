/** 
 * This file is used to collect browser fingerprints. Before collecting, it will prompt the user for permission.
 *
 * @author [kuankuan]
 */
import {askAgreeReject} from "./infomations"
import fp from "@fingerprintjs/fingerprintjs"
import {sendFinger} from "./connection"


/**
 * Refreshes the browser fingerprint.
 *
 * @param {string} finger - The browser fingerprint to refresh.
 * @return {Promise<void>} A promise that resolves when the browser fingerprint has been refreshed.
 */
async function refreshFinger(finger){
    if (!localStorage.getItem("sendFinger")){
        localStorage.setItem("browerFinger",finger)
        if (await askAgreeReject("我们想要收集你的浏览器信息（浏览器指纹），我们承诺收集的信息不会对外传播","收集浏览器信息？")){
            localStorage.setItem("sendFinger","true")
        }else{
            localStorage.setItem("sendFinger","false")
        }
    }if(localStorage.getItem("sendFinger")==="true"){
        sendFinger(finger)
    }
}
fp.load().then((fploaded)=>{
    fploaded.get().then((result)=>{
        const finger=result.visitorId
        console.log(finger);
        
        if (localStorage.getItem("browerFinger")!==finger){
            localStorage.setItem("browerFinger",finger)
            refreshFinger(finger)
        }
    })
})
