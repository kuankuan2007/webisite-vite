# @kuankuan/deep-proxy

`@kuankuan/deep-proxy` 是一个工具库，可以代理一个对象及其所有嵌套对象。它提供了一种灵活且可定制的方式，用于拦截和修改对象属性和方法的行为。

## 安装

你可以通过 npm 安装 `@kuankuan/deep-proxy`：

```bash
npm install @kuankuan/deep-proxy
```

## 使用方法

要使用 `@kuankuan/deep-proxy`，你需要从库中导入 `getDeepProxy` 函数：

```javascript
import { getDeepProxy } from '@kuankuan/deep-proxy';
```

### 代理对象

要代理一个对象，只需将对象和一个选项对象传递给 `getDeepProxy` 函数：

```javascript
const target = { foo: 'bar' };
const options = {
  // 在这里定义你的自定义处理程序
};

const proxy = getDeepProxy(target, options);
```

### 选项

选项对象允许你为代理对象上的各种操作定义自定义处理程序。每个处理程序都是一个函数，当在对象上执行相应的操作时，该函数将被调用。

以下是可用的处理程序：

- `set`：当在对象上设置属性时调用。
- `get`：当访问对象上的属性时调用。
- `apply`：当在对象上调用函数时调用。
- `construct`：当对象被用作构造函数时调用。
- `defineProperty`：当在对象上定义属性时调用。
- `deleteProperty`：当从对象中删除属性时调用。
- `getOwnPropertyDescriptor`：当访问属性的描述符时调用。
- `getPrototypeOf`：当访问对象的原型时调用。
- `has`：当检查属性是否存在时调用。
- `isExtensible`：当检查对象是否可扩展时调用。
- `ownKeys`：当访问对象的键时调用。
- `preventExtensions`：当使对象不可扩展时调用。
- `setPrototypeOf`：当设置对象的原型时调用。

每个处理程序函数接收以下参数：

- `target`：被代理的目标对象。
- `keys`：表示当前属性路径的键数组。
- `...其他参数`：特定于每个处理程序的额外参数。

### 示例

下面是一个示例，演示如何使用 `@kuankuan/deep-proxy` 拦截对象上的属性访问：

```javascript
const target = { foo: 'bar' };
const options = {
  get(target, keys, p, value, receiverTarget) {
    console.log(`访问了属性 ${p.toString()}。`);
    return value;
  },
};

const proxy = getDeepProxy(target, options);

console.log(proxy.foo); // 输出："访问了属性 foo。"
```

## 贡献

欢迎贡献！如果你发现任何问题或有改进建议，请在 GitHub 仓库上开启一个 issue 或提交一个 pull 请求。

## 许可证

该项目基于 MulanPSL-2.0 许可证。详细信息请参阅 [LICENSE](https://github.com/kuankuan-yu/deep-proxy/blob/main/LICENSE) 文件。
