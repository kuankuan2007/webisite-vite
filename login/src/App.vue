<template>
  <myheader title="登录" jump="/user/"></myheader>
  <div class="main">
    <h1 class="title">登录</h1>
    <importtext ref="flagInput" class="input-box" type="text" title="用户名/邮箱" :value="flag"
      @update:value="flag = $event.target.value" />
    <importtext ref="passwordInput" class="input-box" type="password" title="密码" :value="password"
      @update:value="password = $event.target.value" />
    <importbutton value="确认" @click="submit" />
    <div class="bottom-button">
      <p>忘记密码</p>
      <p><a href="/signup/">注册</a></p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import myheader from "../../src/common/components/header.vue"
import importtext from "../../src/common/components/input/text.vue"
import importbutton from "../../src/common/components/input/button.vue"
import { login } from "../../src/common/script/connection"
import { showMessage } from "../../src/common/script/infomations";
import { getQueryVariable } from "../../src/common/script/normal";
let flag = ref("")
let password = ref("")
let flagInput = ref(null)
let passwordInput = ref(null)
let form = [
  flagInput,passwordInput
]
function submit() {
  for (let i of form){
    if (i.value.wrong==-1){
      showMessage(`请填写${i.value.title}字段`)
      return
    }else if (i.value.wrong!=0) {
      console.log(i.value.reminder,i.value.wrong-1)
      showMessage(i.value.reminder[i.value.wrong-1])
      return
    }
  }
  login(flag.value, password.value).then((retsult) => {
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