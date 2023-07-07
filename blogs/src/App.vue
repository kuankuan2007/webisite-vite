<template>
  <myheader title="博客"></myheader>
  <div class="blogs">
    <blogshower v-for="blog, index in blogs.blogsList" :key="index" :data="blog" />
  </div>
  <div class="background" id="background" ref="background">
    <canvas class="particles-js-canvas-el" ref="backgroundCanvas"> </canvas>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import myheader from "../../src/common/components/header.vue"
import blogs from "../../src/data/blogs"
import blogshower from "./components/blog.vue"
import pJS from "particles.js"

window.pJS = pJS
blogs.blogsList.reverse()

let backgroundCanvas = ref()


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
</style>