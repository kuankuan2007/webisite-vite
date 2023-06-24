<template>
  <myheader title="宽宽2007·提交反馈"></myheader>
  <div class="main">
    <myInputText ref="titleInput" :value="title" title="标题" @update:value="title = $event.target.value" />
    <h2>内容</h2>
    <markDownEditor ref="contentInput" @update:content="content = $event.target.value" :content="content" :headerLevelStart="3" />
    <h2>复现步骤</h2>
    <markDownEditor @update:content="recirculationStep = $event.target.value" :content="recirculationStep"
      :headerLevelStart="3" />
    <myInputButton value="提交" @click="submit" />
  </div>
</template>
<script setup>
import myheader from "../../../src/common/components/header.vue"
import markDownEditor from "../../../src/common/components/markDownEditor.vue";
import { ref } from "vue"
import myInputText from "../../../src/common/components/input/text.vue"
import myInputButton from "../../../src/common/components/input/button.vue"
import  {newFeedback} from "../../../src/common/script/connection"
import { showMessage } from "../../../src/common/script/infomations";
let content = ref("")
let recirculationStep = ref("")
let title = ref("")
let titleInput = ref("")
let contentInput = ref("")
function submit() {
  if (/^ *$/.test(title.value)) {
    showMessage("标题为必填项", () => {
      console.log(titleInput.value)
      titleInput.value.input.focus()
    })
    return
  } if (/^[ \n\r]*$/.test(content.value)) {
    showMessage("内容为必填项", () => {
      contentInput.value.editer.focus()
    })
    return
  }
  newFeedback(title.value, content.value, recirculationStep.value)
}
</script>
<style scoped>
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

h2 {
  position: relative;
  width: fit-content;
  cursor: default;
  padding-left: 20px;
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

</style>