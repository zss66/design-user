# Welcome to GitHub Desktop!

This is your README. READMEs are where you can communicate what your project is and how to use it.

Write your name on line 6, save it, and then head back to GitHub Desktop.

设置时区：一旦你进入了容器的 shell 环境，可以根据容器的操作系统选择相应的命令来设置时区。
对于基于 Debian/Ubuntu 的容器，可以使用以下命令：
bash
dpkg-reconfigure tzdata
对于基于 CentOS/RedHat 的容器，可以使用以下命令：
bash
timedatectl set-timezone Asia/Shanghai
退出容器：完成时区设置后，使用 exit 命令退出容器的 shell 环境。
bash
exit
