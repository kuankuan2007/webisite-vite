<template>
    <div :class="{
        mobie:mobile
    }">
        <a @click="onclick" :href="props.href">
            <p>{{ props.content }}
                <div class="qrcode">
                    <p>{{ props.tips }}</p>
                    <img :src="qr">
                </div>
            </p>
        </a>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { jump } from "../../../src/common/script/normal";
import { askChoice,showImages } from "../../../src/common/script/infomations"
import { getQRCode, isMobie } from "../../../src/common/script/normal"
let props = defineProps({
    href: {
        type: String,
        required: true
    }, content: {
        typr: String,
        required: true
    }, tips: {
        type: String,
        required: false,
        default: ""
    }, qrcode: {
        type: String,
        required: false
    }
})

/**
 * Handles the onclick event.
 *
 * @param {MouseEvent} e - The event object.
 * @return {void} This function does not return a value.
 */
function onclick(e) {
    if (mobile) {
        e.preventDefault()
        askChoice("请选择链接打开方式", "询问", true, {
            "跳转": "jump",
            "二维码展示": "qrcode"
        }).then(result => {
            if (result==="jump"){
                jump(props.href,true)
            }else{
                showImages([qr.value])
            }
        }, reason => { })
    }
}
let mobile = isMobie()
let qr = ref(null)

if (props.qrcode) {
    qr.value = props.qrcode
} else {
    getQRCode(props.href).then((dataURL) => {
        qr.value = dataURL
    })
}

</script>
<style scoped lang="scss">
a {
    color: var(--font-color);
    cursor: default;


    text-decoration: none;
    cursor: pointer;
    color: var(--theme-strong1);

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
    
    .mobie &{
        display: none;
    }

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