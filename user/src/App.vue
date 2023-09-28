<template>
  <myheader title="用户设置" :toLogin="true" />
  <div class="main" v-if="finished">
    <div class="input-group">
      <importdate :reminder="['出生日期应在当前日期之前']"
      :tester="date => date > new Date() ? 1 : 0" style="z-index: 1;" class="input-ele" :value="info.birthdate" ref="dateInput" :disabled="!canEdit" @update:date="info.birthdate = $event"/>
      <importsex class="input-ele" :value="info.sex" :disabled="!canEdit" @update:value="info.sex = $event"/>
      <importbutton :value="canEdit?'保存':'修改'" @click="changeCanEdit"/>
    </div>
    <div class="input-group">
      <checkBox @change="changeSendType($event)" :content="_sendBrowerInfo" :title="`发送浏览器数据`"/>
    </div>
    <div class="input-group">
      <importbutton value="修改密码" @click="jump('/user/changepassword/')"/>
      <importbutton value="修改邮箱" @click="jump('/user/changeemail/')"/>
      <importbutton :disabled="!supportPasskeys" value="创建PassKeys" @click="createKeys"/>
    </div>
    <div class="input-group">
      <importbutton class="logout" value="退出登录" @click="logout"/>
    </div>
  </div>
</template>
<script setup>
import {jump} from "../../src/common/script/normal"
import myheader from "../../src/common/components/header.vue";
import importdate from "../../src/common/components/input/date.vue"
import importsex from "../../src/common/components/input/sex.vue"
import importbutton from "../../src/common/components/input/button.vue"
import { ref, reactive,computed } from "vue";
import { getInfo,changeInfo,logout } from "../../src/common/script/connection";
import { checkSupport,createKeys } from "../../src/common/script/webauthn";
import { showMessage } from "../../src/common/script/infomations";
import { getRefWithStorage } from "../../src/common/script/normal";
import checkBox from "../../src/common/components/input/checkBox.vue"

let supportPasskeys=ref(false)

const _sendBrowerInfo=getRefWithStorage("sendBrowerInfo",ref,localStorage,"123",true)

const sendBrowerInfo=computed({
  get(){
    return _sendBrowerInfo.value
  },set(value){
    
  }
})
function changeSendType(value){
  console.log(value)
  if (typeof value!=="boolean"){
      throw new Error("sendBrowerInfo must be boolean")
    }
    localStorage.setItem("sendBrowerInfo",value)
}
checkSupport().then(
  ()=>{
    supportPasskeys.value=true
  }
)
let finished = ref(false)
let info = reactive({})
let canEdit = ref(false)
let dateInput=ref()
const useDate=["sex","birthdate"]
let lastValue={}
getInfo().then((result) => {
  for (let i of useDate) {
    info[i] = result[i]
  }
  finished.value = true
})
function changeCanEdit(){
  if (canEdit.value) {
    if (dateInput.value.wrong!=0){
      showMessage(dateInput.value.reminder[dateInput.value.wrong-1])
      return
    }
    canEdit.value=!canEdit.value
    for (let i of useDate) {
      if (lastValue[i]!=info[i]){
        console.log(i);
        changeInfo(info.birthdate,info.sex)
        return
      }
    }
  }else{
    for (let i of useDate) {
      lastValue[i]=info[i]
    }
    canEdit.value=!canEdit.value
  }
}
</script>
<style scoped lang="scss">
.main {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50%;
  min-width: 300px;
  transform: translate(-50%, -50%);
}
.input-group{
  margin-bottom: 50px;
  &>*{
    margin-bottom: 20px;
  }
}
.logout{
  background-color: red;
}
</style>