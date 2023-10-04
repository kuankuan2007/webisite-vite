<template>
  <div @keydown.enter="enterkeydown" ref="editer" class="editer"></div>
</template>
<script setup>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { ref, onMounted, watchEffect } from 'vue';

const editer = ref()
const vditor = ref()
const emit = defineEmits(["update:content", "enter"])
let props = defineProps({
  content: {
    type: String,
    default: "",
    required: true
  }, otherButtons: {
    type: Array,
    default: [],
    required: false
  }, maxEditorHeight: {
    type: Number,
    default: Infinity,
    required: false
  }, placeHolder: {
    type: String,
    default: "",
    required: false
  }
})
const baseToolBar = [
  "emoji",
  "headings",
  "bold",
  "italic",
  "strike",
  "link",
  "|",
  "list",
  "ordered-list",
  "check",
  "outdent",
  "indent",
  "|",
  "quote",
  "line",
  "code",
  "inline-code",
  "insert-before",
  "insert-after",
  "|",
  "table",
  "|",
  "undo",
  "redo",
  "|",
  "edit-mode",
  {
    name: "more",
    toolbar: [
      "outline",
      "preview",
      "info",
      "help",
    ],
  }
].concat(props.otherButtons)
onMounted(() => {
  vditor.value = new Vditor(editer.value, {
    after: () => {
      watchEffect(() => {
        if (props.content !== vditor.value.getValue()) {
          vditor.value.setValue(props.content);
        }
      })
      refreshThemes(document.documentElement.dataset.themeLight)
    }, cache: {
      enable: false
    },
    preview: {
      theme:"dark",
      hljs:"github-dark"
    },
    lang: "zh_CN"
    , toolbar: baseToolBar, 
    placeholder: props.placeHolder,
    input(e,v){
      emit("update:content",e)
    },minHeight:150
  });
  window.vditor=vditor
});
function enterkeydown(event) {
  emit("enter", event)
}
const afterLoaded=[]
/**
 * 
 * @param {'light'|'dark'} light 
 */
function refreshThemes(light){
  if (light === 'light') {
    vditor.value.setTheme("classic")
  } else {
    vditor.value.setTheme("dark")
  }
}
window.addEventListener("themeRefresh",(e)=>{
  refreshThemes(e.value.light)
})
const a=new Vditor(document.createElement("div"),{cache:{enable:false}})
a.setTheme
// a.vditor.options.placeholder="你好"
</script>
<style scoped lang="scss">

</style>