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
import { FilterXSS, whiteList } from "xss"
import { computed, ref, onMounted } from "vue";
import hljs from 'highlight.js';
import MathJax from '../script/mathjax.min';
import { debounce , copyText } from "../script/normal"
import {showMessage} from "../script/infomations"
import { mathjax } from "mathjax-full/js/mathjax";
console.log(MathJax,MathJax.typeset)
let myxss = new FilterXSS({
    whiteList: {
        "a": [
            "target",
            "href",
            "title"
        ],
        "abbr": [
            "title"
        ],
        "address": [],
        "area": [
            "shape",
            "coords",
            "href",
            "alt"
        ],
        "article": [],
        "aside": [],
        "audio": [
            "autoplay",
            "controls",
            "crossorigin",
            "loop",
            "muted",
            "preload",
            "src"
        ],
        "b": [],
        "bdi": [
            "dir"
        ],
        "bdo": [
            "dir"
        ],
        "big": [],
        "blockquote": [
            "cite"
        ],
        "br": [],
        "caption": [],
        "center": [],
        "cite": [],
        "code": ["class"],
        "col": [
            "align",
            "valign",
            "span",
            "width"
        ],
        "colgroup": [
            "align",
            "valign",
            "span",
            "width"
        ],
        "dd": [],
        "del": [
            "datetime"
        ],
        "details": [
            "open"
        ],
        "div": [],
        "dl": [],
        "dt": [],
        "em": [],
        "figcaption": [],
        "figure": [],
        "font": [
            "color",
            "size",
            "face"
        ],
        "footer": [],
        "h1": [],
        "h2": [],
        "h3": [],
        "h4": [],
        "h5": [],
        "h6": [],
        "header": [],
        "hr": [],
        "i": [],
        "img": [
            "src",
            "alt",
            "title",
            "width",
            "height"
        ],
        "ins": [
            "datetime"
        ],
        "li": [],
        "mark": [],
        "nav": [],
        "ol": [],
        "p": [],
        "pre": [],
        "s": [],
        "section": [],
        "small": [],
        "span": [],
        "sub": [],
        "summary": [],
        "sup": [],
        "strong": [],
        "strike": [],
        "table": [
            "width",
            "border",
            "align",
            "valign"
        ],
        "tbody": [
            "align",
            "valign"
        ],
        "td": [
            "width",
            "rowspan",
            "colspan",
            "align",
            "valign"
        ],
        "tfoot": [
            "align",
            "valign"
        ],
        "th": [
            "width",
            "rowspan",
            "colspan",
            "align",
            "valign"
        ],
        "thead": [
            "align",
            "valign"
        ],
        "tr": [
            "rowspan",
            "align",
            "valign"
        ],
        "tt": [],
        "u": [],
        "ul": [],
        "video": [
            "autoplay",
            "controls",
            "crossorigin",
            "loop",
            "muted",
            "playsinline",
            "poster",
            "preload",
            "src",
            "height",
            "width"
        ]
    }
});
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
let show = computed(() => {
    let html = converter.makeHtml(props.content)
    html = myxss.process(html)
    let tempEle = document.createElement("div")
    tempEle.innerHTML = html
    let codeBlocks = tempEle.querySelectorAll("code")
    for (let i = 0; i < codeBlocks.length; i++) {
        hljs.highlightElement(codeBlocks[i])
    }
    let codeBlocksPre = tempEle.querySelectorAll("pre:has(code.hljs)")
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
    setTimeout(() => {
        MathJax.typeset && MathJax.typeset()
    })
    return html
})

defineExpose({
    showBox: shower
})
</script>
<style lang="css">
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
}</style>