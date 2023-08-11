<template>
    <div :class="{
        show:props.show
    }" class="board">
        <p></p>
    </div>
</template>
<script setup>
let props = defineProps({
    value:{
        type:Number,
        required:true
    },show:{
        type:Boolean,
        required:true
    }
})
</script>
<style scoped lang="scss">

</style>