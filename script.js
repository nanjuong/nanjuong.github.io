// 全局变量
let currentUser = 'kali';
let isShuttingDown = false;
let notifications = [];

// 页面加载完成后开始启动过程
window.addEventListener('load', () => {
    startBootProcess();
});

// 启动过程
function startBootProcess() {
    const bootScreen = document.getElementById('boot-screen');
    const progressBar = document.querySelector('.progress-bar');
    const bootStatus = document.getElementById('boot-status');
    let progress = 0;
    
    const bootSteps = [
        { status: '正在加载内核...', duration: 1000 },
        { status: '初始化硬件...', duration: 800 },
        { status: '加载驱动程序...', duration: 1200 },
        { status: '启动系统服务...', duration: 1500 },
        { status: '初始化桌面环境...', duration: 1000 },
        { status: '准备登录界面...', duration: 500 }
    ];
    
    let stepIndex = 0;
    
    function executeNextStep() {
        if (stepIndex < bootSteps.length) {
            bootStatus.textContent = bootSteps[stepIndex].status;
            
            const stepProgress = (100 / bootSteps.length) * (stepIndex + 1);
            progress = stepProgress;
            progressBar.style.width = `${progress}%`;
            
            stepIndex++;
            
            // 执行下一个步骤
            setTimeout(executeNextStep, bootSteps[stepIndex - 1].duration);
        } else {
            // 启动完成，显示登录界面
            bootScreen.style.display = 'none';
            document.getElementById('login-screen').style.display = 'flex';
        }
    }
    
    // 开始执行第一个步骤
    executeNextStep();
}

// 登录功能
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 简单的登录验证（实际应用中应该更复杂）
    if (username === 'kali' && password === 'kali') {
        currentUser = username;
        document.getElementById('current-user').textContent = currentUser;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        startClock();
        addNotification('系统已启动', '欢迎使用Kali Linux Web', 'info');
    } else {
        alert('用户名或密码错误');
    }
}

// 开始时钟
function startClock() {
    const clock = document.getElementById('clock');
    
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// 桌面右键菜单
let contextMenu = document.getElementById('context-menu');

// 显示右键菜单
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.classList.add('show');
});

// 隐藏右键菜单
document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target)) {
        contextMenu.classList.remove('show');
        setTimeout(() => {
            contextMenu.style.display = 'none';
        }, 200);
    }
});

// 右键菜单功能
function refreshDesktop() {
    addNotification('桌面已刷新', '', 'info');
    contextMenu.style.display = 'none';
}

function createNewFolder() {
    addNotification('新建文件夹', '此功能正在开发中', 'info');
    contextMenu.style.display = 'none';
}

// 窗口管理
function openWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        window.style.display = 'block';
        setTimeout(() => {
            window.classList.add('show');
        }, 10);
    }
}

function closeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        window.classList.remove('show');
        setTimeout(() => {
            window.style.display = 'none';
        }, 200);
    }
}

function minimizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        window.classList.remove('show');
        setTimeout(() => {
            window.style.display = 'none';
        }, 200);
    }
}

function maximizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        if (window.style.maxWidth === '100%') {
            window.style.maxWidth = 'none';
            window.style.maxHeight = 'none';
            window.style.width = '600px';
            window.style.height = '400px';
        } else {
            window.style.maxWidth = '100%';
            window.style.maxHeight = '100%';
            window.style.width = '100%';
            window.style.height = '100%';
        }
    }
}

function toggleWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        if (window.style.display === 'block') {
            minimizeWindow(windowId);
        } else {
            openWindow(windowId);
        }
    }
}

// 开始菜单
toggleStartMenu = () => {
    const startMenu = document.getElementById('start-menu');
    const notificationCenter = document.getElementById('notification-center');
    
    if (startMenu.style.display === 'block') {
        startMenu.classList.remove('show');
        setTimeout(() => {
            startMenu.style.display = 'none';
        }, 200);
    } else {
        startMenu.style.display = 'block';
        setTimeout(() => {
            startMenu.classList.add('show');
        }, 10);
        
        // 关闭通知中心
        notificationCenter.classList.remove('show');
        setTimeout(() => {
            notificationCenter.style.display = 'none';
        }, 200);
    }
};

// 通知中心
toggleNotificationCenter = () => {
    const notificationCenter = document.getElementById('notification-center');
    const startMenu = document.getElementById('start-menu');
    
    if (notificationCenter.style.display === 'block') {
        notificationCenter.classList.remove('show');
        setTimeout(() => {
            notificationCenter.style.display = 'none';
        }, 200);
    } else {
        notificationCenter.style.display = 'block';
        setTimeout(() => {
            notificationCenter.classList.add('show');
        }, 10);
        
        // 关闭开始菜单
        startMenu.classList.remove('show');
        setTimeout(() => {
            startMenu.style.display = 'none';
        }, 200);
    }
};

// 添加通知
function addNotification(title, message, type = 'info') {
    const notificationList = document.getElementById('notification-list');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <strong>${title}</strong>
        <p>${message}</p>
    `;
    
    notificationList.appendChild(notification);
    notifications.push(notification);
    
    // 5秒后自动移除通知
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
            setTimeout(() => {
                notification.parentNode.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// 清除所有通知
function clearNotifications() {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = '';
    notifications = [];
}

// 关机
function shutdown() {
    isShuttingDown = true;
    document.getElementById('desktop').style.display = 'none';
    const bootScreen = document.getElementById('boot-screen');
    bootScreen.style.display = 'flex';
    const bootStatus = document.getElementById('boot-status');
    bootStatus.textContent = '正在关机...';
    
    setTimeout(() => {
        bootStatus.textContent = '系统已关闭';
    }, 2000);
}

// 桌面图标点击事件
function openTerminal() {
    openWindow('terminal');
    document.getElementById('terminal-input').focus();
}

function openFileManager() {
    openWindow('file-manager');
    loadFileList();
}

function openFirefox() {
    openWindow('firefox');
}

function openNmap() {
    openWindow('nmap');
    document.getElementById('nmap-target').focus();
}

function openMetasploit() {
    openWindow('metasploit');
    document.getElementById('msf-input').focus();
}

function openSettings() {
    openWindow('settings');
}

// 文件管理器功能
function loadFileList() {
    const fileList = document.getElementById('file-list');
    const files = [
        { name: '桌面', icon: 'fas fa-desktop' },
        { name: '文档', icon: 'fas fa-file-alt' },
        { name: '下载', icon: 'fas fa-download' },
        { name: '音乐', icon: 'fas fa-music' },
        { name: '图片', icon: 'fas fa-image' },
        { name: '视频', icon: 'fas fa-video' },
        { name: '代码', icon: 'fas fa-code' },
        { name: '工具', icon: 'fas fa-tools' }
    ];
    
    fileList.innerHTML = '';
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <i class="${file.icon}"></i>
            <span>${file.name}</span>
        `;
        fileList.appendChild(fileItem);
    });
}

function navigateUp() {
    addNotification('导航', '返回上级目录功能正在开发中', 'info');
}

// 终端功能
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
        terminalInput.value = '';
    }
});

function executeCommand(command) {
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';
    outputLine.innerHTML = `<span class="terminal-prompt">kali@kali:~$</span> <span>${command}</span>`;
    terminalOutput.appendChild(outputLine);
    
    const resultLine = document.createElement('div');
    resultLine.className = 'terminal-line';
    
    // 模拟命令执行
    switch (command.toLowerCase()) {
        case 'ls':
            resultLine.innerHTML = '桌面 文档 下载 音乐 图片 视频 代码 工具';
            break;
        case 'pwd':
            resultLine.innerHTML = '/home/kali';
            break;
        case 'whoami':
            resultLine.innerHTML = currentUser;
            break;
        case 'uname -a':
            resultLine.innerHTML = 'Linux kali 5.10.0-kali7-amd64 #1 SMP Debian 5.10.40-1kali1 (2021-05-31) x86_64 GNU/Linux';
            break;
        case 'cat /etc/os-release':
            resultLine.innerHTML = 'PRETTY_NAME="Kali GNU/Linux Rolling"<br>NAME="Kali GNU/Linux"<br>VERSION_ID="2023.2"<br>VERSION="2023.2 (Kali Purple)"';
            break;
        case 'clear':
            terminalOutput.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">kali@kali:~$</span></div>';
            return;
        case 'help':
            resultLine.innerHTML = '可用命令: ls, pwd, whoami, uname -a, cat /etc/os-release, clear, help';
            break;
        case 'nmap':
            resultLine.innerHTML = 'Nmap 7.93 ( https://nmap.org )<br>使用: nmap [扫描类型...] [选项] {目标规范}';
            break;
        case 'msfconsole':
            resultLine.innerHTML = '[-] Failed to connect to the database: could not connect to server: Connection refused<br>    Is the server running on host "localhost" (127.0.0.1) and accepting<br>    TCP/IP connections on port 5432?';
            break;
        default:
            resultLine.innerHTML = `bash: ${command}: command not found`;
    }
    
    terminalOutput.appendChild(resultLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Nmap功能
function runNmap() {
    const target = document.getElementById('nmap-target').value;
    const options = document.getElementById('nmap-options').value;
    const output = document.getElementById('nmap-output');
    
    if (!target) {
        addNotification('Nmap', '请输入目标地址', 'error');
        return;
    }
    
    output.innerHTML = `正在扫描 ${target}...<br>`;
    
    // 模拟Nmap扫描
    setTimeout(() => {
        output.innerHTML += '启动 Nmap 7.93 ( https://nmap.org ) 于 2023-10-15 14:30 CST<br>';
        output.innerHTML += `Nmap 扫描报告 for ${target}<br>`;
        output.innerHTML += '主机状态: 启动<br>';
        output.innerHTML += '端口号: 22/tcp  open  ssh<br>';
        output.innerHTML += '端口号: 80/tcp  open  http<br>';
        output.innerHTML += '端口号: 443/tcp open  https<br>';
        output.innerHTML += 'Nmap 完成: 1 个 IP 地址 (1 个主机启动) 扫描时间: 3.2 秒';
        addNotification('Nmap扫描完成', `已完成对 ${target} 的扫描`, 'info');
    }, 2000);
}

// Metasploit功能
const msfInput = document.getElementById('msf-input');
const msfOutput = document.getElementById('msf-output');

msfInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        executeMsfCommand(msfInput.value);
        msfInput.value = '';
    }
});

function executeMsfCommand(command) {
    const outputLine = document.createElement('div');
    outputLine.innerHTML = `<span>msf6 ></span> <span>${command}</span>`;
    msfOutput.appendChild(outputLine);
    
    const resultLine = document.createElement('div');
    
    // 模拟Metasploit命令执行
    switch (command.toLowerCase()) {
        case 'help':
            resultLine.innerHTML = '可用命令: help, show exploits, use exploit/multi/http/struts2_rest_xstream, set, exploit, exit';
            break;
        case 'show exploits':
            resultLine.innerHTML = 'exploit/multi/http/struts2_rest_xstream<br>exploit/windows/smb/ms17_010_eternalblue<br>exploit/unix/webapp/phpmyadmin_backdoor';
            break;
        case 'use exploit/multi/http/struts2_rest_xstream':
            resultLine.innerHTML = '已选择 exploit/multi/http/struts2_rest_xstream';
            break;
        case 'set rhosts 192.168.1.100':
            resultLine.innerHTML = 'rhosts => 192.168.1.100';
            break;
        case 'set lhost 192.168.1.10':
            resultLine.innerHTML = 'lhost => 192.168.1.10';
            break;
        case 'exploit':
            resultLine.innerHTML = '正在启动 exploit...<br>[-] Exploit 失败: No response received from the server';
            break;
        case 'exit':
            closeWindow('metasploit');
            return;
        default:
            resultLine.innerHTML = `[-] 未知命令: ${command}`;
    }
    
    msfOutput.appendChild(resultLine);
    msfOutput.scrollTop = msfOutput.scrollHeight;
}

// 窗口拖动功能
const windows = document.querySelectorAll('.window');

windows.forEach(window => {
    const header = window.querySelector('.window-header');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;
        
        // 让当前窗口置顶
        windows.forEach(w => w.style.zIndex = 10);
        window.style.zIndex = 20;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            window.style.left = `${x}px`;
            window.style.top = `${y}px`;
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

// 桌面图标选中功能
const desktopIcons = document.querySelectorAll('.desktop-icon');

desktopIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        // 移除其他图标的选中状态
        desktopIcons.forEach(i => i.classList.remove('selected'));
        // 添加当前图标的选中状态
        icon.classList.add('selected');
    });
});

// 点击桌面空白处取消选中
document.querySelector('.desktop').addEventListener('click', (e) => {
    if (!e.target.closest('.desktop-icon')) {
        desktopIcons.forEach(icon => icon.classList.remove('selected'));
    }
});

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl+Alt+T 打开终端
    if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        openTerminal();
    }
    
    // Alt+F4 关闭当前窗口
    if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        const activeWindow = document.querySelector('.window.show');
        if (activeWindow) {
            closeWindow(activeWindow.id);
        }
    }
    
    // Windows键 打开开始菜单
    if (e.key === 'Meta' || e.key === 'Windows') {
        e.preventDefault();
        toggleStartMenu();
    }
    
    // Escape键 关闭菜单
    if (e.key === 'Escape') {
        contextMenu.style.display = 'none';
        const startMenu = document.getElementById('start-menu');
        const notificationCenter = document.getElementById('notification-center');
        
        if (startMenu.style.display === 'block') {
            toggleStartMenu();
        }
        
        if (notificationCenter.style.display === 'block') {
            toggleNotificationCenter();
        }
    }
});

// 初始化系统
function initSystem() {
    // 设置壁纸
    document.querySelector('.desktop').style.backgroundImage = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
    
    // 添加系统通知
    setTimeout(() => {
        addNotification('欢迎使用Kali Linux Web', '这是一个基于浏览器的Kali Linux模拟环境', 'info');
    }, 3000);
}

// 页面加载完成后初始化系统
window.addEventListener('load', () => {
    initSystem();
});