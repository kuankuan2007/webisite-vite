<template>
  <k-header title="正则表达式" />
  <div class="tester">
    <div class="main">
      <div class="reg">
        <k-icons class="has-error" v-show="hasError" icon="attention" />
        <span class="gap">/</span>
        <KInput :value="regContent" @update:value="regContent = $event.target.value" title="正则表达式" />
        <span class="gap">/</span>
        <div class="shower">{{ flags }}</div>
        <div class="flags">
          <k-icons icon="downMicro" class="arrow" />
          <div class="menu">
            <ul>
              <li v-for="item, de in reFlagsShow" :key="item[0]">
                <k-check-box :title="`${item}: ${de}`" @change="reFlags[de] = $event" :content="reFlags[de]"
                  :label="item" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="source">
        <textarea v-auto-scaling="{ padding: 20 }" class="source-text" v-model="source" placeholder="验证文本"></textarea>
      </div>
      <div class="result">
        <ul>
          <TransitionGroup duration="500" name="list">
            <li v-for="item in result" :key="item[0]">
              <ul class="result">
                <li v-for="i in item" :key="i">{{ i }}</li>
              </ul>
              <div class="info">
                <p>index: {{ item.index }}</p>
                <p>groups: {{ item.groups || 'undefind' }}</p>
                <p>length: {{ item.length }}</p>
              </div>

            </li>
          </TransitionGroup>
        </ul>
      </div>
    </div>
  </div>
  <div id="particles-js" class="background"></div>
</template>
<script setup>
import KHeader from '../../../src/common/components/header.vue';
import showBG from './back';
import { computed, onMounted, ref, reactive, watchEffect } from 'vue';
import KInput from "../../../src/common/components/input/text.vue"
import KIcons from '../../../src/common/components/KIcons.vue';
import KCheckBox from "../../../src/common/components/input/checkBox.vue"
import vAutoScaling from "../../../src/common/command/auto-scaling"

const hasError = ref(false)
const regContent = ref("[a-zA-Z]+")
const reFlags = reactive({
  g: true,
  i: false,
  m: false,
  s: false
})
const flags = computed(() => {
  let result = ""
  for (const i in reFlags) {
    if (reFlags[i]) {
      result += i
    }
  }
  return result
})
const reFlagsShow = reactive({
  g: "全局",
  i: "忽略大小写",
  m: "多行",
  s: "包含换行"
})
const source = ref("Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed iure voluptatem cumque earum consectetur cupiditate corrupti impedit perferendis tempore minima quasi recusandae voluptate nemo possimus, ab saepe porro, aliquid debitis optio reiciendis unde neque? Corporis mollitia esse magni. Molestiae, soluta ipsa doloremque voluptatem sint itaque quae! Repellendus totam consequatur debitis?")
onMounted(() => {
  showBG()
})
const result = computed(() => {
  regContent.value
  source.value
  flags.value
  let re;
  try {
    re = new RegExp(regContent.value, flags.value)
  } catch {
    hasError.value = true
    return []
  }
  hasError.value = false
  const result = []
  for (const match of re[Symbol.matchAll](source.value)) {
    result.push(match)
  }
  return result
})
</script>
<style scoped lang="scss">
.tester {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  &>.main {
    min-width: 60%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    &>.reg {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &>.has-error {
        position: absolute;
        left: -20px;
        color: red;
        font-size: 24px;
        transform: translate(-100%);
      }

      &>.gap {
        font-size: 24px;
        color: var(--theme-disabled-font);
        user-select: none;
      }

      &>.input-group {
        flex-grow: 1;
      }

      &>.shower {
        margin-left: 10px;
        font-size: 24px;
      }

      &>.flags {
        position: relative;

        &>.arrow {
          font-size: 24px;
          margin-left: 10px;
          cursor: pointer;

          &:hover {
            transition: 0.3s;

            &+.menu {
              padding: 20px;
              max-height: 200px;
            }

            color: var(--theme-strong1);
          }
        }

        &>.menu {
          position: absolute;
          max-height: 0;
          transition: 0.3s;
          padding: 0 20px;
          width: fit-content;
          overflow: hidden;
          background-color: var(--theme-1-1);
          border-radius: calc(20px * var(--theme-border-radius));

          &:hover {
            padding: 20px;
            max-height: 200px;
          }

          &>ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            row-gap: 5px;

            &:deep(.title) {
              white-space: nowrap;
              word-break: keep-all;
            }
          }
        }
      }
    }

    &>.source {
      &>.source-text {
        width: 100%;
        height: 100%;
        background-color: var(--theme-2-1);
        color: var(--font-color);
        border-radius: calc(15px * var(--theme-border-radius));
        padding: 10px;
        border: 2px solid var(--theme-strong1);
        outline: none;
        resize: none;
        font-size: 20px;
      }
    }

    &>.result {
      &>ul {
        list-style: none;
        padding: 0;
        margin: 0;

        &>* {
          transition: all 0.5s ease;

          &.list-enter-from,
          &.list-leave-to {
            opacity: 0;
            transform: translateX(30px);
          }

          &.list-leave-active {
            position: absolute;
          }

          background-color: var(--theme-2-1);
          margin-bottom: 10px;
          padding: 10px;
          border-radius: calc(15px * var(--theme-border-radius));
          display: flex;
          align-items: center;
          column-gap: 10px;
          &>ul{
            list-style: none;
            margin: 0;
            flex-grow: 1;
            padding: 0;
            &>*{
              background-color: var(--theme-2-6);
              padding: 5px;
              text-align: center;
              border-radius: calc(8px * var(--theme-border-radius));
            }
          }
          &>div{
            padding: 10px;
            border-radius: calc(8px * var(--theme-border-radius));
            background-color: var(--theme-2-10);
          }
        }
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