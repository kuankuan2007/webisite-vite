<template>
  <myheader title="宽宽2007·反馈" :need-rights="true"></myheader>
  <div class="main" v-if="finished">
    <h1 class="title">{{ data.title }}
    </h1>
    <ul v-if="userRight.includes('admin')" class="anmin-botton">
      <li class="demo-icon" @click="adminDelete">&#xE811;</li>
      <li class="demo-icon" @click="adminSave">&#xE810;</li>
    </ul>
    <span v-if="userRight.includes('admin')" :class="['statue', data.statue]">{{ data.statue }}</span>
    <myselecter v-else :values="[
      'Waiting', 'A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'Finish'
    ]" :choice="data.statue" @update:choice="data.statue = $event" :class="['statue', data.statue]" />
    <p class="info">{{ data.time }} · {{ data.user }}</p>
    <h2>内容</h2>
    <markdownShower ref="contentInput" :content="data.content" :headerLevelStart="3" />
    <h2>复现步骤</h2>
    <markdownShower v-if="data.recirculationStep != ''" :content="data.recirculationStep" :headerLevelStart="3" />
    <p v-else class="disabled">作者没有提供复现步骤</p>
    <h2>管理员回复</h2>
    <div v-if="userRight.includes('admin')">
      <markdownShower v-if="data.reply != ''" :content="data.reply" :headerLevelStart="3" />
      <p v-else class="disabled">管理员还未进行回复</p>
    </div>
    <markdownEditor @update:content="data.reply = $event.target.value" v-else :content="data.reply" :headerLevelStart="3" />
  </div>
</template>
<script setup>
import myheader from "../../../src/common/components/header.vue"
import markdownShower from "../../../src/common/components/markdownShower.vue";
import markdownEditor from "../../../src/common/components/markDownEditor.vue";
import { ref } from "vue"
import myselecter from "../../../src/common/components/input/selecter.vue"
import { getFeadbackData, saveFeedback ,delFeedback } from "../../../src/common/script/connection"
import { showMessage } from "../../../src/common/script/infomations";
import { getQueryVariable, getRefWithStorage  } from "../../../src/common/script/normal"

let userRight = getRefWithStorage("userrights", ref, sessionStorage, "", true)
let data = ref(null)
let finished = ref(false)
let id = ref(parseInt(getQueryVariable("id", "-1"), 10))
if (id.value === -1) {
  showMessage("获取数据失败", () => {
    location.href = "/feedback/"
  })
}
getFeadbackData(id.value).then((result) => {
  data.value = result
  finished.value = true
}, (error) => {
  showMessage("获取数据失败", () => {
    location.href = "/feedback/"
  })
})
function adminSave(){
  saveFeedback(data.value.statue,data.value.reply)
}
function adminDelete(){
  delFeedback()
}
</script>
<style scoped lang="scss">
.markdownEditor {
  margin-left: 20px;
}

.main {
  position: absolute;
  top: 100px;
  width: 80%;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 20px;
  border-radius: calc(20px * var(--theme-border-radius));
}

.main .info {
  font-size: 0.8em;
  margin: 0;
  padding: 0;
  padding-left: 5px;
}

h2 {
  position: relative;
  width: fit-content;
  cursor: default;
  padding-left: 20px;
}

.disabled {
  color: var(--theme-disabled-font);
  pointer-events: none;
  user-select: none;
}

.main>p,
.main>div {
  margin-left: 30px;
}

h2::before {
  content: "";
  background: var(--theme-1-10);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  height: 120%;
  width: 10px;
}

.shower {
  background-color: var(--theme-3-1);
  padding: 10px;
  border-radius: calc(10px * var(--theme-border-radius));
}

.statue {
  transition: 0.3s;
  position: absolute;
  top: 10px;
  right: 10px;
  margin: 0;
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 20px;
  border-radius: calc(10px * var(--theme-border-radius));
  z-index: 2;
}

.statue.Waiting {
  background-color: var(--theme-2-10);
}

.statue.A1 {
  background: var(--theme-2-3);
}

.statue.A2 {
  background: var(--theme-2-2);
}

.statue.A3 {
  background: var(--theme-2-1);
}

.statue.B1 {
  background: var(--theme-3-3);
}

.statue.B2 {
  background: var(--theme-3-2);
}

.statue.B3 {
  background: var(--theme-3-1);
}

.statue.Finish {
  background: var(--theme-3-10);
}

.anmin-botton {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  font-size: 24px;
  top: 5px;
  right: 120px;
  column-gap: 10px;
  & > li{
    opacity: 0.6;
    transition: 0.3s;
    cursor: pointer;
    margin: 0;
    line-height: 30px;
    width: 30px;
    text-align: center;
    user-select: none;
    &:hover{
      color: var(--theme-strong1);
      opacity: 1;
    }
  }
}
</style>