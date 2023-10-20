<template>
    <div class="page-main">
        <div class="seting">
            <p class="title">设置</p>
            <div class="main-buttons">
                <linkLikeButton @click="emit('update', { type: 'play' })" class="demo-icon">{{ textStatue.textGetErrorPaused
                    ?
                    iconMap.play : iconMap.pause }}</linkLikeButton>
            </div>
            <div class="type-list">
                <checkbox v-for="item, key in wordTypeList" :key="key" :title="item"
                    :content="textStatue.types.includes(key)" @change="emit('update', {
                        type: 'typeChange',
                        key: key
                    })"></checkbox>
            </div>
        </div>
        <div class="history">
            <transition-group name="list">
                <wordItem class="history-item" v-for="item in textStatue.textHistory" :data="item" :key="item.id" :wordTypeList="wordTypeList" />
            </transition-group>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update'])
import linkLikeButton from '../../../src/common/components/input/linkLikeButton.vue';
import iconMap from '../../../src/data/demo-icon';
import checkbox from '../../../src/common/components/input/checkBox.vue'
import wordItem from './wordItem.vue';

const wordTypeList = {
    a: '动画',
    b: "漫画",
    c: "游戏",
    d: "文学",
    e: "原创",
    f: "网络",
    g: "其他",
    h: "影视",
    i: "诗词",
    j: "网易云",
    k: "哲学",
    l: "抖机灵"
}
const props = defineProps({
    textStatue: {
        type: Object,
        required: true
    }
})
</script>
<style scoped lang="scss">
.list-enter-active,
.list-leave-active,
.list-move {
    transition: all 0.3s ease;
}

.list-enter-from{
    opacity: 0;
    transform: translate(0, -100px) scale(0.8);
}
.list-leave-to {
    opacity: 0;
    transform: translate(0, 100px) scale(0.8);
}

.list-leave-active {
    position: absolute;
}
.page-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    height: 100%;

    &>.seting {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        background-color: var(--theme-1-5);
        border-radius: calc(15px * var(--theme-border-radius));
        position: relative;
        flex-shrink: 0;

        &>.main-buttons {
            display: flex;
            justify-content: right;
            align-items: center;

            &>* {
                border-radius: 50%;
                display: block;
                margin: 0;
                width: 40px;
                height: 40px;
                border-color: var(--theme-1-10);
                padding: 5px;
                border-radius: 1000px;
                font-size: 1.5em;

                &:hover {
                    background-color: var(--theme-strong1);
                    color: var(--font-color-b);
                    border-color: var(--theme-strong1);
                }

                &:focus {
                    border-color: var(--theme-strong1-2);
                }
            }
        }

        &>.type-list {
            display: flex;
            flex-wrap: wrap;
            column-gap: 10px;
            row-gap: 10px;

            &>* {
                flex-shrink: 0;
                flex-basis: 100px;
                flex-grow: 1;
            }
        }

        &>.title {
            position: absolute;
            top: 10px;
            left: 20px;
            margin: 0;
            font-size: 1.5em;
        }
    }

    &>.history {
        overflow-y: scroll;
        overflow-x: hidden;
        flex-grow: 1;
    }
}
</style>