<template>
    <div class="input-group" ref="inputGroup">
        <input :class="{
          input : true,
          'no-empty': props.value.length > 0
        }" :type="props.type" :value="props.value" @input="valueChange" ref="input" />
        <p class="title" ref="title">{{ props.title }}</p>
        <div class="back"></div>
        <Transition name="reminder">
          <p class="reminder" v-show="wrong!=0&&wrong!=-1"><span class="demo-icon">&#xe817;</span>{{ props.reminder[wrong-1] }}</p>
        </Transition>
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
    },tester: {
      type: Function,
      default: ()=>0,
      required:false
    },reminder:{
      type: Array,
      default: ["内容格式不正确"],
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
let wrong=ref(props.value?props.tester(props.value):-1)
function refreshReminder(value,...args){
  wrong.value=value?props.tester(value,...args):-1
}
/**
 * @param {MouseEvent} event 
 */
function valueChange(event) {
  refreshReminder(event.target.value)
  emit("update:value", event)
}
defineExpose({
  wrong,
  reminder:props.reminder,
  input,
  title:props.title,
  refreshReminder
})
</script>
<style lang="scss" scoped>
.reminder{
  transition: 0.3s;
  position: absolute;
  margin: 0;
  font-size: 0.8em;
  color: red;
  pointer-events: none;
  user-select: none;
  left: calc(20px + var(--title-width));
}
.reminder-enter-from,
.reminder-leave-to{
  opacity: 0;
}
.reminder-enter-to,
.reminder-leave-from{
  opacity: 1;
}
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
    border-style: solid;
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
  font-size: 1em;
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