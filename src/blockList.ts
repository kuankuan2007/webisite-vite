import { Ref, reactive, UnwrapNestedRefs, watchEffect } from "vue";
import { debounce, getRandomFloat, getRandomInt, windowSize } from "./common/script/normal";
import { nowdata as theme } from "./common/script/themes";

type colorBlock = {
    color: string,
    x: number,
    y: number,
    size: number,
    speed: number
}

function getRandomColor(light: 'light' | 'dark') {
    console.log(light)
    if (light === 'light') {
        return `rgb(${getRandomInt(64, 160)},${getRandomInt(128, 192)},${getRandomInt(128, 192)})`
    } else {
        return `rgb(${getRandomInt(96, 196)},${getRandomInt(64, 128)},${getRandomInt(64, 128)})`
    }
}


export class RandomColorboxList {
    data: UnwrapNestedRefs<Array<colorBlock>>
    simplePageSize: number
    lastWindowSize: {
        minSize:number,
        meanSize:number,
        maxSize:number,
        width:number,
        simplePageSize:number
    }
    refreshLastWindowSize(){
        this.lastWindowSize.minSize=windowSize.minSize
        this.lastWindowSize.meanSize=windowSize.meanSize
        this.lastWindowSize.maxSize=windowSize.maxSize
        this.lastWindowSize.width=windowSize.width
        this.lastWindowSize.simplePageSize = this.simplePageSize
    }
    constructor(simplePageSizeFrom:object,key:string) {
        let deR=debounce(this.refreshSize.bind(this), 300)
        watchEffect(function() {
            windowSize.width
            this.simplePageSize = simplePageSizeFrom[key]
            deR()
        }.bind(this))
        this.lastWindowSize = {
            minSize: windowSize.minSize,
            meanSize: windowSize.meanSize,
            maxSize: windowSize.maxSize,
            width: windowSize.width,
            simplePageSize: this.simplePageSize
        }
        this.data=reactive(new Array(this.targetLength).fill(0).map(this.getNewBlock.bind(this)));
        this.refreshLastWindowSize()
        window.addEventListener("themeRefresh",(e)=>{
            this.refreshColor()
        })
    }
    getNewBlock():colorBlock{
        return {
            color:getRandomColor(theme.light),
            x:getRandomInt(0,windowSize.width),
            y:getRandomInt(0,this.simplePageSize),
            size: getRandomInt(windowSize.meanSize / 70, windowSize.meanSize /7),
            speed:getRandomFloat(0.5,2)
        }
    }
    refreshColor() {
        for (const i of this.data) {
            i.color = getRandomColor(theme.light)
        }
    }
    get targetLength(){
        return Math.floor(windowSize.meanSize / 30)
    }
    refreshSize(){
        if (this.data.length > this.targetLength) {
            this.data.splice(this.targetLength, this.data.length - this.targetLength)
        }
        else if (this.data.length < this.targetLength) {
            this.data.concat(new Array(this.targetLength - this.data.length).fill(0).map(this.getNewBlock.bind(this)))
        }
        console.log(this.data.length)
        console.log(windowSize.width,this.lastWindowSize.width,this.simplePageSize, this.lastWindowSize.simplePageSize)
        for (const i of this.data) {
            i.size *= windowSize.meanSize / this.lastWindowSize.meanSize
            i.x*=windowSize.width/this.lastWindowSize.width
            i.y *= this.simplePageSize / this.lastWindowSize.simplePageSize
        }
        this.refreshLastWindowSize()
    }
}