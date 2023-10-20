<template>
    <svg style="display:none;">
        <defs>
            <filter id="blendFilter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 40 -20
                    ">
                </feColorMatrix>
            </filter>
        </defs>
    </svg>
    <canvas ref="canvas" class="canvas"></canvas>
</template>
<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { nowdata } from '../script/themes';
/**@type {import("vue").Ref<HTMLCanvasElement>} */
const canvas = ref()
const inited = ref(false)
function resize(){
    canvas.value.width = canvas.value.parentElement.clientWidth
    canvas.value.height = canvas.value.parentElement.clientHeight
    console.log(nowdata)
    ctx.fillStyle = nowdata.light === 'dark' ? "rgb(96, 89, 0)" : "rgb(59, 137, 255)"
}
defineExpose({
    resize
})
let ctx, analyser, dataArray;
onMounted(() => {
    ctx = canvas.value.getContext("2d")
    ctx.fillStyle = nowdata.light === 'dark' ? "rgb(96, 89, 0)" : "rgb(59, 137, 255)"
    resize()
    watchEffect(() => {
        if (!props.audio) {
            return
        }
        props.audio.addEventListener("play", () => {
            if (inited.value) {
                return
            }
            const audioCtx = new AudioContext()
            analyser = audioCtx.createAnalyser()
            const source = audioCtx.createMediaElementSource(props.audio)

            analyser.fftSize = props.fftSize
            dataArray = new Uint8Array(analyser.frequencyBinCount)
            source.connect(analyser)
            analyser.connect(audioCtx.destination)
            inited.value = true
            draw()
        })
    })
})
const props = defineProps({
    audio: {
        type: HTMLAudioElement,
        required: true
    }, fftSize: {
        type: Number,
        default: 512,
        required: false
    }, scale: {
        type: Number,
        default: 2,
        required: false
    }, textStatue: {
        type: Object,
        required: true
    }
})
addEventListener("themeRefresh", (e) => {
    ctx.fillStyle = e.value.light === 'dark' ? "rgb(96, 89, 0)" : "rgb(59, 137, 255)"
})

function draw() {
    requestAnimationFrame(draw)
    if (!inited.value) {
        return
    }

    const { width, height } = canvas.value
    ctx.clearRect(0, 0, width, height)
    analyser.getByteFrequencyData(dataArray)

    const length = dataArray.length / props.scale
    for (let i = 0; i < length; i++) {
        const h = dataArray[i] / 255 * (height-5) + 5
        const w = width / length / 2
        ctx.fillRect(
            (length - i - 1) * w,
            height - h,
            w,
            h
        )
        ctx.fillRect(
            (length + i) * w,
            height - h,
            w,
            h
        )

    }
}
</script>
<style scoped lang="scss">
canvas{
    filter: url("#blendFilter");
}
</style>