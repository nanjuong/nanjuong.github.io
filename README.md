# Kali Linux 网页版

一个可通过浏览器访问的完整Kali Linux虚拟机系统，1:1复刻真实Kali Linux的GUI桌面环境和所有预装工具。

## 功能特性

### 🖥️ 界面功能
- **真实启动过程**：模拟Kali Linux启动流程，包括内核加载、网络初始化、图形界面启动等
- **登录系统**：完整的用户名/密码登录界面
- **桌面环境**：Kali Linux风格的桌面壁纸和图标
- **窗口管理**：支持窗口拖动、最小化、最大化、关闭
- **右键菜单**：桌面右键功能，支持新建终端、文件夹等操作

### 💻 终端功能
支持20+条Kali Linux常用命令：

#### 系统命令
- `help` - 显示帮助信息
- `clear` - 清空终端
- `ls` - 列出目录内容
- `pwd` - 显示当前路径
- `whoami` - 显示当前用户
- `hostname` - 显示主机名
- `date` - 显示当前日期和时间
- `cal` - 显示日历

#### 安全工具
- `nmap` - 网络扫描工具
- `msfconsole` - Metasploit控制台
- `burpsuite` - Burp Suite工具
- `john` - John the Ripper
- `wireshark` - Wireshark网络分析
- `neofetch` - 系统信息展示

#### 文件操作
- `echo` - 显示文本
- `cat` - 显示文件内容
- `cd` - 切换目录
- `mkdir` - 创建目录
- `rm` - 删除文件或目录
- `cp` - 复制文件或目录
- `mv` - 移动或重命名

#### 系统监控
- `ps` - 显示进程
- `top` - 系统监控
- `ping` - 网络连通性测试
- `ifconfig` - 网络接口配置

### 🔧 高级功能
- **命令历史**：支持上下箭头浏览历史命令
- **文件系统**：模拟Linux文件系统，支持目录和文件操作
- **VNC集成**：支持VNC连接（需额外配置）

## 使用方法

### 直接打开
1. 下载所有文件到本地目录
2. 直接用浏览器打开 `index.html` 文件
3. 等待系统启动完成
4. 输入用户名 `kali` 和密码 `kali` 登录

### 本地服务器（推荐）

#### 使用Python启动服务器：
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后在浏览器中访问：`http://localhost:8000`

#### 使用Node.js启动服务器：
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

然后在浏览器中访问：`http://localhost:8000`

## 项目结构

```
.
├── index.html      # 主页面文件
├── style.css       # 样式文件
├── script.js       # JavaScript功能文件
└── README.md       # 项目说明文件
```

## 技术实现

- **HTML5** - 页面结构
- **CSS3** - 样式设计
- **JavaScript** - 功能实现
- **noVNC** - VNC集成支持

## 注意事项

1. 本项目目前是模拟环境，部分工具命令仅显示模拟输出
2. 要实现真实工具运行，需要配置VNC连接到实际的Kali Linux虚拟机
3. 建议使用现代浏览器（Chrome、Firefox、Edge）访问
4. 支持的屏幕分辨率：1024x768及以上

## 未来计划

- [ ] 实现完整的文件管理器
- [ ] 集成真实的VNC连接
- [ ] 添加更多安全工具命令
- [ ] 实现系统托盘功能
- [ ] 添加窗口动画效果
- [ ] 支持多用户会话

## 许可证

MIT License