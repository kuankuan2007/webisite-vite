<template>
  <myheader title="聊天室" :need-rights="true" :toLogin="true" />
  <div class="main">
    <div class="history-box" ref="historyBox">
      <div class="history-list">
        <button class="get-more" :class="{
          disabled: hasMore != 0
        }" @click="getMore">
          <span> {{ getMoreWords }} </span>
        </button>
        <historyShower @recall="recall(data.id)" v-for="data in history" :data="data" :key="data.id"
          :right="data.user === username" />
      </div>
    </div>
    <div class="input-box">
      <Transition name="to-botton">
        <button @click="toButton" class="to-bottom" v-show="bottomAdded > 0">
          <span> {{ bottomAdded }} <span class="demo-icon">&#xF13A;</span> </span>
        </button>
      </Transition>
      <markdownEditor :place-holder="'按下Ctrl+Enter以发送'" @spicalEnter="spicalEnter" :other-buttons="[
        {
          event: 'send',
          inner: sendButtonInner
        }
      ]" :headerLevelStart="2" :max-editor-height="maxEditorHeight" :content="content"
        @update:content="content = $event.target.value" @customButtomClick="customButtomClick" />
    </div>
  </div>
</template>
<script setup>
const sendButtonInner = `发送<span class="demo-icon">\uE818<span>`
import { computed, onMounted, ref, watchEffect } from "vue";
import myheader from "../../src/common/components/header.vue"
import historyShower from "./components/history.vue";
import markdownEditor from "../../src/common/components/markDownEditor.vue";
import { recall, onFinishFirstLoad, init, history, hasMore, getMore, bottomAdded, send } from "./ws"
import { debounceRef, getRefWithStorage, windowSize } from "../../src/common/script/normal"
onMounted(() => {
  init()
  watchEffect(() => {
    bottomAdded.value
    if (historyBox.value.scrollHeight - historyBox.value.clientHeight - historyBox.value.scrollTop < 300) {
      setTimeout(toButton, 0)
    }
  })
})
let maxEditorHeight = computed(() => {
  return windowSize.height / 4
})
let historyBox = ref()
onFinishFirstLoad(() => {
  console.log(historyBox.value)
  historyBox.value.scrollTop = historyBox.value.scrollHeight
})
function toButton() {
  historyBox.value.scrollTop = historyBox.value.scrollHeight
  bottomAdded.value = 0
}

let username = getRefWithStorage("username", ref, sessionStorage, "", false)
let content = ref("")
let getMoreWords = computed(() => {
  if (hasMore.value === 0) {
    return "加载更多"
  } if (hasMore.value === 1) {
    return "没有更多啦"
  } if (hasMore.value === 2) {
    return "加载中"
  } return "出错啦"
})
function spicalEnter(event) {
  if (event.ctrlKey) {
    checkSend()
  }
}
function checkSend() {
  content.refresh && content.refresh()
  if(send(content.value)){
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
  border-color: var(--font-color);
  transition: 0.3s;
  line-height: 26px;
  border-style: solid;
  color: var(--font-color);
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
}</style>