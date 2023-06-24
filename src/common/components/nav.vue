<template>
    <div :class="{nav:true,fold:isFold,unfold:!isFold}" ref="nav" v-show="finished" :style="{width:nowList.width+'px'}">
        <p class="title">{{ nowList.title }}</p>
        <p class="fold-button demo-icon" @click="back">&#xf137;</p>
        <p class="unfold-button demo-icon" @click="unfoldNav">&#xf0c9;</p>
        <ul class="list">
            <li v-for="i in nowList.nav" @click="jump(i)">
                <p class="demo-icon icon">{{ i.icon }}</p>
                <p class="word">{{ i.word }}</p>
                <p class="demo-icon full-button" v-if="'subNav' in i" @click="next(i.subNav,$event)">&#xf138;</p>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { sprintf } from "sprintf"
import { reactive,ref } from "vue"
let isFold=ref(true)
let finished=ref(false)
let data = reactive({})
let nowList = ref({})
async function buildNavTree(nav) {
    if ("data" in nav) {
        nav.nav = []
        if ("url" in nav.data) {
            nav.data.value = await (await fetch(new URL(nav.data.url, import.meta.url))).json()
        }
        for (let i of nav.data.obj) {
            nav.data.value = nav.data.value[i]
        }
        for (let i of nav.data.value) {
            let now = {}
            for (let j in nav.struct) {
                now[j] = sprintf(nav.struct[j], i)
            }
            nav.nav.push(now)
        }
    }
    for (let i of nav.nav) {
        if ("subNav" in i) {
            i.subNav.parent = nav
            await buildNavTree(i.subNav)
        }
    }
}
function unfoldNav(){
    isFold.value = false
}
function back(){
    if (! nowList.value.parent){
        isFold.value=true
    }else{
        nowList.value=nowList.value.parent
    }
}
function next(subNav,e){
    nowList.value=subNav
    e.stopPropagation()
}
function jump(data){
    location.href=data.href
}
import rootNav from "../../data/nav";
buildNavTree(rootNav).then(
    ()=>{
        data = reactive(rootNav)
        nowList.value=data
        finished.value=true
    }
)
</script>
<style scoped>
.title{
    font-size: 36px;
    margin: 0;
    font-weight: 600;
    padding-left: 20px;
    word-break: keep-all;
    transition: 0.3s;
    cursor: default;
}
.nav.unfold .list,.nav.unfold .title{
    opacity: 1;
}
.nav.fold .list,.nav.fold .title{
    opacity: 0;
    pointer-events: none;
}
.list{
    list-style: none;
    transition: 0.3s;
    padding: 0;
    margin-left: 40px;
    margin-right: 30px;
    font-size: 24px;
}
.list li{
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    margin-bottom: 20px;
}
.nav{
    position: fixed;
    left: 0;
    top: 60px;
    background-color: var(--theme-1-3);
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
    height: calc(100vh - 60px);
    transition: 0.3s;
    overflow-y: visible;
}
.nav.fold{
    width: 0 !important;
}
.fold-button,.unfold-button{
    position: fixed;
    font-size: 36px;
    margin: 0;
    cursor: pointer;
    color: var(--theme-1-b);
    transition: 0.3s;
    font-weight: 500;
}
.nav.fold .fold-button,.nav.fold .unfold-button{
    top: -50px;
    left: 16px;
}
.nav.unfold .fold-button,.nav.unfold .unfold-button{
    top: 10px;
    left: calc(100% - 50px);
}
.unfold-button:hover,.fold-button:hover{
    transform: scale(1.2);
    color: var(--theme-2-b);
}
.nav.fold .fold-button{
    opacity: 0;
    pointer-events: none;
}
.nav.unfold .unfold-button{
    opacity: 0;
    pointer-events: none;
}
.icon{
    text-align: left;
    margin: 0;
    transition: 0.3s;
    cursor: pointer;
}
.word{
    text-align: center;
    margin: 0;
    transition: 0.3s;
    cursor: pointer;
}
.full-button{
    text-align: right;
    margin: 0;
    transition: 0.3s;
    cursor: pointer;
}
.full-button:hover,.icon:hover,.word:hover{
    color: var(--theme-1-b);
    transform: scale(1.2);
}
</style>