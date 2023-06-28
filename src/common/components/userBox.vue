<template>
    <div v-show="finished" id="user">
        <p class="login" v-if="username === ''" @click="login">登录</p>
        <p class="user" v-else @click="userPage">{{ username }}</p>
    </div>
</template>
<script setup>
import { getUserName } from "../script/connection.js";
import {ref} from "vue"
let props = defineProps({
    jump:{
        type:String,
        required:false,
        default:""
    },toLogin:{
        type:Boolean,
        required:false,
        default:false
    }
})
let username = ref("")
let finished = ref(false)
getUserName().then((retsult)=>{
    console.log(retsult,props.toLogin)
    if (retsult && props.jump){
        location.href = props.jump
    }
    if (props.toLogin && !retsult){
        location.href = `/login/?from=${encodeURI(location.href)}`
    }
    username.value=retsult
    finished.value = true
},(reason)=>{
    console.log(reason)
    let retsult = ""
    if (retsult && props.jump){
        location.href = props.jump
    }
    if (props.toLogin && !retsult){
        location.href = `/login/?from=${encodeURI(location.href)}`
    }
})
function login() {
    location.href = `/login/?from=${new URL(location.href).pathname}`
}
function userPage(){
    location.href = `/user/`
}
</script>
<style scoped>
@keyframes linkGroupChane{
    0%{
        transform: translate(-50%,-50%) scale(0.8);
        filter: blur(10px);
        opacity: 0;
    }50%{
        transform: translate(-50%,-50%) scale(0.8);
        filter: blur(10px);
        opacity: 0;
    }
    100%{
        transform: translate(0,-50%) scale(1);
        filter: blur(0px);
        opacity: 1;
    }
}
p.login,p.user {
    animation: linkGroupChane 1s;
    font-size: 16px;
    margin: 0;
    padding: 6px;
    border-radius: calc(10px*var(--theme-border-radius));
    padding-left: 10px;
    padding-right: 10px;
    display: block;
    text-decoration-line: none;
    transition: 0.3s;
    color: var(--font-color);
    position: absolute;
    cursor: pointer;
    right: 5px;
    top: 50%;
    transform: translate(0,-50%);
}

p:hover{
    transform: scale(1.05) translate(0,-50%);
}

p.user{
    background: var(--theme-2-5);
}
p.login{
    background: var(--theme-3-5);

}
</style>