<template>
  <header class="header">
    <div id="titleGroup">
      <h1 id="title">{{ props.title }}</h1>
    </div>
    <themesChoice/>
    <userBox :jump="props.jump" :to-login="props.toLogin"/>
    <mynav/>
  </header>
</template>
<script setup>
import userBox from "./userBox.vue"
import themesChoice from "./themesChoice.vue";
import mynav from "./nav.vue"
let props=defineProps({
  title:{
    type:String,
    default:"宽宽2007",
    required:true
  },jump:{
    type:String,
    default:"",
    required:false
  },toLogin:{
    type:Boolean,
    default:false,
    required:false
  }
})
</script>
<style scoped>
@keyframes  headerChane{
    from{
        opacity: 0;
    }to{
        opacity: 1;
    }
}
header{
    animation-name: headerChane;
    animation-duration: 1s;
    z-index: 2;
    position: fixed;
    top: 0;
    height: 60px;
    background-color: var(--theme-1-3);
    backdrop-filter: blur(calc(5px * var(--theme-backdrop-blur)));
    width: 100%;
    left: 50%;
    transform: translate(-50%, 0);
}
#titleGroup{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
#title{
    color: var(--theme-strong1);
    white-space: nowrap;
}
#linkGroup{
    animation-name: linkGroupChane;
    animation-duration: 1s;
    position: absolute;
    left: 85%;
    top: 50%;
    transform: translate(-50%, -50%);
    color:#c9c9ff
}
#toDocsMainPage,#toMainPage,#toContactInformation{
    white-space: nowrap;
    margin-top:5px;
    margin-bottom:5px;
    position: relative;
    background-color: #ff4e4e;
    height: 20px;
    border-radius: 10px;
    width: 80px;
}
.mainLink{
    text-align: center;
    width: 80px;
    line-height: 20px;
    position: absolute;
    color:#c9c9ff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>