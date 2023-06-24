<template>
    <div class="watterfall" ref="watterfall">
        <slot :valueList="valueList"></slot>
    </div>
    <iframe class="size-tester" ref="sizeTester"></iframe>
</template>
<script setup>
import { ref, onMounted } from "vue"
import {debounce} from "../script/normal"
let props = defineProps({
    valueList: {
        type: Array,
        default: [],
        required: true
    },
    eleWidth: {
        type: Number,
        default: 0,
        required: true
    },
    rowGap: {
        type: Number,
        default: 10,
        required: false
    },
    columnGap: {
        type: Number,
        default: 10,
        required: false
    },
    debounceDelay: {
        type: Number,
        default: 300,
        required: false
    }
})
let debounceRefresh=debounce(refresh,props.debounceDelay)
onMounted(() => {
    observer.observe(watterfall.value, {
        childList: true,
        subtree: true,
    });
    sizeTester.value.contentWindow.addEventListener('resize', () => {
        debounceRefresh()
    }, false)
})
let observer = new MutationObserver(debounceRefresh);
let watterfall = ref(null)
let sizeTester = ref(null)
function refresh() {
    if (watterfall.value === null) {
        return
    }
    const ele = watterfall.value
    let eleList = ele.children
    if (eleList.length ===0){
        return
    }
    const width = ele.clientWidth
    const conlunNum = Math.min(eleList.length,Math.max(1, Math.floor(width / (props.eleWidth + props.columnGap))))
    if (conlunNum<=1){
        props.columnGap=0
    }
    const columnPosition = Array(conlunNum).fill(0)
    const paddingLeft=(width-conlunNum*props.eleWidth-(conlunNum-1)*props.columnGap)/2
    for (let i = 0; i < eleList.length; i++) {
        const now = eleList[i]
        now.style.width = `${props.eleWidth}px`

        let top = Infinity;
        let column = 0
        for (let j = 0; j < columnPosition.length; j++) {
            if (columnPosition[j] < top) {
                top = columnPosition[j]
                column = j
            }
        }
        now.style.top = `${top}px`
        now.style.left = `${paddingLeft+column * (props.eleWidth + props.columnGap)}px`
        columnPosition[column] += now.clientHeight + props.rowGap
    }
    ele.style.height=`${Math.max(...columnPosition)-props.rowGap}px`
}
</script>
<style scoped>
.watterfall {
    position: relative;
    max-width: 100%;
    transition: 0.3s;
}

.size-tester {
    width: 100%;
    height: 0px;
    border: none;
}

.watterfall:deep()>a {
    position: absolute;
    display: block;
}
</style>