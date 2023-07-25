<template>
  <header class="header">
    <div id="titleGroup">
      <h1 id="title">{{ props.title }}</h1>
    </div>
    <div class="right-bottons">
      <themesChoice />
      <userBox :need-rights="needRights" :jump="props.jump" :to-login="props.toLogin" :need-info="props.needInfo" />
    </div>
    <mynav />
  </header>
</template>
<script setup>
import userBox from "./userBox.vue"
import themesChoice from "./themesChoice.vue";
import mynav from "./nav.vue"
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?446f9e42f304b5b9b7d11732fb496141";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
let manifestBox = document.createElement("link");
manifestBox.setAttribute("rel", "manifest")
manifestBox.setAttribute("href",new URL("/src/manifest.json"))
document.body.appendChild(manifestBox);
let props = defineProps({
  title: {
    type: String,
    default: "宽宽2007",
    required: true
  }, jump: {
    type: String,
    default: "",
    required: false
  }, toLogin: {
    type: Boolean,
    default: false,
    required: false
  }, needInfo: {
    type: Boolean,
    default: false,
    required: false
  }, needRights: {
    type: Boolean,
    default: false,
    required: false
  }
})
let title = document.createElement("title")
title.innerText = props.title
document.head.appendChild(title)
</script>
<style scoped>
.right-bottons{
  position: absolute;
  display: flex;
  right: 10px;
  align-items: center;
  height: 100%;
  column-gap: 10px;
}
header {
  z-index: 2;
  position: fixed;
  top: 0;
  height: 60px;
  background-color: var(--theme-1-3);
  backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
}

#titleGroup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#title {
  color: var(--theme-strong1);
  white-space: nowrap;
}

#linkGroup {
  animation-name: linkGroupChane;
  animation-duration: 1s;
  position: absolute;
  left: 85%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #c9c9ff
}

#toDocsMainPage,
#toMainPage,
#toContactInformation {
  white-space: nowrap;
  margin-top: 5px;
  margin-bottom: 5px;
  position: relative;
  background-color: #ff4e4e;
  height: 20px;
  border-radius: 10px;
  width: 80px;
}

.mainLink {
  text-align: center;
  width: 80px;
  line-height: 20px;
  position: absolute;
  color: #c9c9ff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}</style>