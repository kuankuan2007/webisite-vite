<template>
    <input type="button" class="button"/>
</template>
<script setup>

</script>
<style scoped lang="scss">
.button {
    border: none;
    outline: none;
    background-color: var(--theme-strong1);
    cursor: pointer;
    padding: 0px;
    height: 60px;
    width: 100%;
    font-size: 24px;
    color: var(--font-color-b);
    border-radius: calc(30px * var(--theme-border-radius));
    transition: 0.3s;
    &:hover{
        opacity: 0.7;
    }
}
</style>