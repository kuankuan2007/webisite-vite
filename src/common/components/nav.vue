<template>
    <div :class="{ nav: true, fold: nowList.length === 0, unfold: nowList.length > 0 }" ref="nav" v-show="finished">
        <div class="button-box">
            <p class="fold-button demo-icon" @click="back">&#xf137;</p>
            <p class="unfold-button demo-icon" @click="unfoldNav">&#xf0c9;</p>
        </div>
        <transition-group duration="1000" @enter="onNavEnter" @leave="onNavLeave">
            <div class="nav-list" :class="{
                inactive: index < nowList.length - 1,
                active: index === nowList.length - 1
            }" :style="{
                '--width': nowData.width + 'px'
            }" v-for="nowData, index in nowList" :key="nowData">
                <p class="title">
                    {{ nowData.title }}
                </p>
                <ul class="list">
                    <li :style="{ '--index': index }" v-for="i, index in nowData.nav" @click="jump(i)" class="nums">
                        <p class="demo-icon icon">{{ i.icon }}</p>
                        <p class="word">{{ i.word }}</p>
                        <p class="demo-icon full-button" v-if="'subNav' in i" @click="next(i.subNav, $event)">&#xf138;</p>
                    </li>
                </ul>
            </div>
        </transition-group>
    </div>
</template>
<script setup>
import { sprintf } from "sprintf"
import { reactive, ref } from "vue"
let isFold = ref(true)
let finished = ref(false)
let data = reactive({})
let nowList = ref([])
function onNavEnter(el) {
    setTimeout(()=>{el.classList.add('in')})
}
/**
 * 
 * @param {Element} el 
 */
function onNavLeave(el) {
    let children=el.parentElement.children
    for( let i=children.length ;i>=0;i-- ){
        if (children[i]===el){
            children[i-1]&&children[i-1].classList.add("in")
        }
    }
    el.classList.remove('in')
}
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
function unfoldNav() {
    next(data,)
}
function back() {
    if (nowList.value.length > 0) {
        nowList.value.pop()
    }
}
function next(subNav, e) {
    nowList.value.push(subNav)
    e && e.stopPropagation()
}
function jump(data) {
    location.href = data.href
}
import rootNav from "../../data/nav";
buildNavTree(rootNav).then(
    () => {
        data = reactive(rootNav)
        finished.value = true
    }
)
</script>
<style scoped lang="scss">
.title {
    font-size: 30px;
    margin: 0;
    font-weight: 600;
    padding-left: 60px;
    word-break: keep-all;
    word-wrap: none;
    transition: 0.3s;
    cursor: default;
    line-height: 60px;
    position: absolute;
}

.button-box {
    z-index: 999;
    position: absolute;
    font-size: 36px;
    top: 0;
    left: 10px;
    transition: 0.3s;

    &:hover {
        color: var(--theme-strong1);
    }

    &>* {
        top: 0;
        position: absolute;
        margin: 0;
        margin-top: 10px;
        transition: 0.3s;
        cursor: pointer;
        user-select: none;

        .nav.fold &.fold-button {
            pointer-events: none;
            opacity: 0;
            transform: rotate(-90deg);
        }

        .nav.unfold &.unfold-button {
            opacity: 0;
            pointer-events: none;
            transform: rotate(-90deg);

        }
    }
}

.list .nums,
.title {
    .nav-list & {
        opacity: 0;
        transform: translate(-100%, 0);
    }
    .nav-list.in & {
        opacity: 1;
        transform: translate(0, 0);
    }
    .nav-list.inactive & {
        opacity: 0;
        transform: translate(100%, 0);
    }
}
.nav-list .list{
    scrollbar-width: none;
    &::-webkit-scrollbar{
        width: 0;
    }
}
.nav-list .list{
    opacity: 1;
}
.nav-list.inactive .list{
    opacity: 0;
}

.nav-list.inactive .list {
    pointer-events: none;
}

.nav-list .list {
    pointer-events: all;
}

.list {
    list-style: none;
    transition: 0.3s;
    padding: 0;
    font-size: 24px;
    margin: 0;
    top: 60px;
    position: absolute;
    height: calc(100%);
    overflow-y: scroll;
}

.list li {
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 30px;
    transition: 0.3s;
    transition-delay: calc(0.04s * var(--index));
    width: var(--width);
}

.nav {
    position: fixed;
    display: block;
    left: 0;
    height: calc(100vh - 60px);
    transition: 0.3s;
}

.icon {
    text-align: left;
    margin: 0;
    transition: 0.3s;
    cursor: pointer;
}

.word {
    text-align: center;
    margin: 0;
    transition: 0.3s;
    cursor: pointer;
}

.full-button {
    text-align: right;
    margin: 0;
    transition: 0.3s;
    cursor: pointer;
}

.full-button:hover {
    color: var(--theme-3-b);
}

.nums {
    background: var(--theme-1-3);
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));

    &:hover {

        &>.word,
        &>.icon {
            color: var(--theme-1-b);
        }
    }
}
</style>