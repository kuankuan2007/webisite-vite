<template>
  <myheader title="联系我们" />
  <div id="particles-js" class="background"></div>
  <ul class="main">

    <h2>QQ</h2>
    <div>
      <p>福瑞 : 3169748076</p>
      <p>其他 : 2163826131</p>
    </div>


    <h2>微信</h2>
    <div>
      <p>福瑞 : furrykuankuan</p>
      <p>其他 : gouhaoming2007</p>
    </div>


    <h2>bilibili</h2>
    <div><a href="https://space.bilibili.com/662698080">
        <p>宽宽2007</p>
      </a></div>


    <h2>抖音</h2>
    <div><a href="https://www.douyin.com/user/MS4wLjABAAAA5m3gNGWqC6LuoDid1MIqfReLSm9QhBgZDIcuGvf1v8M">
        <p>kuankuan2007</p>
      </a></div>


    <h2>邮箱</h2>
    <div class="connection-item"><a href="mailto:3169748076@qq.com">
        <p>福瑞/收稿 : 3169748076@qq.com</p>
      </a>
      <a href="mailto:2163826131@qq.com">
        <p>其他 : 2163826131@qq.com</p>
      </a>
    </div>

  </ul>
</template>
<script setup>
import { onMounted } from "vue";
import myheader from "../../src/common/components/header.vue"
import showBG from "./back"


onMounted(() => {
  showBG()
})
</script>
<style scoped lang="scss">
.main {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  font-size: 20px;
  display: grid;
  grid-template-columns: max-content max-content;
  gap: 20px;
  max-width: 800px;

  & h2 {
    text-align: left;
    margin: 0;
  }

  & p {
    margin: 0;
  }

  & a {
    text-decoration: none;
    color: var(--theme-strong1);
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
}</style>