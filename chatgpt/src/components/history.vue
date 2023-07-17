<template>
    <div class="message-box" v-show="show" :class="{
        right: props.right,
        normal: !(props.right)
    }">

        <div class="message">
            <p class="info">{{ `${data.user}` }} <img v-if="props.data.statue===0" class="loading" src="../../../src/common/image/loading.gif"></p>
            <contextMenu @choice="uploadChoice" :data="contextMenuData">
                <markdownShower :class="{
                    empty: !data.message
                }" class="content" :content="data.message || '正在思考...'" ref="messageShower" :header-level-start="2" />
            </contextMenu>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { getRefWithStorage, copyText } from "../../../src/common/script/normal"
import { showMessage } from "../../../src/common/script/infomations"
import contextMenu from "../../../src/common/components/contextMenu.vue"
import markdownShower from "../../../src/common/components/markdownShower.vue"

let emit=defineEmits(["recall"])
let show=ref(true)
let messageShower = ref()
function uploadChoice(event) {
    if (event === "copy-markdown") {
        copyText(props.data.message)
        showMessage("复制成功")
    }
    else if (event === "copy-html") {
        copyText(messageShower.value.makeHtml(props.data.message))
        showMessage("复制成功")
    }
    else if (event === "delete") {
        show.value=false
    }else if (event === "recall") {
        emit("recall")
    }
}
let username = getRefWithStorage("username", ref, sessionStorage, "", false)
let userrights = getRefWithStorage("userrights", ref, sessionStorage, "", false)
let contextMenuData = computed(() => {
    let nowData = {
        title: '消息',
        menu: [
            {
                title: '复制',
                sub: {
                    title: false,
                    menu: [
                        {
                            title: 'MarkDown',
                            event: 'copy-markdown'
                        },
                        {
                            title: 'HTML',
                            event: 'copy-html'
                        }
                    ]
                },
            },
            {
                title: '删除消息',
                event: 'delete'
            }
        ]

    }
    return nowData
})
let props = defineProps({
    data: {
        type: Object,
        default: {},
        required: true
    }, right: {
        type: Boolean,
        default: false,
        required: false
    }
})
</script>
<style scoped lang="scss">
.loading{
    width: 20px;
    position: absolute;
    padding-left: 10px;
}
.message-box {
    position: relative;

    &.normal {
        &>.message {
            padding-bottom: 20px;

            &>.info {
                font-size: 0.8em;
                margin: 0;
                padding-left: 10px;
            }

            & .content {
                &.empty{
                    color: var(--theme-disabled-font);
                }
                background-color: var(--theme-3-2);

                width: fit-content;
                padding: 10px;
                margin: 0;

                &:deep(p) {
                    margin: 0;
                }

                &::before {
                    content: "";
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    top: 0;
                    left: -12px;
                    background: radial-gradient(circle at 0 100%,
                            transparent 12px, var(--theme-3-2) 12px) top right;
                }

                position: relative;
                min-width: 50px;
                max-width: 80%;
                margin-left: 20px;
                border-radius: 0 calc(10px * var(--theme-border-radius)) calc(10px * var(--theme-border-radius)) calc(10px * var(--theme-border-radius));
                margin-top: 10px;
                transition: 0.1s;
            }

            // overflow: auto;
        }
    }

    &.right {
        &>.message {
            padding-bottom: 20px;

            &>.info {
                font-size: 0.8em;
                margin: 0;
                padding-right: 10px;
                text-align: right;
            }

            & .content {
                background-color: var(--theme-1-5);
                float: right;
                width: fit-content;
                padding: 10px;
                margin: 0;

                &:deep(p) {
                    margin: 0;
                }

                &::before {
                    content: "";
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    top: 0;
                    left: 100%;
                    background: radial-gradient(circle at 100% 100%,
                            transparent 12px, var(--theme-1-5) 12px) top right;
                }

                position: relative;
                min-width: 50px;
                max-width: 80%;
                margin-right: 20px;
                border-radius: calc(10px * var(--theme-border-radius)) 0 calc(10px * var(--theme-border-radius)) calc(10px * var(--theme-border-radius));
                margin-top: 10px;
                transition: 0.1s;
            }

            overflow: auto;
        }
    }
}

.recalled {
    text-align: center;
    font-size: 1.1em;
    margin: 10px;
    color: var(--theme-disabled-font);
}
</style>