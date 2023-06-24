<template>
    <span class="selecter">
        {{ props.choice }}
        <span class="demo-icon show-menu">&#xe805;</span>
        <span class="menu">
            <div class="padding-value-list">
                <ul class="value-list">
                    <li :class="{
                        'choices':true,
                        value:true,
                        'choice':value===props.choice,
                    }"
                    v-for="value in props.values" @click="chaneChoice(value)">{{ value }}</li>
                </ul>
            </div>
        </span>
    </span>
</template>
<script setup>
let props = defineProps({
    values: {
        type: Array,
        default: [],
        required: true
    },
    choice: {
        type: String,
        default: "",
        required: true
    },
})
let emit = defineEmits(["update:choice"])
function chaneChoice(value) {
    emit("update:choice", value)
}
</script>
<style scoped lang="scss">
.selecter {
    background-color: var(--theme-1-2);
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    border-radius: calc(11px * var());
    transition: 0.3s;
    border-radius: calc(11px * var(--theme-border-radius));
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
    position: absolute;
    display: grid;
    padding-top: 10px;
    grid-template-rows: 0fr;
    transition: 0.3s;
    transition-delay: 0.3s;
    width: max-content;
}

.show-menu {
    cursor: pointer;
    user-select: none;

    &:hover {
        color: var(--theme-strong1);
    }
}

.show-menu:hover+.menu,
.menu:hover {
    grid-template-rows: 1fr;
    transition-delay: 0s;
}

.padding-value-list {
    padding: 0;
    margin: 0;
    overflow-y: hidden;
    overflow-x: auto;
    background-color: var(--theme-1-4);
    border-radius: calc(10px * var(--theme-border-radius));
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
}
.value-list{
    list-style: none;
    padding: 10px;
    margin: 0;
}
.choices{
    padding: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: calc(10px * var(--theme-border-radius));
    &:hover{
        background-color: var(--theme-2-1);
    }
    &.choice{
        background-color: var(--theme-3-3);
    }
}
</style>