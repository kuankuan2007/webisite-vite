<template>
    <div v-html="show" ref="shower" class="shower"></div>
</template>
<script setup>
let props = defineProps({
    headerLevelStart: {
        type: Number,
        default: 1,
        required: false
    }, content: {
        type: String,
        default: "",
        required: true
    }
})
import showdown from "showdown"
import { computed, ref, onMounted } from "vue";
import hljs from 'highlight.js';
import { copyText } from "../script/normal"
import { showMessage } from "../script/infomations"
import myxss from "../script/deXss"
import showdownKatex from "showdown-katex";

onMounted(() => {
    shower.value.addEventListener("click", copyCode)
})
let converter = new showdown.Converter({
    parseImgDimensions: true,
    headerLevelStart: props.headerLevelStart,
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
    extensions: [
        showdownKatex({
            displayMode: true,
            throwOnError: false, // allows katex to fail silently
            errorColor: '#ff0000',
            output:"html",
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
        })
    ]
})
let shower = ref(null)
/**
 * 
 * @param {MouseEvent} event 
 */
function copyCode(event) {
    if ("code" in event.target.dataset) {
        copyText(event.target.dataset.code)
        showMessage("复制成功")
    }
}
function makeHtml(markdown) {
    let html = converter.makeHtml(props.content)
    html = myxss.process(html)
    return html
}
let show = computed(() => {
    let html = makeHtml(props.content)
    let tempEle = document.createElement("div")
    tempEle.innerHTML = html
    let codeBlocks = new Array(...tempEle.querySelectorAll("code"))
    for (let i = 0; i < codeBlocks.length; i++) {
        hljs.highlightElement(codeBlocks[i])
    }
    let codeBlocksPre = new Array(...tempEle.querySelectorAll("pre:has(code.hljs)"))
    for (let i = 0; i < codeBlocksPre.length; i++) {
        let ele = codeBlocksPre[i]
        let code = ele.querySelector("code.hljs")
        for (let j = 0; j < code.classList.length; j++) {
            if (code.classList[j].startsWith('language-')) {
                code.style.setProperty("--language", `"${code.classList[j].slice(9)}"`)
            }
        }
        let copy = document.createElement("p")
        copy.innerText = "\uf249"
        copy.classList.add("copy-button")
        copy.classList.add("demo-icon")
        copy.dataset.code = code.innerText
        ele.appendChild(copy)
    }
    html = tempEle.innerHTML
    return html
})

defineExpose({
    showBox: shower,
    makeHtml
})
</script>
<style lang="scss">
@import url("../../../node_modules/katex/dist/katex.min.css");
code {
    border-radius: calc(var(--theme-border-radius) * 10px);
    transition: 0.3s;
    font-family: system-ui;
    font-weight: lighter;
    font-size: 0.8em;
    cursor: text;
}

code * {
    transition: 0.3s;
}

pre>code.hljs {
    position: relative;
    padding-top: 20px !important;
}

pre>code::before {
    content: var(--language);
    position: absolute;
    top: 3px;
    left: 4px;
    font-size: 0.3em;
    pointer-events: none;
    color: var(--theme-disabled-font);
    font-weight: normal;
    background-color: var(--theme-2-3);
    transition: 0.3s;
    padding-left: 5px;
    padding-right: 5px;
    height: 16px;
    line-height: 16px;
    border-radius: calc(8px * var(--theme-border-radius));
}

pre {
    position: relative;
}

.copy-button {
    position: absolute;
    top: 3px;
    right: 3px;
    padding: 2px;
    width: 14px;
    line-height: 14px;
    height: 14px;
    margin: 0;
    font-size: 0.6em;
    border-width: 1px;
    border-style: groove;
    border-color: transparent;
    cursor: pointer;
    transition: 0.3s;
    border-radius: calc(10px * var(--theme-border-radius));
}

.copy-button:hover {
    color: var(--theme-strong1);
    border-color: var(--theme-strong1);
    background: var(--theme-1-2);
}
</style>