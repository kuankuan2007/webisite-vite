<template>
    <div class="main-page">
        <div v-file-drop="(files)=>{emit('updateMusicList', {type: 'new', files: files})}" class="file-droper" @click="showPicker" tabindex="0">
            <div class="bg">
                <p class="demo-icon">{{ iconMap.plusSquared }}</p>
                <p> 选择文件或拖拽文件至此处</p>
            </div>
        </div>
        
        <div class="list">
            <dragableList @update="$emit('updateMusicList', $event)" :content="props.playerStatue.playList" v-slot="{ data, index }">
                <musicItem @update="$emit('updateMusicList', $event)" :playing="props.playerStatue.data.id" :data="data" :index="index"/>
            </dragableList>
        </div>
    </div>
</template>
<script setup>
import iconMap from '../../../src/data/demo-icon';
import { filePicker } from "../../../src/common/script/filePicker";
import dragableList from '../../../src/common/components/dragablelist.vue';
import musicItem from './musicItem.vue';
import vFileDrop from '../../../src/common/command/fileDrop';
const emit = defineEmits(["updateMusicList"])
const props = defineProps({
    playerStatue: {
        type: Object,
        default: {},
        required: true
    }
})
function showPicker() {
    filePicker("audio/*", true).then(files => {
        emit("updateMusicList", {
            type: "new",
            files: files
        })
    })
}
</script>
<style scoped lang="scss">
.main-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    row-gap: 20px;
    align-items: center;
    justify-content: center;
    &>.file-droper {
        height: 200px;
        width: 80%;
        background-color: var(--theme-1-5);
        position: relative;
        border: 2px dashed var(--theme-1-10);
        border-radius: calc(15px * var(--theme-border-radius));
        transition: 0.3s;
        outline: none;
        flex-shrink: 0;
        cursor: pointer;

        &>.bg {
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: 0.3s;

            &>* {
                margin: 0;
                padding: 0;
                text-align: center;

                &.demo-icon {
                    font-size: 2em;
                }
            }
        }

        &:hover,
        &:focus {
            &>.bg {
                color: var(--theme-strong1-2);
            }

            border-color: var(--theme-strong1-2);
        }
    }

    &>.list {
        overflow-y: scroll;
        overflow-x: hidden;
        flex-grow: 1;
    }
}
</style>