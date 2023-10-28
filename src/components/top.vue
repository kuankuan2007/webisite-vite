<template>
    <div class="top-ele">
        <div class="content">
            <h1>宽宽的小天地</h1>
            <p class="signature">如果说，青春如烟，仅此一场，放肆冲动，我会将什么故事写在过去散在风中。即便此刻两手空空，即便隐隐作痛，要记得时而抬起头仰望星空，拥抱彩虹。</p>
        </div>
        <div class="bg">
            <div :style="{
                '--x':data.x,
                '--y':data.y,
                '--size':data.size,
                '--color':data.color,
                '--speed':data.speed
            }" class="color-block" v-for="data,index in colorBolcks.data" :key="index"></div>
        </div>
    </div>
</template>
<script setup>
import { RandomColorboxList} from "../blockList"
const props=defineProps({
    simplePageHeight:{
        type:Number,
        required:true,
    }
})
const colorBolcks= new RandomColorboxList(props, "simplePageHeight")
</script>
<style scoped lang="scss">
.top-ele{
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    &>div.content{
        max-width: 60%;
        &>h1{
            font-size: 3em;
            text-align: center;
        }
        &>.signature{
            text-align: center;
            font-size: 1.3em;
        }
    }
    &>.bg{
        position: absolute;
        inset: 0;
        z-index: -1;
        &>.color-block{
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
}
</style>