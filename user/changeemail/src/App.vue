<template>
  <myheader title="用户设置" :toLogin="true" :need-info="true"/>
  <div class="main">
    <h1 class="title">修改邮箱</h1>
    <importtext class="input-ele" v-if="state!=1" :value="userinfo.name" :disabled="true" title="用户"/>
    <importtext class="input-ele" v-if="state==1" :value="userinfo.email" :disabled="true" title="邮箱"/>
    <importimage class="input-ele" v-if="state==0" ref="imagecode"/>
    <importemail class="input-ele" v-if="state==1" ref="emailcode"/>
    <importtext v-if="state == 2" ref="emailInput" class="input-ele" :class="{ disabled: state > 2 }" type="email"
      title="新邮箱" :value="email" @update:value="email = $event.target.value" :reminder="['邮箱格式不正确']"
      :tester="s => /^[\w.%+-]+@(?:[^/\\\.&\?\#]+\.)+[^/\\\.&\?\#]+$/.test(s) ? 0 : 1" :disabled="state > 2" />
    <importemail class="input-ele" v-if="state==3" ref="newEmailcode" :use-new-email="true"/>
    <importbutton class="input-ele" :value="state===3?'完成':'下一步'" @click="next()"/>
  </div>
</template>
<script setup>
import myheader from "../../../src/common/components/header.vue";
import importimage from "../../../src/common/components/input/imageCode.vue"
import importemail from "../../../src/common/components/input/emailCode.vue"
import importbutton from "../../../src/common/components/input/button.vue"
import importtext from "../../../src/common/components/input/text.vue"
import { ref } from "vue";
import { changePassword , getChangeEmailCode } from "../../../src/common/script/connection";
import ALL from "../../../src/common/script/all";
import { showMessage } from "../../../src/common/script/infomations";
import {getRefWithStorage} from "../../../src/common/script/normal"
let imagecode=ref()
let email=ref("")
let emailcode=ref()
let newEmailcode=ref()
let passwordInput2=ref()
let passwordInput=ref()
let userinfo=getRefWithStorage("userinfo",ref,sessionStorage,{},true)
let state = ref(0);
let form = [
  passwordInput,
  passwordInput2,
]
function next(){
  if (state.value===0){
    imagecode.value.check().then(()=>{
      state.value=1;
    })
  }if (state.value===1){
    emailcode.value.check().then(()=>{
      state.value=2;
    })
  }if (state.value===2){
    getChangeEmailCode(email.value).then(()=>{
      state.value=3;
    })
  }if (state.value===3){
    newEmailcode.value.check().then(()=>{
      showMessage("邮箱已更改",()=>{
        location.href="/user/"
      })
    })
  }
}
</script>
<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 3em;
  color: var(--theme-strong1);
  cursor: default;
}

.main {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50%;
  min-width: 300px;
  transform: translate(-50%, -50%);
}
.input-ele{
  margin-bottom: 20px;
}
.logout{
  background-color: red;
}
</style>