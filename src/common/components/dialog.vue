<template>
    <dialog ref="dialog">
        <slot></slot>
    </dialog>
</template>
<script setup>
import { onMounted, ref ,reactive } from 'vue';
let props=defineProps({
    onclose:{
        type:Function,
        required:false,
        default:()=>{},
    },
    canClose:{
        type:Boolean,
        required:false,
        default:true
    }
})
let dialog = ref(null)
function showModal(){
    dialog.value.showModal()
    dialog.value.classList.add("on-entry")
    setTimeout(()=>{
        dialog.value.classList.remove("on-entry")
    },30)
}
function close(remove=false){
    dialog.value.classList.add("on-leave")
    setTimeout(()=>{
        dialog.value.close()
        dialog.value.classList.remove("on-leave")
        if (remove){
            dialog.value.remove()
        }
    },300)
}
onMounted(()=>{
    dialog.value.addEventListener("keydown", (e)=>{
        console.log(e,props.canClose);
        if (e.key==="Escape" && !props.canClose){
            e.preventDefault()
        }
    })
})
function show(){
    dialog.value.classList.add("on-entry")
    setTimeout(()=>{
        dialog.value.classList.remove("on-entry")
    },30)
    dialog.value.show()
}
defineExpose({
    showModal,
    close,
    show,
    dialog:dialog
})
</script>
<style scoped lang="scss">
dialog{
    &.on-leave{
        transform: translate(0,10vh);
        opacity: 0;
        transition: 0.3s;
    }
    &.on-entry{
        transform: translate(0,-10vh);
        opacity: 0;
        transition: 0s;
    }
}
</style>
