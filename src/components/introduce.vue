<template>
    <div class="introduce">
        <div class="page">
            <div class="content">
                <p class="left-brace">{</p>
                <div class="json-struct" ref="jsonStruct">
                    <inNode v-for="data, title in props.data" :key="title" :data="data" :title="title" />
                </div>
                <p class="right-brace">}<span class="gap">,</span></p>
            </div>
        </div>
        <div class="bg">
            <div :style="{
                '--x': data.x,
                '--y': data.y,
                '--size': data.size,
                '--color': data.color,
                '--speed': data.speed
            }" class="color-block" v-for="data, index in colorBolcks.data" :key="index"></div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, watchEffect, ref } from 'vue';
import inNode from './inNode.vue';
import { RandomColorboxList } from '../blockList'


/**@type {import('vue').Ref<HTMLDivElement>} */
const jsonStruct = ref()

const props = defineProps({
    data: {
        type: Object,
        required: true
    }, simplePageHeight: {
        type: Number,
        required: true,
    }
})
const colorBolcks = new RandomColorboxList(props, "simplePageHeight")

</script>
<style scoped lang="scss">
* {
    transition: color 0.3s, border-radius 0.3s;
}

.gap {
    color: var(--font-color);
}

.introduce {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &>.bg {
        position: absolute;
        inset: 0;
        z-index: -1;

        &>.color-block {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(calc(-50% + var(--x) * 1px), calc(-50% + var(--y) * 1px));
            width: calc(var(--size) * 1px);
            height: calc(var(--size) * 1px);
            background-color: var(--color);
            border-radius: 10%;
            transition: 0.3s;
        }
    }

    &>.page {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &>.content {
            $padding: 40px;
            max-width: calc(70% - #{1 * $padding});
            padding: #{$padding} #{$padding};
            background-color: var(--theme-1-3);
            border-radius: calc(20px * var(--theme-border-radius));
            position: relative;
            backdrop-filter: blur(10px);

            &>.right-brace,
            &>.left-brace {
                backdrop-filter: blur(10px);
                position: absolute;
                margin: 0;
                font-size: 72px;
                width: 128px;
                height: 128px;
                line-height: 128px;
                color: var(--theme-strong1-2);
                text-align: center;
                background-color: var(--theme-3-10);
                border-radius: calc(20px * var(--theme-border-radius));
            }

            &>.left-brace {
                left: 0;
                top: 0;
                transform: translate(-40%, -80%);
            }

            &>.right-brace {
                right: 0;
                bottom: 0;
                transform: translate(60%, 80%);
                z-index: -1;
            }

            &>.json-struct {
                font-size: 1.2em;
            }
        }
    }

}
</style>