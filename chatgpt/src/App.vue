<template>
  <myheader title="chatGPT问答" :need-rights="true" :toLogin="true" />
  <div class="main">
    <div class="history-box" ref="historyBox">
      <div class="history-list">
        <historyShower @recall="recall(data.id)" v-for="data in history" :data="data" :key="data.id"
          :right="data.user === username" />
      </div>
    </div>
    <div class="input-box">
      <markdownEditor :place-holder="'按下Ctrl+Enter以发送'" @enter="spicalEnter" :other-buttons="buttons" :content="content"
        :headerLevelStart="2" :max-editor-height="`40vh`" @update:content="content = $event" />
    </div>
  </div>
</template>
<script setup>
const sendButtonInner = `<span class="demo-icon" style="
    font-size: 15px;
    padding: 0;
    margin: 0;
">\uE818<span>`
const buttons = [
  {
    name: 'send',
    icon: sendButtonInner,
    tip: '发送',
    click: () => {
      checkSend()
    }
  },
]
import { computed, onMounted, ref, watchEffect } from "vue";
import myheader from "../../src/common/components/header.vue"
import historyShower from "./components/history.vue";
import markdownEditor from "../../src/common/components/markDownEditor.vue";
import { init, history, send } from "./ws"
import { debounceRef, getRefWithStorage, windowSize } from "../../src/common/script/normal"
onMounted(() => {
  init()
})
let historyBox = ref()

let username = getRefWithStorage("username", ref, sessionStorage, "", false)
let content = ref()

function spicalEnter(event) {
  if (event.ctrlKey) {
    setTimeout(checkSend,500)
  }
}
function checkSend() {
  content.refresh && content.refresh()
  if (send(content.value)) {
    content.value = ""
  }
}
function customButtomClick(event) {
  if (event === "send") {
    checkSend()
  }
}
</script>
<style scoped lang="scss">
:deep(html) {
  scroll-behavior: smooth;
}

.history-box {
  position: relative;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.history-list {
  display: flex;
  flex-direction: column;
  padding-top: 110px;
  position: relative;
}

.get-more {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 1.3em;
  border-radius: calc(20px * var(--theme-border-radius));
  cursor: pointer;
  background-color: transparent;
  border-color: black;
  transition: 0.3s;
  line-height: 26px;
  border-style: solid;

  &:hover {
    background-color: var(--theme-strong1);
    border-color: var(--theme-strong1);
    color: var(--font-color-b);
  }

  &.disabled {
    background-color: var(--theme-disabled-block);
    border-color: var(--theme-disabled-block);
    color: var(--theme-disabled-font);
    pointer-events: none;
  }
}

.to-bottom {
  position: absolute;
  top: -30px;
  right: 20px;
  background-color: var(--theme-strong1);
  line-height: 20px;
  font-size: 20px;
  color: var(--font-color-b);
  border-color: var(--theme-strong1);
  border-style: solid;
  border-radius: calc(15px * var(--theme-border-radius));
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  transition: 0.3s;

  &:hover {
    background-color: transparent;
    color: var(--theme-strong1);
  }

  &.to-botton-enter-from,
  &.to-botton-leave-to {
    opacity: 0;
    transform: translate(80px, 0);
  }
}

.input-box {
  position: relative;
  background-color: var(--theme-1-3);
  height: fit-content;
}

.main {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
</style>