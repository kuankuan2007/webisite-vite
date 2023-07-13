<template>
  <myheader title="聊天室" :toLogin="true" />
  <div class="main">
    <div class="history-box">
      <div class="history-list">
        <button class="get-more" :class="{
          disabled: hasMore != 0
        }" @click="getMore">
          <span> {{ getMoreWords }} </span>
        </button>
        <historyShower v-for="data in history" :data="data" :key="data.id" />
      </div>
    </div>
    <div class="input-box">
      <markdownEditor :other-buttons="[
        {
          event:'send',
          inner: sendButtonInner
        }
      ]" :headerLevelStart="2" :content="content" @update:content="content=$event.target.value" @customButtomClick="customButtomClick"/>
    </div>
  </div>
</template>
<script setup>
const sendButtonInner=`发送<span class="demo-icon">\uE818<span>`
import { computed, onMounted ,ref } from "vue";
import myheader from "../../src/common/components/header.vue"
import historyShower from "./components/history.vue";
import markdownEditor from "../../src/common/components/markDownEditor.vue";
import { init, history, hasMore, getMore, bottomAdded,send } from "./ws"
import { debounceRef } from "../../src/common/script/normal"
onMounted(() => {
  init()
})
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
function customButtomClick(event) {
  if (event==="send"){
    send(content.value)
    content.value = ""
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
  bottom: 10px;
}
.input-box{
  background-color: var(--theme-1-3);
}
.main{
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
}
</style>