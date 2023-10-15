<template>
  <myheader title="关于"></myheader>
  <div class="full">
    <div class="main">
      <markdownshower :content="aboutContent" :header-level-start="2"/>
    </div>
  </div>
  <div id="particles-js" class="background"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import showBG from "./back"
import myheader from "../../src/common/components/header.vue";
import markdownshower from "../../src/common/components/markdownshower.vue";
import about from "./assets/about.md?raw"

const aboutContent=ref(about)
onMounted(() => {
  showBG()
})

</script>
<style scoped lang="scss">
.full{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  padding-top: 20px;
  min-height: calc(100vh - 90px);
  &>.main{
    max-width: 80%;
    background-color: var(--theme-1-1);
    padding: 20px;
    border-radius: calc(20px * var(--theme-border-radius));
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
</style>