<template>
    <iframe class="size-tester" ref="sizeTester"></iframe>
</template>
<script setup>
import { onMounted, ref } from 'vue';
let emit=defineEmits(["resize"])
let sizeTester=ref()
onMounted(()=>{
    sizeTester.value.contentWindow.addEventListener('resize', () => {
        emit("resize")
    }, false)
})
</script>
<style scoped lang="scss">
.size-tester {
    width: 100%;
    height: 100%;
    left: 0px;
    right: 0px;
    border: none;
    position: absolute;
    pointer-events: none;
}
</style>