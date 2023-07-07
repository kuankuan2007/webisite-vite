<template>
    <div class="blog" :id="props.data.name" v-show="finished">
        <p class="date">{{ props.data.date }}</p>
        <markdownShower :header-level-start="2" :content="content"/>
    </div>
</template>
<script setup>
import { ref } from "vue";
import markdownShower from "../../../src/common/components/markdownShower.vue"
let props = defineProps({
    data:{
        type:Object,
        default:{},
        required:true
    }
})
function getUrl(name) {
    return new URL(`../../../src/data/blogs/${name}.md`, import.meta.url)
}
let content = ref("")
let finished = ref(false)
console.log(getUrl(props.data.name))
fetch(getUrl(props.data.name)).then((respone)=>{
    respone.text().then((text)=>{
        content.value = text
        finished.value = true
    })
})
</script>
<style scoped lang="scss">
.blog{
    background-color: var(--theme-1-2);
    padding: 20px;
    border-radius: calc(var(--theme-border-radius) * 20px);
    position: relative;
    transition: 0.3s;
    backdrop-filter: blur(calc( 5px * var(--theme-backdrop-blur)));
    padding-top: 40px;
}
:deep(.shower>*:nth-child(1)){
    margin-top: 0;
}
:deep(img){
    max-width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    border-radius: calc(10px * var(--theme-border-radius));
}
.date{
    position: absolute;
    margin: 0;
    top: 10px;
    right: 10px;
    background-color: var(--theme-3-2);
    padding-left: 10px;
    padding-right: 10px;
    line-height: 20px;
    height: 20px;
    border-radius: calc(10px * var(--theme-border-radius));
    transition: 0.3s;
    cursor: default;
    user-select: none;
}
</style>