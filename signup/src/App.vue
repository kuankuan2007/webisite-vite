<template>
  <myheader title="注册" jump="/user/"></myheader>
  <div class="main">
    <h1 class="title">注册</h1>
    <importtext ref="usernameInput" class="input-box" type="text" title="用户名" :value="username"
      @update:value="username = $event.target.value" :reminder="['用户名必须是2-32个非空白字符']" :tester="s=>/^\S{2,32}$/.test(s)?0:1"/>
    <importtext ref="emailInput" class="input-box" type="email" title="邮箱" :value="email"
      @update:value="email = $event.target.value" :reminder="['邮箱格式不正确']" :tester="s=>/^[\w.%+-]+@(?:[^/\\\.&\?\#]+\.)+[^/\\\.&\?\#]+$/.test(s)?0:1"/>
    <importtext ref="passwordInput" class="input-box" type="password" title="密码" :value="password"
      @update:value="password = $event.target.value" :reminder="['密码太短','密码太长','密码需要包含数字','密码需要包含字母','密码不能包含特殊字符']" :tester="s=>{
        if (s.length < 6) return 1
        else if (s.length > 32) return 2
        else if (!/^(?=.*[0-9]).{6,32}$/.test(s)) return 3
        else if (!/^(?=.*[a-zA-Z]).{6,32}$/.test(s)) return 4
        else if (/^[a-zA-Z0-9]{6,32}$/.test(s)) return 0
        else return 5
      }"/>
    <importtext ref="passwordInput" class="input-box" type="password" title="确认密码" :value="password2"
      @update:value="password2 = $event.target.value" :reminder="['密码不匹配']" :tester="s=>s===password?0:1"/>
    <importdate @update:date="birthDate=$event" style="z-index:1" :value="birthDate" class="input-box" title="出生日期" :reminder="['出生日期应在当前日期之前']" :tester="date=>date>new Date()?1:0"/>
    <importsex @update:value="sex=$event" style="z-index:0" :value="sex" class="input-box" title="性别"/>
    <importbutton value="下一步" @click="submit" />
    <div class="bottom-button">
      <p>忘记密码</p>
      <p><a href="/login/">登录</a></p>
    </div>
  </div>
</template>
<script setup>
import { ref,shallowRef } from "vue";
import myheader from "../../src/common/components/header.vue"
import importtext from "../../src/common/components/input/text.vue"
import importsex from "../../src/common/components/input/sex.vue"
import importdate from "../../src/common/components/input/date.vue"
import importbutton from "../../src/common/components/input/button.vue"
import { login } from "../../src/common/script/connection"
import { showMessage } from "../../src/common/script/infomations";
import { getQueryVariable } from "../../src/common/script/normal";
let username = ref("")
let password = ref("")
let password2 = ref("")
let birthDate = shallowRef(new Date(1970, 0, 1))
let sex=ref("保密")
let email = ref("")
let usernameInput = ref(null)
let passwordInput = ref(null)
function submit() {
  if (!username.value) {
    showMessage("请输入账号", function () {
      usernameInput.value.input.focus()
    })
    return
  }
  if (!password.value) {
    showMessage("请输入密码", function () {
      passwordInput.value.input.focus()
    })
    return
  }
  login(username.value, password.value).then((retsult) => {
    if (retsult === true) {
      location.href = getQueryVariable("from", "/")
    }
    showMessage("账号或密码错误")
  })
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