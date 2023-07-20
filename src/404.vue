<template>
    <myheader :title="'页面未找到'" />
    <div id="particles-js" class="background"></div>
    <div class="main">
        <h2>抱歉，您访问的页面不存在</h2>
        <p>请检查您的URL是否正确, <wbr> 您当前访问的地址是<i>{{ nowURL }}</i></p>
        <div class="show-more">
            <p>更多信息</p>
            <div>
                <p class="demo-icon flod-button" :class="{
                    unfold: !folded
                }" @click="folded = !folded">{{ iconMap.angleCircledRight }}</p>
            </div>
        </div>
        <div class="more-info-box" v-if="unexceped" :class="{
            unfold: !folded
        }">
            <div class="more-info">
                <p>我们无法找到您访问的页面，可能的原因可能有以下情况：</p>
                <ul>
                    <li>您访问的页面不存在。</li>
                    <li>您访问的页面已被删除。</li>
                    <li>您访问的页面已被禁用。</li>
                    <li>该页面未正式上线</li>
                </ul>
                <mybutton value="反馈此问题" @click="jump(
                    `/feedback/new/?title=${encodeURIComponent(`${nowURL}访问错误`)}&content=${encodeURIComponent(`我在尝试访问${nowURL}，但是却发现网站出现了404的响应码。`)}&recirculationStep=${encodeURIComponent(
                        `请求URL为[该地址](${nowURL})`
                    )}`
                )"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import myheader from "../src/common/components/header.vue"
import myinput from "../src/common/components/input/text.vue"
import mybutton from "../src/common/components/input/button.vue"
import iconMap from "../src/data/demo-icon"
import {jump} from "../src/common/script/normal"

import showBG from "./back"


onMounted(() => {
    showBG()
})
let nextURL = ref(location.href)
let folded = ref(true)
let unexceped = ref(true)
let specialURLMap = {
    "docsdata1": {
        from: /\/docs\/docsPage.html\?name=(.*)/,
        to: `\/docs\/docsPage\/\?name=%(1)s`
    }, "docsdata2": {
        from: /\/docs\/.*\/(.*)\/?/,
        to: `\/docs\/docsPage\/\?name=%(1)s`
    }
}
let nowURL = computed(() => location.href)
</script>
<style scoped lang="scss">
.main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &>.show-more {
        display: flex;
        width: fit-content;
        margin-left: 10%;
        justify-content: center;

        & p {
            margin: 0;
        }

        &>div {
            position: relative;
        }

        & .flod-button {
            font-size: 1.3em;
            position: absolute;
            top: 50%;
            left: 20px;
            transform-origin: 50% 0;
            transform: translate(0, -50%);
            cursor: pointer;
            transition: 0.3s;

            &.unfold {
                transform: rotate(90deg) translate(0, -50%);
                font-size: 1.5em;
            }

            &:hover {
                color: var(--theme-strong1);
            }
        }
    }
}

.more-info-box {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.3s;
    text-align: left;
    &.unfold {
        grid-template-rows: 1fr;
    }
    & .more-info {
      overflow: hidden;  
    }
    & ul{
        text-align: left;
    }
}</style>