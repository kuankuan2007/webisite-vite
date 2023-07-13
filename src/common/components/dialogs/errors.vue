<template>
    <myDialog ref="dialog" class="dialog" :onclose="props.onclose">
        <div class="header">
            <p class="title">{{ props.title }}</p>
            <div class="line"></div>
        </div>
        <p class="text">{{ props.message }}</p>
        <ul class="buttons" :style="{
            gridTemplateColumns: `repeat(${Object.keys(props.buttons).length},max-content)`
        }">
            <li v-for="(value, title) in props.buttons" @click="onClickButton(value)" :class="[
                'button', value
            ]">{{ title }}</li>
        </ul>
        <p v-if="props.canClose" class="close demo-icon" @click="close">&#xe80c;</p>
    </myDialog>
</template>
<script setup>
import myDialog from "../dialog.vue"
import { onMounted, ref } from "vue";
let dialog = ref(null)
let props = defineProps({
    title: {
        type: String,
        default: "",
        required: true
    }, message: {
        type: String,
        default: "",
        required: true
    }, buttons: {
        type: Object,
        default: [],
        required: false
    }, canClose: {
        type: Boolean,
        default: true,
        required: false
    }, root: {
        type: HTMLElement,
        required: true,
        default: null
    }, onclose:{
        type:Function,
        required:false,
        default:()=>{},
    }
})
onMounted(() => {
    dialog.value.showModal()
})
function close() {
    let event = new Event('close', {
        bubbles: true
    });
    dialog.value.close(true)
    setTimeout(() => {
        props.root.remove()
    }, 1000)
}
function onClickButton(value) {
    let event = new Event('button', {
        bubbles: true
    });
    event.button = value
    event.close = close
    dialog.value.dialog.dispatchEvent(event);
}
</script>
<style scoped lang="scss">
.text {
    margin-left: 15px;
}

.buttons {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
}

.button {
    float: right;
    border-width: 2px;
    border-style: groove;
    border-color: red;
    padding: 2px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: calc(15px * var(--theme-border-radius));
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: red;
        color: var(--font-color-b);
    }
}

.header .line {
    height: 3px;
    width: 100%;
    background: linear-gradient(90deg, red, transparent);
    border-radius: 3px;
}

.dialog {
    color: var(--font-color);
    width: max-content;
    border: none;
    outline: none;
    border-radius: calc(20px * var(--theme-border-radius));
    background: var(--theme-1-5);
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
    transition: 0.3s;
    max-height: 50%;
    min-width: 50%;
}

.title {
    font-size: 20px;
    margin: 0;
    margin-bottom: 10px;
    margin-left: 5px;
}

.close {
    position: absolute;
    top: 5px;
    right: 5px;
    margin: 0;
    font-size: 20px;
    color: #ff0000;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.2);
    }
}
</style>