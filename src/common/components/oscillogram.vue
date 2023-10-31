<template>
    <blend>
        <canvas ref="canvas" class="canvas"></canvas>
    </blend>
</template>
<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { nowdata } from '../script/themes';
import blend from './blend.vue';
/**@type {import("vue").Ref<HTMLCanvasElement>} */
const canvas = ref()
const inited = ref(false)
function resize() {
    canvas.value.width = canvas.value.parentElement.clientWidth
    canvas.value.height = canvas.value.parentElement.clientHeight
    console.log(nowdata)
    themeRefresh(nowdata.light)
}
defineExpose({
    resize
})
let ctx, analyser, dataArray;
onMounted(() => {
    ctx = canvas.value.getContext("2d")
    resize()
    watchEffect(() => {
        if (!props.audio) {
            return
        }
        props.audio.addEventListener("play", () => {
            themeRefresh(nowdata.light)
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
function themeRefresh(light) {
    const gradient = ctx.createLinearGradient(canvas.value.width / 2, 0, canvas.value.width / 2, canvas.value.height)
    if (light === "dark") {
        gradient.addColorStop(0, "rgb(13, 0, 95)")
        gradient.addColorStop(1, "rgb(14, 61, 0)")
    } else {
        gradient.addColorStop(0, "rgb(255, 146, 146)")
        gradient.addColorStop(1, "rgb(148, 146, 255)")
    }
    ctx.fillStyle = gradient
}
addEventListener("themeRefresh", (e) => {
    themeRefresh(e.value.light)
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
        const h = dataArray[i] / 255 * (height - 5) + 5
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
</style>