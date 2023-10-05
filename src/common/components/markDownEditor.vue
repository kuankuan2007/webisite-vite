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
    type: String,
    default: Infinity,
    required: false
  }, placeHolder: {
    type: String,
    default: "",
    required: false
  }
})
onMounted(() => {
  watchEffect(() => {
    if (typeof props.maxEditorHeight === "number") {
      editer.value.style.setProperty("--max-height", `${props.maxEditorHeight}px`)
    }
    else {
      editer.value.style.setProperty("--max-height", props.maxEditorHeight)
    }
  })
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
  "fullscreen",
  {
    name: "more",
    toolbar: [
      "outline",
      "info",
      "help",
    ],
  }
].concat(props.otherButtons)
onMounted(() => {
  vditor.value = new Vditor(editer.value, {
    after: () => {
      watchEffect(() => {
        console.log(props.content)
        if (props.content !== vditor.value.getValue()) {
          vditor.value.setValue(props.content);
        }
      })
      refreshThemes(document.documentElement.dataset.themeLight)
    }, cache: {
      enable: false
    },
    preview: {
      theme: "dark",
      hljs: "github-dark"
    },
    counter: {
      enable: true,
      after(length) {
        console.log(length);

      }
    },
    lang: "zh_CN"
    , toolbar: baseToolBar,
    placeholder: props.placeHolder,
    input(e, v) {
      console.log(e, v)
      emit("update:content", e)
    }, minHeight: 200
  });
  window.vditor = vditor
});
function enterkeydown(event) {
  emit("enter", event)
}
const afterLoaded = []
/**
 * 
 * @param {'light'|'dark'} light 
 */
function refreshThemes(light) {
  if (light === 'light') {
    vditor.value.setTheme("classic")
  } else {
    vditor.value.setTheme("dark")
  }
}
window.addEventListener("themeRefresh", (e) => {
  refreshThemes(e.value.light)
})

</script>
<style scoped lang="scss">
.editer.vditor {
  border-radius: calc(20px * var(--theme-border-radius));
  overflow: hidden;
  max-height: var(--max-height);
  overflow: visible;

  &.vditor--fullscreen {
    max-height: unset;
    height: calc(100vh - 60px) !important;
    top: 60px;
  }
}
:deep(.vditor-content){
  min-height: 100px;
}
</style>