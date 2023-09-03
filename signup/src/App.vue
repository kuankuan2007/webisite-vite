<template>
  <myheader title="注册" jump="/user/"></myheader>
  <div class="main">
    <h1 class="title">注册</h1>
    <importtext ref="usernameInput" class="input-box" :class="{ disabled: state != 0 }" type="text" title="用户名"
      :value="username" @update:value="username = $event.target.value" :reminder="['长度不小于2','长度不大于32','不能包含空白字符','不能包含@字符']"
      :tester="s => {
        if(s.length<2)return 1
        else if(s.length>32)return 2
        else if(/\s/.test(s))return 3
        else if(/@/.test(s))return 4
        return 0
      }" :disabled="state > 0" v-if="state == 0 || state == 1"/>
    <importtext v-if="state == 0 || state == 2" ref="emailInput" class="input-box" :class="{ disabled: state != 0 }" type="email"
      title="邮箱" :value="email" @update:value="email = $event.target.value" :reminder="['邮箱格式不正确']"
      :tester="s => /^[\w.%+-]+@(?:[^/\\\.&\?\#]+\.)+[^/\\\.&\?\#]+$/.test(s) ? 0 : 1" :disabled="state > 0" />
    <importtext v-if="state == 0" ref="passwordInput" class="input-box" type="password" title="密码" :value="password"
      @update:value="password = $event.target.value" :reminder="['密码太短', '密码太长', '密码需要包含数字', '密码需要包含字母', '密码不能包含特殊字符']"
      :tester="s => {
        passwordInput2.refreshReminder(password2, s)
        if (s.length < 6) return 1
        else if (s.length > 32) return 2
        else if (!/^(?=.*[0-9]).{6,32}$/.test(s)) return 3
        else if (!/^(?=.*[a-zA-Z]).{6,32}$/.test(s)) return 4
        else if (/^[a-zA-Z0-9]{6,32}$/.test(s)) return 0
        else return 5
      }" :disabled="state > 0" />
    <importtext v-if="state == 0" ref="passwordInput2" class="input-box" type="password" title="确认密码" :value="password2"
      :disabled="state > 0" @update:value="password2 = $event.target.value" :reminder="['密码不匹配']"
      :tester="(s, pa = password) => s === pa ? 0 : 1" />
    <importdate v-if="state == 0" ref="birthDateInput" @update:date="birthDate = $event" style="z-index:1"
      :value="birthDate" :disabled="state > 0" class="input-box" title="出生日期" :reminder="['出生日期应在当前日期之前']"
      :tester="date => date > new Date() ? 1 : 0" />
    <importsex v-if="state == 0" ref="sexInput" @update:value="sex = $event" style="z-index:0" :value="sex"
      class="input-box" title="性别" :disabled="state > 0" />
    <imageCode v-if="state == 1" class="input-box" ref="imageCodeInput"/>
    <emailCode v-if="state == 2" class="input-box" ref="emailCodeInput"/>
    <importbutton :value="state!=2?'下一步':'完成'" @click="submit" />
    <div class="bottom-button">
      <linkLikeButton @click="jumpToWithFrom('/login/reset/')">忘记密码</linkLikeButton>
      <linkLikeButton @click="jumpToWithFrom('/login/')">登录</linkLikeButton>
    </div>
  </div>
</template>
<script setup>
import { ref, shallowRef, reactive } from "vue";
import linkLikeButton from "../../src/common/components/input/linkLikeButton.vue"
import myheader from "../../src/common/components/header.vue"
import importtext from "../../src/common/components/input/text.vue"
import importsex from "../../src/common/components/input/sex.vue"
import importdate from "../../src/common/components/input/date.vue"
import importbutton from "../../src/common/components/input/button.vue"
import { checkSignUp,confirmSignUp } from "../../src/common/script/connection"
import { showMessage } from "../../src/common/script/infomations";
import imageCode from "../../src/common/components/input/imageCode.vue";
import emailCode from "../../src/common/components/input/emailCode.vue";
import {jumpToWithFrom} from "../../src/common/script/normal"
let username = ref("")
let password = ref("")
let password2 = ref("")
let emailInput = ref("")
let imageCodeInput = ref("")
let birthDate = shallowRef(new Date(1970, 0, 1))
let sex = ref("保密")
let email = ref("")
let usernameInput = ref(null)
let passwordInput = ref(null)
let passwordInput2 = ref(null)
let birthDateInput = ref(null)
let emailCodeInput = ref(null)
let sexInput = ref(null)
let form = [
  usernameInput,
  emailInput,
  passwordInput,
  passwordInput2,
  birthDateInput,
  sexInput
]
let state = ref(0)
function submit() {
  if (state.value == 0) {
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
    checkSignUp(username.value, email.value).then((retsult) => {
      if (retsult === null) {
        state.value = 1
      } else {
        showMessage(retsult.msg)
      }
    })
  }else if (state.value == 1) {
    imageCodeInput.value.check().then(()=>{
      state.value = 2
    })
  }else if (state.value == 2) {
    emailCodeInput.value.check().then(()=>{
      confirmSignUp(username.value,email.value,birthDate.value,sex.value,password.value)
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
  width: 60%;
  max-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input-box {
  margin-bottom: 20px;
  z-index: 1;
}

.bottom-button {
  overflow: auto;
  padding: 20px;
  padding-top: 5px;

  &>* {
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

  &>*:first-child {
    float: left;
  }

  &>*:last-child {
    float: right;
  }
}</style>