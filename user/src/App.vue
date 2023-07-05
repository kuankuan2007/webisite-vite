<template>
  <myheader title="用户设置" :toLogin="true" />
  <div class="main" v-if="finished">
    <div class="input-group">
      <importdate style="z-index: 1;" class="input-ele" :value="info.birthdate" :disabled="!canEdit" @update:date="info.birthdate = $event"/>
      <importsex class="input-ele" :value="info.sex" :disabled="!canEdit" @update:value="info.sex = $event"/>
      <importbutton :value="canEdit?'保存':'修改'" @click="changeCanEdit"/>
    </div>
    <div class="input-group">
      <importbutton value="修改密码" @click="jump('/user/changepassword/')"/>
      <importbutton value="修改邮箱" @click="jump('/user/changeemail/')"/>
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
import { ref, reactive } from "vue";
import { getInfo,changeInfo,logout } from "../../src/common/script/connection";
let finished = ref(false)
let info = reactive({})
let canEdit = ref(false)
const useDate=["sex","birthdate"]
let lastValue={}
getInfo().then((result) => {
  for (let i of useDate) {
    info[i] = result[i]
  }
  finished.value = true
})
function changeCanEdit(){
  canEdit.value=!canEdit.value
  if (!canEdit.value) {
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