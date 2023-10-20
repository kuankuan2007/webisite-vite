<template>
  <myheader title="font-ello"></myheader>
  <div class="list">
    <waterfallFlow :column-gap="20" :value-list="iconMap" v-slot="{ data, title }" :eleWidth="150">
      <contextMenu :data="contextMenuData" @choice="uploadChoice($event, data, title)">
        <div class="item">
          <p class="icon demo-icon">{{ data }}</p>
          <p class="id">{{ title }}</p>
        </div>
      </contextMenu>
    </waterfallFlow>
  </div>

  <div id="particles-js" class="background"></div>
</template>
<script setup>
import iconMap from "../../../src/data/demo-icon";
import { ref, onMounted } from "vue"
import waterfallFlow from '../../../src/common/components/waterfallFlow.vue';
import showBG from "./back"
import myheader from '../../../src/common/components/header.vue';
import contextMenu from "../../../src/common/components/contextMenu.vue";
import { copyText } from "../../../src/common/script/normal";
import { showMessage } from "../../../src/common/script/infomations";

function uploadChoice(event, data, title) {
  if (event === "copy-char") {
    copyText(data).then(()=>{
      showMessage("复制成功")
    })
  }else if (event === "copy-id") {
    copyText(title).then(()=>{
      showMessage("复制成功")
    })
  }
}

const contextMenuData = {
  title: '复制',
  menu: [
    {
      title: '字符',
      event: 'copy-char'
    },
    {
      title: 'id',
      event: 'copy-id'
    }
  ]
}

onMounted(() => {
  showBG()
})

</script>
<style scoped lang="scss">
.item {
  background-color: var(--theme-1-3);
  border-radius: calc(10px * var(--theme-border-radius));
  padding: 20px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -999;
}

.list {
  width: 100%;
  height: calc(100% - 150px);
  position: fixed;
  padding-top: 150px;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: 0;
  text-align: center;
}
</style>