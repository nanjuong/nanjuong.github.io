FROM kalilinux/kali-rolling

# 更新系统并安装完整的Kali工具集和GUI桌面环境
RUN apt-get update && apt-get upgrade -y && \n    apt-get install -y kali-linux-full xfce4 xfce4-goodies tightvncserver websockify && \n    apt-get clean && rm -rf /var/lib/apt/lists/*

# 创建VNC用户
RUN useradd -m -s /bin/bash kali && \n    echo 'kali:kali' | chpasswd && \n    usermod -aG sudo kali

# 配置VNC
USER kali
WORKDIR /home/kali
RUN mkdir -p .vnc && \n    echo 'kali' | vncpasswd -f > .vnc/passwd && \n    chmod 600 .vnc/passwd

# 创建VNC启动脚本
RUN echo '#!/bin/bash\n' > /home/kali/start-vnc.sh && \n    echo 'export DISPLAY=:1\n' >> /home/kali/start-vnc.sh && \n    echo 'vncserver :1 -geometry 1280x800 -depth 24 -localhost no\n' >> /home/kali/start-vnc.sh && \n    echo 'websockify --web=/usr/share/novnc/ 6080 localhost:5901\n' >> /home/kali/start-vnc.sh && \n    chmod +x /home/kali/start-vnc.sh

# 安装noVNC
RUN git clone https://github.com/novnc/noVNC.git /usr/share/novnc && \n    git clone https://github.com/novnc/websockify.git /usr/share/novnc/utils/websockify && \n    ln -s /usr/share/novnc/vnc_lite.html /usr/share/novnc/index.html

# 切换回root用户
USER root

# 暴露端口
EXPOSE 5901 6080

# 设置启动命令
CMD ["su", "-", "kali", "-c", "/home/kali/start-vnc.sh"]