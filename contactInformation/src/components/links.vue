<template>
    <div>
        <a :class="{
            'can-jump':canJump
        }" :href=" canJump ? props.href : null ">
            <p>{{ props.content }}
                <div v-if=" !canJump " class="qrcode">
                    <p>{{ props.tips }}</p>
                    <img :src=" qr ">
                </div>
            </p>
        </a>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { getQRCode, isMobie } from "../../../src/common/script/normal"
let props = defineProps({
    href: {
        type: String,
        required: true
    }, content: {
        typr: String,
        required: true
    }, pcjump: {
        type: Boolean,
        required: false,
        default: false
    }, mobilejump: {
        type: Boolean,
        required: false,
        default: true,
    }, tips: {
        type: String,
        required: false,
        default: ""
    }, qrcode: {
        type: String,
        required: false
    }
})
let mobile = isMobie()
let qr = ref(null)
let canJump = mobile ? props.mobilejump : props.pcjump
if (!canJump) {
    if (props.qrcode) {
        qr.value = props.qrcode
    } else {
        getQRCode(props.href).then((dataURL) => {
            qr.value = dataURL
        })
    }

}
</script>
<style scoped lang="scss">

a {
    color: var(--font-color);
    cursor: default;
    &.can-jump {
        text-decoration: none;
        cursor: pointer;
        color: var(--theme-strong1);
    }
}

div.qrcode {
    position: absolute;
    top: 100%;
    left: 50%;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    transform: translate(-50%, -50%);
    transition: 0.3s;
    background-color: #fff;
    z-index: 1;
    border-radius: calc(10px * var(--theme-border-radius));

    p:hover>& {
        transform: translate(-50%, 0%);
        opacity: 1;
    }

    &>img {
        border-radius: calc(10px * var(--theme-border-radius));
    }

    &>p {
        margin: 0;
        margin-top: 5px;
        margin-bottom: -5px;
        text-align: center;
        color: black;
    }
}

p {
    position: relative;
}
</style>