const fs = require('fs');

// 读取文件内容
fs.readFile('d:\\测试\\网页版kali linux\\script.js', 'utf8', (err, data) => {
    if (err) {
        console.error('读取文件失败:', err);
        return;
    }

    // 找到第一个metasploit实现的结束位置（第475行的break;）
    const firstBreakIndex = data.indexOf('            break;', data.indexOf('case \'msfconsole\':'));
    
    // 找到第二个metasploit实现的结束位置
    const secondBreakIndex = data.indexOf('            break;', firstBreakIndex + 1);
    
    // 检查是否找到了两个break
    if (firstBreakIndex === -1 || secondBreakIndex === -1) {
        console.error('没有找到重复的metasploit代码');
        return;
    }
    
    // 构建新的文件内容：保留第一个实现，删除第二个实现
    const newContent = data.substring(0, firstBreakIndex + 13) + 
                      data.substring(secondBreakIndex + 13);
    
    // 写入新的文件内容
    fs.writeFile('d:\\测试\\网页版kali linux\\script.js', newContent, 'utf8', (err) => {
        if (err) {
            console.error('写入文件失败:', err);
            return;
        }
        console.log('成功删除重复的metasploit代码');
    });
});