<template>
  <myheader title="文档"></myheader>
  <div class="list">
    <waterfallFlow class="blogs" :column-gap="20" :value-list="docs.pageList" v-slot="{ data }" :eleWidth="300">
      <blogshower :data="data" />
    </waterfallFlow>
  </div>

  <div id="particles-js" class="background"></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import myheader from "../../src/common/components/header.vue"
import docs from "../../src/data/docs";
import blogshower from "./components/blog.vue"
import showBG from "./back"
import waterfallFlow from "../../src/common/components/waterfallFlow.vue"


docs.pageList.reverse()

let backgroundCanvas = ref()

onMounted(() => {
  showBG()
})

</script>
<style scoped lang="scss">
.blogs {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  position: absolute;
  scroll-snap-type: y proximity;
  top: 0;
  left: 0;
  height: calc(100% - 100px);
  overflow-y: scroll;
  align-items: center;

  &>* {
    margin-bottom: 20px;
    width: 80%;
  }

  scrollbar-width: 0px;

  &::-webkit-scrollbar {
    width: 0;
  }

  scroll-behavior: smooth;
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
.list{
    width: 100%;
    height: calc(100% - 80px);
    position: fixed;
    padding-top: 80px;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: 0;
    text-align: center;
}
</style>