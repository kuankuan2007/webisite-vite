<template>
  <myheader title="小说目录"></myheader>
  <div class="main" v-if="finished">
    <div class="list-base">
      <contentsShower :on-fold="false" v-for="item,name in contents" :title="name" :contents="item" />
    </div>

  </div>
  <div id="particles-js" class="background"></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import myheader from "../../src/common/components/header.vue"
import { getNovelContents } from "../../src/common/script/connection"
import showBG from "./back"
import contentsShower from "./components/contents.vue";

let backgroundCanvas = ref()
let finished = ref(false)
let contents = ref({})
getNovelContents().then(
  value => {
    if (value) {
      finished.value = true
      contents.value = value
    }
  }
)


onMounted(() => {
  showBG()
})

</script>
<style scoped lang="scss">
.main {
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  &>.list-base{
    padding: 10px;
    min-width:70%;
    width: fit-content;
    background-color: var(--theme-1-3);
    border-radius: calc(20px*var(--theme-border-radius));
  }
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