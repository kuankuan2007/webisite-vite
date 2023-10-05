<template>
    <a class="docsLink" @click="jump(`/docs/docsPage/?name=${data.name}`)"><div class="docs-show-box">
        <p class="title">{{props.data.title}}</p>
    </div>
    </a>
</template>
<script setup>
import { jump } from '../../../src/common/script/normal';
let props=defineProps({
    data:{
        type:Object,
        required:true
    }
})
</script>
<style scoped lang="scss">
.docs-show-box{
    background-color: var(--theme-1-1);
    border-radius: calc(10px * var(--theme-border-radius));
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
    cursor: pointer;
    transition: 0.3s;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    &:hover{
        background-color: var(--theme-3-2);
        border-color: var(--theme-strong1);
    }
}
.docsLink{
    color: var(--font-color);
    text-decoration: none;
}
</style>