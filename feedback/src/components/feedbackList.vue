<template>
    <div class="list">
        <a class="add" href="/feedback/new/"><span class="demo-icon">&#xe80e</span>新建</a>
        <waterfallFlow :eleWidth="300" :value-list="data" v-slot="{ data }">
            <a :href="`/feedback/data/?id=${data.id}`" class="item">
                <div class="item-padding">
                    <h2>{{ data.title }}</h2>
                    <p class="time">{{ data.time }}</p>
                    <p class="user">{{ data.user }}</p>
                    <p :class="['statue', data.statue]">{{ data.statue }}</p>
                </div>
            </a>
        </waterfallFlow>
        <p :class="{ disabled: !canLoadMore, more: true }" @click="getNew">{{ moreButtonText }}</p>
    </div>
</template>
<script setup>
import { ref, reactive, watchEffect } from 'vue'
import { getFeadbackList } from "../../../src/common/script/connection"
import waterfallFlow from "../../../src/common/components/waterfallFlow.vue"
let data = reactive([])
let canLoadMore = ref(true)
let moreButtonText = ref("")
function getNew() {
    canLoadMore.value = false
    moreButtonText.value = "加载中"
    let from = data.length
    let to = from + 40
    getFeadbackList(from, to).then((retsult) => {
        if (canLoadMore.value) {
            return
        }
        if (retsult === null) {
            showMessage("无法获取更多的反馈")
            canLoadMore.value = false
            return
        }
        if (retsult.length < to - from + 1) {
            canLoadMore.value = false
            moreButtonText.value = "暂时没有更多啦"
        } else {
            canLoadMore.value = true
            moreButtonText.value = "更多"
        }
        from += retsult.length
        to += retsult.length
        for (var i = 0; i < retsult.length; i++) {
            data.push(retsult[i])
        }
    })
}
getNew()
</script>
<style scoped lang="scss">
:deep(.item) {
    background: var(--theme-1-1);
    border-radius: calc(20px * var(--theme-border-radius));
    transition: 0.3s;
    text-decoration: none;
    color: var(--font-color);
    border-width: 0px;
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
    text-align: left;

    &:hover {
        background: var(--theme-3-2);
        transform: translate(0, -3px);
    }

    & h2 {
        font-size: 30px;
        margin: 0;
        margin-bottom: 5px;
        word-break: break-all;
    }

    & .time {
        font-size: 12px;
        text-overflow: ellipsis;
        margin: 0;
        margin-left: 10px;
    }

    & .user {
        font-size: 20px;
        text-overflow: ellipsis;
        margin: 0;
    }

    & .statue {
        transition: 0.3s;
        position: absolute;
        top: 10px;
        right: 10px;
        margin: 0;
        font-size: 16px;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 20px;
        border-radius: calc(10px * var(--theme-border-radius));
    }

    & .statue.Waiting {
        background-color: var(--theme-2-10);
    }

    & .statue.A1 {
        background: var(--theme-2-3);
    }

    & .statue.A2 {
        background: var(--theme-2-2);
    }

    & .statue.A3 {
        background: var(--theme-2-1);
    }

    & .statue.B1 {
        background: var(--theme-3-3);
    }

    & .statue.B2 {
        background: var(--theme-3-2);
    }

    & .statue.B3 {
        background: var(--theme-3-1);
    }

    & .statue.Finish {
        background: var(--theme-3-10);
    }
}

.list {
    width: 100%;
    height: calc(100% - 80px);
    position: fixed;
    padding-top: 80px;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: 0;
    text-align: center;
}

.list::-webkit-scrollbar {
    width: 0px;
}

.add {
    color: var(--theme-strong1);
    font-weight: bold;
    position: relative;
    font-size: 48px;
    margin: 0;
    transition: 0.3s;
    cursor: pointer;
    text-decoration: none;
}

.add:hover {
    color: var(--theme-strong2);
}

.item-padding {
    padding: 20px;
    padding-top: 30px;
    border-radius: calc(20px * var(--theme-border-radius));
    border-color: transparent;
    border-width: 1px;
    border-style: groove;
    transition: 0.3s;
}

.item-padding:hover {
    border-color: var(--theme-strong1);

}

.more {
    transition: 0.3s;
    position: relative;
    display: inline;
    outline: none;
    border: none;
    background: var(--theme-strong1);
    color: var(--font-color);
    font-size: 30px;
    line-height: 60px;
    padding: 10px;
    border-radius: calc(30px * var(--theme-border-radius));
    padding-left: 30px;
    padding-right: 30px;
    cursor: pointer;
}

.more:hover {
    background: var(--theme-strong2);
    transform: translate(-50%, 0) scale(1.2);
}

.more.disabled {
    background: var(--theme-disabled-block);
    color: var(--theme-disabled-font);
    pointer-events: none;
}

.watterfall {
    transition: 0.3s;
}
</style>