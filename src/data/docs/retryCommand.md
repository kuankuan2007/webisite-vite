# Retry Command

## 简介

Retry Command是一个Python库，允许你多次重试执行一个命令，直到成功或达到最大重试次数。它提供了自定义重试行为的选项，例如为每次执行设置超时时间和指定表示成功的返回码。

## 安装

要使用Retry Command，你需要在系统上安装Python。你可以使用pip来安装该库：

```bash
pip install retryCommand
```

## 使用方法

Retry Command只能作为一个独立的脚本使用。

### 独立脚本

要将Retry Command作为独立脚本使用，可以运行以下命令：

```bash
do-retry [选项] -c <命令>
```

将`<命令>`替换为你要执行的命令。你还可以指定各种选项来自定义重试行为。使用`-h`或`--help`选项查看可用选项及其描述。

## 选项

Retry Command提供了几个选项来自定义重试行为：

- `-s, --no-stop-after-success`：命令成功后不停止重试。
- `-p, --no-ignore-process-error`：遇到进程错误后不停止重试。
- `-m, --max-num-of-retry`：最大重试次数。设置为-1表示无限次重试。
- `-i, --interval`：重试之间的间隔时间（秒）。
- `-t, --time-out`：每次执行的超时时间（秒）。设置为-1表示没有超时。
- `-d, --cwd`：命令的当前工作目录。
- `-n, --success-return-code`：表示成功的返回码。可以指定多个值。
- `-q --quite`：静音模式，减少输出。
- `--mute`：完全静音，不输出任何内容。
- `-l, --no-need-to-log`：只在标准输出中输出记录，不输出其他记录。仅在静音模式下有效。
- `-c, --command`：要执行的命令。

## 示例

以下是一些使用Retry Command的示例：

- 重试执行一个命令，忽略进程错误：

```bash
do-retry -c <命令>
```

- 重试执行一个命令，最多重试3次，间隔2秒，每次执行超时5秒：

```bash
do-retry -m 3 -i 2 -t 5 -c <命令>
```

## 许可证

Retry Command基于MulanPSL-2.0许可证。更多信息请参阅[LICENSE](LICENSE)文件。
