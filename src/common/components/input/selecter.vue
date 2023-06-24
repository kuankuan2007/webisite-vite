<template>
    <span>
        <ul>
        
        </ul>
    </span>
</template>
<script setup>
let props = defineProps({
    values:{
        type: Array,
        default: [],
        required: true
    },
    choice:{
        type: String,
        default: "",
        required: true
    },
})
</script>