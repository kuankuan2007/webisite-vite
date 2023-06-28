<template>
  <myheader title="登录" jump="/user/"></myheader>
  <div class="main">
    <h1 class="title">重置密码</h1>
    <importtext ref="flagInput" class="input-box" type="text" title="用户名/邮箱" :value="flag"
      @update:value="flag = $event.target.value" v-if="state===0"/>
    <importtext class="input-box" type="text" title="用户名" :value="name"
      v-if="state===1" :disabled="true"/>
    <imageCode class="input-box" v-if="state===1" ref="imageCodeInput"/>
    <importtext class="input-box" type="email" title="邮箱" :value="email"
      v-if="state===2" :disabled="true"/>
    <emailCode class="input-box" v-if="state===2" ref="emailCodeInput"/>
    <importtext v-if="state == 3" ref="passwordInput" class="input-box" type="password" title="密码" :value="password"
      @update:value="password = $event.target.value" :reminder="['密码太短', '密码太长', '密码需要包含数字', '密码需要包含字母', '密码不能包含特殊字符']"
      :tester="s => {
        passwordInput2.refreshReminder(password2, s)
        if (s.length < 6) return 1
        else if (s.length > 32) return 2
        else if (!/^(?=.*[0-9]).{6,32}$/.test(s)) return 3
        else if (!/^(?=.*[a-zA-Z]).{6,32}$/.test(s)) return 4
        else if (/^[a-zA-Z0-9]{6,32}$/.test(s)) return 0
        else return 5
      }"/>
    <importtext v-if="state == 3" ref="passwordInput2" class="input-box" type="password" title="确认密码" :value="password2"
      :disabled="false" @update:value="password2 = $event.target.value" :reminder="['密码不匹配']"
      :tester="(s, pa = password) => s === pa ? 0 : 1" />
    <importbutton :value="state!=3?'下一步':'确认'" @click="submit" />
    <div class="bottom-button">
      <p><a :href="`/login/?from=${getQueryVariable('from','/')}`">登录</a></p>
      <p><a :href="`/signup/?from=${getQueryVariable('from','/')}`">注册</a></p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import myheader from "../../../src/common/components/header.vue"
import importtext from "../../../src/common/components/input/text.vue"
import imageCode from "../../../src/common/components/input/imageCode.vue"
import emailCode from "../../../src/common/components/input/emailCode.vue"
import importbutton from "../../../src/common/components/input/button.vue"
import { checkResetPassword,confirmResetPassword } from "../../../src/common/script/connection"
import { showMessage } from "../../../src/common/script/infomations";
import { getQueryVariable } from "../../../src/common/script/normal";
let flag = ref("")
let name = ref("")
let email = ref("")
let flagInput = ref(null)
let imageCodeInput = ref(null)
let emailCodeInput = ref(null)
let state = ref(0)
let password = ref("")
let password2 = ref("")
let passwordInput = ref(null)
let passwordInput2 = ref(null)
let form = [
  passwordInput,passwordInput2
]
function submit() {
  if (state.value===0){
    checkResetPassword(flag.value).then((retsult)=>{
      name.value=retsult.name
      email.value=retsult.email
      state.value=1
    },(err)=>{
      showMessage("用户不存在")
    })
  }else if (state.value == 1) {
    imageCodeInput.value.check().then(()=>{
      state.value = 2
    })
  }else if (state.value == 2) {
    emailCodeInput.value.check().then(()=>{
      state.value = 3
    })
  }else if (state.value == 3) {
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
    confirmResetPassword(flag.value,password.value)
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
  width: 60%;
  max-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input-box {
  margin-bottom: 20px;
}

.bottom-button {
  overflow: auto;
  padding: 20px;
  padding-top: 5px;

  &>p {
    margin: 0;
    cursor: pointer;
    transition: 0.3s;

    &>a {
      color: var(--theme-1-10);
      transition: 0.3s;
      text-decoration: none;
      &:hover {
        color: var(--theme-strong1);
      }
    }
  }

  &>p:first-child {
    float: left;
  }

  &>p:last-child {
    float: right;
  }
}</style>