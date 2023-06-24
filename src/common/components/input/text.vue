<template>
    <div class="input-group" ref="inputGroup">
        <input :class="{
          input : true,
          'no-empty': props.value.length > 0
        }" :type="props.type" :value="props.value" @input="valueChange" ref="input" />
        <p class="title" ref="title">{{ props.title }}</p>
        <div class="back"></div>
    </div>
</template>
<script setup>
import { watchEffect,onMounted,ref } from 'vue';
const emit = defineEmits(["update:value"])
let input=ref(null)
let props = defineProps({
    type: {
        type: String,
        default: "text",
        required: false
    },
    value: {
        type: String,
        default: "",
        required: false
    },
    title: {
        type: String,
        default: "文本",
        required: false
    }
})
let inputGroup=ref(null)
let title = ref(null)
onMounted(()=>{
  watchEffect(()=>{
    props.title
    inputGroup.value.style.setProperty("--title-width",`${title.value.clientWidth}px`)
  })
})
function valueChange(event) {
    emit("update:value", event)
}
defineExpose({
  input
})
</script>
<style lang="scss" scoped>
.input {
    display: block;
    position: relative;
    width: calc(100% - 44px);
    font-size: 24px;
    font-family: monospace;
    outline: none;
    border-width: 3px;
    height: 54px;
    padding: 0;
    border-radius: calc(30px * var(--theme-border-radius));
    background-color: var(--theme-3-1);
    border-color: var(--theme-1-5);
    padding-left: 20px;
    padding-right: 20px;
    border-style: groove;
    transition: 0.3s;
  color: var(--font-color);
    &:focus,
    &:active {
        border-color: var(--theme-strong1);
    }
    &:focus,&:active,&.no-empty {
      width: calc(100% - 44px - var(--title-width) - 20px);
      transform: translate(calc(var(--title-width) + 20px),0);
      &+.title{
        transform: translate(-20px ,-50%);
        opacity: 1;
        pointer-events: all;
      }
    }
}
.title{
  position: absolute;
  margin: 0;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  top: 50%;
  transform: translate(0,-50%);
  left: 30px;
  opacity: 0.5;
  pointer-events: none;
  transition: 0.3s;
}
.input-group{
  position: relative;
}
.back{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--theme-1-3);
  z-index: -1;
  border-radius: calc(30px * var(--theme-border-radius));
  transition: 0.3s;
}
</style>