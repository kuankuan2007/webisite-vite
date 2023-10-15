<template>
    <my-dialog ref="dialog" class="dialog">
        <div class="main">
            <div class="tab-control">
                <linkLikeButton @click="showingPage = 0" :class="{ active: showingPage === 0 }" class="tab-control-item">
                    播放队列</linkLikeButton>
                <linkLikeButton @click="showingPage = 1" :class="{ active: showingPage === 1 }" class="tab-control-item">
                    一言记录</linkLikeButton>
            </div>
            <div class="pages">
                <div class="page-list" :style="{
                    '--page-num': showingPage,
                    '--total-num':2
                }">
                    <div class="page">
                        <transition :duration="300" name="page">
                            <musicList v-show="showingPage === 0" @update-music-list="emit('updateMusicList', $event)"
                                :player-statue="props.playerStatue" />
                        </transition>
                    </div>

                    <div class="page">
                        <transition :duration="300" name="page">
                            <wordList @update="emit('updateTextStatue', $event)" v-show="showingPage === 1" :text-statue="props.textStatue"/>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </my-dialog>
</template>
<script setup>
import { ref } from 'vue';
import myDialog from '../../../src/common/components/dialog.vue';
import linkLikeButton from '../../../src/common/components/input/linkLikeButton.vue';
import musicList from "./musicList.vue"
import wordList from './wordList.vue';

const emit = defineEmits(["updateMusicList","updateTextStatue"])
const props = defineProps({
    playerStatue: {
        type: Object,
        default: {},
        required: true
    }, textStatue: {
        type: Object,
        required: true
    }
})

const showingPage = ref(0)
/**@type {import("vue").Ref<HTMLDialogElement>} */
const dialog = ref()
function close() {
    dialog.value.close()
}
function open() {
    dialog.value.showModal()
}
defineExpose({
    open
})
</script>
<style scoped lang="scss">
.dialog {
    color: var(--font-color);
    width: max-content;
    border: none;
    outline: none;
    border-radius: calc(20px * var(--theme-border-radius));
    background: var(--theme-3-1);
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
    transition: 0.3s;
    height: 80%;
    width: 80%;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-leave-to,
.page-enter-from{
    opacity: 1;
    transition: 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.4);
}
.main {
    display: flex;
    flex-direction: column;
    height: 100%;
    row-gap: 20px;

    &>.tab-control {
        display: flex;
        column-gap: 5px;

        &>.tab-control-item {
            display: block;
            border: none;
            font-size: 1.2em;
            position: relative;
            padding: 0;

            &::after {
                position: absolute;
                background-color: var(--theme-strong1);
                right: 0;
                bottom: -3px;
                width: 0%;
                height: 3px;
                content: "";
                transition: 0.3s;
                border-radius: calc(20px * var(--theme-border-radius));
            }

            &.active {
                color: var(--theme-strong1);

                &::after {
                    width: 100%;
                    left: 0;
                }
            }

            &:focus {
                color: var(--theme-strong2-3);
            }
        }
    }
}

.pages {
    flex-grow: 1;
    position: relative;
    overflow: hidden;

    &>.page-list {
        display: grid;
        grid-template-columns: 100% 100%;
        height: 100%;
        transition: 0.3s;
        transform: translate(calc(-100% * var(--page-num)),0);
        &>.page {
            overflow: auto;
            width: 100%;
            height: 100%;
        }
    }
}
</style>