<template>
  <myheader title="用户设置" :toLogin="true" :need-info="true"/>
  <div class="main">
    <h1 class="title">修改密码</h1>
    <importtext class="input-ele" v-if="state!=1" :value="userinfo.name" :disabled="true" title="用户"/>
    <importtext class="input-ele" v-if="state==1" :value="userinfo.email" :disabled="true" title="邮箱"/>
    <importimage class="input-ele" v-if="state==0" ref="imagecode"/>
    <importemail class="input-ele" v-if="state==1" ref="emailcode"/>
    <importtext v-if="state == 2" ref="passwordInput" class="input-ele" type="password" title="新密码" :value="password"
      @update:value="password = $event.target.value" :reminder="['密码太短', '密码太长', '密码需要包含数字', '密码需要包含字母', '密码不能包含特殊字符']"
      :tester="s => {
        passwordInput2.refreshReminder(password2, s)
        if (s.length < 6) return 1
        else if (s.length > 32) return 2
        else if (!/^(?=.*[0-9]).{6,32}$/.test(s)) return 3
        else if (!/^(?=.*[a-zA-Z]).{6,32}$/.test(s)) return 4
        else if (/^[a-zA-Z0-9]{6,32}$/.test(s)) return 0
        else return 5
      }" />
    <importtext v-if="state == 2" ref="passwordInput2" class="input-ele" type="password" title="确认密码" :value="password2"
      @update:value="password2 = $event.target.value" :reminder="['密码不匹配']"
      :tester="(s, pa = password) => s === pa ? 0 : 1" />
    <importbutton class="input-ele" :value="state===2?'完成':'下一步'" @click="next()"/>
  </div>
</template>
<script setup>
import myheader from "../../../src/common/components/header.vue";
import importimage from "../../../src/common/components/input/imageCode.vue"
import importemail from "../../../src/common/components/input/emailCode.vue"
import importbutton from "../../../src/common/components/input/button.vue"
import importtext from "../../../src/common/components/input/text.vue"
import { ref, reactive } from "vue";
import { changePassword } from "../../../src/common/script/connection";
import ALL from "../../../src/common/script/all";
import { showMessage } from "../../../src/common/script/infomations";
import {getRefWithStorage} from "../../../src/common/script/normal"
let imagecode=ref()
let emailcode=ref()
let passwordInput2=ref()
let passwordInput=ref()
let password=ref("")
let password2=ref("")
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
  }else{
    for (let i of form) {
      if (i.value.wrong == -1) {
        showMessage(`请填写${i.value.title}字段`)
        return
      } else if (i.value.wrong != 0) {
        console.log(i.value.reminder, i.value.wrong - 1)
        showMessage(i.value.reminder[i.value.wrong - 1])
        return
      }
    }
    changePassword(password.value).then(()=>{
      showMessage('密码修改成功').then(()=>{
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