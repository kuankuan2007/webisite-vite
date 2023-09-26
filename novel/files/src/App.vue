<template>
  <myheader :title="path ? path[path.length - 1] : '文档不存在'" />
  <div class="center" v-if="path">
    <div class="main">
      <div class="buttons">
        <button @click="downloadData(content, path[path.length - 1])">
          <p class="button download demo-icon">&#xf02e;</p>
        </button>
      </div>
      <markdownShower :content="content" :header-level-start="2" v-if="finished" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import myheader from "../../../src/common/components/header.vue"
import markdownShower from "../../../src/common/components/markdownShower.vue"
import { getQueryVariable, downloadData, jump } from "../../../src/common/script/normal"
import { showMessage, showError } from "../../../src/common/script/infomations"
import docs from "../../../src/data/docs";
import { getNovelFile } from "../../../src/common/script/connection";
const name = getQueryVariable("path", "[]")
let data = ref(null)
let finished = ref(false)
let content = ref("")
const path = ref([])

try {
  path.value = JSON.parse(decodeURIComponent(name))
} catch {
  showError("您访问的资源不存在", () => {
    jump("/novel/")
  })
  path.value = []
}
if (path.value) {
  getNovelFile(path.value).then(
    contents => {
      console.log(contents)
      content.value = contents
      finished.value = true
    }
  )
}

</script>
<style scoped lang="scss">
.center {
  position: absolute;
  max-width: 80%;
  min-width: 70%;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  overflow: auto;
  background-color: var(--theme-1-1);
  border-radius: calc(20px * var(--theme-border-radius));
  backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));

  &:deep(*) {
    line-height: 150%;
  }
}

.main {
  position: relative;
  padding: 40px;
}

.buttons {
  position: absolute;
  right: 5px;
  top: 5px;

  &>button {
    border-style: solid;
    border-width: 2px;
    border-color: transparent;
    background-color: var(--theme-2-3);
    height: 30px;
    min-width: 30px;
    border-radius: calc(15px * var(--theme-border-radius));
    transition: 0.3s;
    color: var(--theme-font-color);
    cursor: pointer;

    &:hover {
      background-color: transparent;
      border-color: var(--theme-strong1);
    }

    &>* {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }
}</style>