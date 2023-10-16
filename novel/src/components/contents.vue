<template>
    <div class="contents" :style="{
        '--deepth': props.deepth
    }">
        <linkLikeButton class="title" @click="foldControl" :class="{
            'on-fold':onFold
        }"><span class="demo-icon">{{ iconMap.folderOpen }}</span>{{ props.title }}<span class="demo-icon fold-button">{{ iconMap.angleCircledDown }}</span></linkLikeButton>
        <ul ref="subList" class="sub-list" :class="{
            'on-fold':onFold
        }">
            <li class="contents-item" v-for="item,name in props.contents">
                <linkLikeButton @click="jumpFile(name)" class="novel-title" v-if="typeof item==='string'"><span class="demo-icon">{{ iconMap.docInv }}</span>{{ item }}</linkLikeButton>
                <contentsShower :parents="nowParent" v-else :deepth="props.deepth+1" :title="name" :contents="item"/>
            </li>
        </ul>
    </div>
</template>
<script setup>
import contentsShower from "./contents.vue"
import iconMap from "../../../src/data/demo-icon";
import linkLikeButton from "../../../src/common/components/input/linkLikeButton.vue";
import { onMounted, ref } from "vue";
import { jump } from "../../../src/common/script/normal";

const props=defineProps({
    title:{
        type:String,
        default:"",
        required:true
    },
    contents:{
        type:Object,
        default:{},
        required:true
    },deepth:{
        type:Number,
        default:0,
        required:false
    },onFold:{
        type:Boolean,
        default:true,
        required:false
    },parents:{
        type:Array,
        default:[],
        required:false
    }
})
let onFold=ref(props.onFold)
let subList=ref(document.createElement("ul"))
function jumpFile(name){
    let li=nowParent.KKCopyTo()
    li.push(name)
    jump(`/novel/files/?path=${encodeURIComponent(JSON.stringify(li))}`)
}
function controlHeight(){
    if(!onFold.value){
        subList.value.style.height="auto"
        let heigth=subList.value.scrollHeight
        subList.value.style.height=0
        setTimeout(()=>{
            subList.value.style.height=`${heigth}px`
        })
        setTimeout(()=>{
            subList.value.style.height="auto"
        },300)
    }else{
        let heigth=subList.value.scrollHeight
        subList.value.style.height=`${heigth}px`
        setTimeout(()=>{
            subList.value.style.height=0
        })
        
    }
}
function foldControl(){
    onFold.value=!onFold.value
    controlHeight()
}
const nowParent=props.parents.KKCopyTo()
nowParent.push(props.title)
onMounted(controlHeight)
</script>
<style scoped lang="scss">
.contents{
    
    &>.title{
        font-size: calc(0.6em * max(1,calc(4 - var(--deepth))));
        padding: 0;
        margin: 0;
        margin-bottom: 20px;
        position: relative;
        border-width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &::after{
            content: "";
            position: absolute;
            width: 0%;
            height: 2px;
            bottom: -1px;
            right: 0px;
            transition: 0.3s;
            background-color: var(--theme-strong1);
        }
        &:hover::after,&:focus::after{
            left: 0px;
            width: 100%;
        }
        &:hover{
            color: var(--font-color);
        }
        &>.fold-button{
            font-size: 0.6em;
            margin-left: 20px;
            display: block;
            transition: 0.3s;
        }
        &.on-fold>.fold-button{
            transform: rotate(-90deg);
        }
    }
    &>.sub-list{
        list-style: none;
        margin: 0;
        padding-left: 40px;
        transition: 0.3s;
        overflow: hidden;
        &>.contents-item{
            &>.novel-title{
                display: block;
                margin: 5px;
                margin-left: 0;
            }
        }
    }
}
</style>