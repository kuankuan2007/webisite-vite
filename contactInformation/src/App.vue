<template>
  <myheader title="联系我们" />
  <div id="particles-js" class="background"></div>
  <ul class="main">
    <div>
      <div class="title">
        <h2>QQ</h2>
      </div>
      <div>
        <links tips="添加好友" href="https://qm.qq.com/q/uyUcVvYqWs" content="福瑞 : 3169748076" />
        <links tips="添加好友"  href="https://qm.qq.com/q/kGOteCwCFq" content="其他 : 2163826131" />
      </div>
    </div>
    <div>
      <div class="title">
        <h2>QQ频道</h2>
      </div>
      <div>
        <links href="https://pd.qq.com/s/7iqf08bgx" content="宽宽的小天地" />
      </div>
    </div>
    <div>
      <div class="title">
        <h2>微信</h2>
      </div>
      <div>
        <links  tips="添加好友"  :mobilejump="false" href="https://u.wechat.com/MIuqPCR_YOvP88wrhJBtuXI" content="福瑞 : furrykuankuan" />
        <links  tips="添加好友"  :mobilejump="false" href="https://u.wechat.com/ML4NzEKd45FRDTKi1Uj4ZaA" content="其他 : gouhaoming2007" />
      </div>
    </div>

    <div>
      <div class="title">
        <h2>bilibili</h2>
      </div>
      <div>
        <links :pcjump="true" href="https://space.bilibili.com/662698080" content="宽宽2007" />
      </div>
    </div>
    <div>
      <div class="title">
        <h2>抖音</h2>
      </div>
      <div>
        <links :qrcode="douyinURL" tips="抖音扫一扫" href="https://www.douyin.com/user/MS4wLjABAAAA5m3gNGWqC6LuoDid1MIqfReLSm9QhBgZDIcuGvf1v8M"
          content="kuankuan2007" />
      </div>
    </div>
    <div>
      <div class="title">
        <h2>邮箱</h2>
      </div>
      <div>
        <links :pcjump="true" href="mailto:3169748076@qq.com" content="福瑞/收稿 : 3169748076@qq.com" />
        <links :pcjump="true" href="mailto:2163826131@qq.com" content="其他 : 2163826131@qq.com" />
      </div>
    </div>
  </ul>
</template>
<script setup>
import { onMounted } from "vue";
import myheader from "../../src/common/components/header.vue"
import showBG from "./back"
import links from "./components/links.vue";
import douyinURL from "./assets/douyin.png"

onMounted(() => {
  showBG()
})
</script>
<style scoped lang="scss">
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  row-gap: 10px;

  &>div {
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      background-color: black;
      position: absolute;
      bottom: -5px;
      transform: translate(0, 50%);
    }

    position: relative;
    display: flex;
    align-items: center;

    &>div.title {
      &>h2 {
        margin: 0;
      }
    }

    & a {
      color: var(--theme-strong1);
      text-decoration: none;
    }

    &>div {
      margin-left: 20px;

      &>* {
        white-space: nowrap;
        word-break: keep-all;
      }

      &>p {
        margin: 0;
      }
    }
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -999;
}
</style>