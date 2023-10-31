<template>
    <div class="list-item">
        <p class="title">{{ props.data.hitokoto }}</p>
        <div class="buttons" :class="{
            fold: fold
        }">
                <linkLikeButton class="demo-icon onplay" @click="copy">{{
                        iconMap.copy
                    }}</linkLikeButton>
                <linkLikeButton @click="jump(`https://hitokoto.cn?uuid=${props.data.uuid}`,true)" class="demo-icon delete">{{
                    iconMap.goNext }}
                </linkLikeButton>
                <linkLikeButton :class="{
                    fold: fold
                }" @click="fold = !fold" class="demo-icon fold-button">{{ iconMap.angleCircledRight }}
                </linkLikeButton>
            </div>
        <transition @enter="afterEnter" @leave="afterLeave" name="sub-list">
            <div v-show="!fold" class="sub-list-box" ref="subList" :class="{
                fold: fold
            }">
                <div class="sub-list">
                    <div class="album">
                        <p>{{ props.data.from || '未知' }}</p>
                    </div>
                    <div class="from_who">
                        <p>{{ props.data.from_who || '未知' }}</p>
                    </div>
                    <div class="type">
                        <p>{{ props.wordTypeList[props.data.type] || '未知' }}</p>
                    </div>
                    <div class="id">
                        <p>{{ props.data.id || '未知' }}</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { formattingTime } from '../../../src/common/script/normal';
import iconMap from '../../../src/data/demo-icon';
import linkLikeButton from '../../../src/common/components/input/linkLikeButton.vue';
import { copyText,jump } from '../../../src/common/script/normal';
import { showMessage } from '../../../src/common/script/infomations';

async function copy(){
    console.log(props.data.hitokoto)
    await copyText(props.data.hitokoto)
    showMessage("复制成功")
}
window.copyText=copyText
const fold = ref(true)
/**@type {import("vue").Ref<HTMLDivElement>} */
const subList = ref()

function afterLeave() {
    subList.value.style.height = "0px"

}
function afterEnter() {
    subList.value.style.height = "auto"
    const h = subList.value.offsetHeight
    subList.value.style.height = "0px"
    setTimeout(() => {
        subList.value.style.height = `${h}px`
    })
}
const emit = defineEmits(['update'])
const props = defineProps({
    data: {
        type: Object,
        required: true
    }, wordTypeList:{
        type: Object,
        required:true
    }
})
</script>
<style scoped lang="scss">
.list-item {
    background-color: var(--theme-3-10);
    padding: 10px;
    padding-right: 20px;
    margin-bottom: 20px;
    border-radius: calc(15px * var(--theme-border-radius));
    position: relative;
    width: calc(40vw + 180px);

    &>.title {
        font-size: 1.4em;
        margin: 0 0 5px 0;
        padding-left: 10px;
        padding-right: 80px;

        &>.demo-icon {
            padding: 0;
            margin: 0 20px 0 0;
        }

        &>.index {
            margin-right: 10px;
        }
    }

    &>.buttons {
        display: flex;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        right: 10px;
        z-index: 1;
        // transform-origin: 75% 50%;
        flex-direction: column;
        row-gap: 5px;
        justify-content: center;
        align-items: center;
        transform-origin: 50% 50%;

        &.fold {
            transform: translate(0, -50%) rotate(-90deg);
            right: 35px;

            &>* {
                rotate: 90deg;
            }
        }

        transition: 0.3s;

        &>.onplay,
        &>.delete {
            margin-left: 20px;
            cursor: pointer;
            display: block;
            display: block;
            font-size: 1.5em;
            transition: 0.3s;
            margin: 0;
            border: none;

            &.active {
                color: var(--theme-strong1);
            }
        }

        &>.fold-button {
            display: block;
            font-size: 1.5em;
            transition: 0.3s;
            margin: 0;
            transform: rotate(-90deg);

            &.fold {
                transform: rotate(0deg);
            }

            border: none;

            &:focus {
                color: var(--theme-strong1-3);
            }

            &:hover {
                color: var(--theme-strong1);
            }
        }
    }


    &>.sub-list-box {
        transition: 0.3s;

        overflow: hidden;

        &>.sub-list {
            display: grid;
            padding: 0 50px;
            column-gap: 5px;
            row-gap: 5px;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            transform: translate(0px, 0px);
            transition: 0.3s;

            .list-enter-active,
            .list-leave-active {
                transition: all 0.5s ease;
            }

            .list-enter-from,
            .list-leave-to {
                opacity: 0;
                transform: translate(0px, 100px);
            }

            &>* {
                font-size: 1.2em;
                width: 20vw;
                padding: 0px 20px;
                position: relative;
                background-color: var(--theme-3-5);
                border-radius: calc(10px * var(--theme-border-radius));

                &>div.image-shower {
                    width: 75%;
                    height: 75%;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: calc(10px * var(--theme-border-radius));
                }

                &>p {
                    text-align: center;
                    word-break: keep-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                &::before {
                    position: absolute;
                    font-size: 10px;
                    color: var(--theme-disabled-font);
                    top: 3px;
                    margin: 0;
                    padding: 0;
                    left: 3px;
                }

                &:nth-child(1)::before {
                    content: "出处";
                }

                &:nth-child(2)::before {
                    content: "作者";
                }

                &:nth-child(3)::before {
                    content: "类型";
                }

                &:nth-child(4)::before {
                    content: "ID";
                }
            }
        }
    }

}</style>