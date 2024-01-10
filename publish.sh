#!/bin/bash

rm -rf ./dist # 删除 dist 目录
# 执行 打包命令
pnpm run build


# 获取当前时间作为time变量
time=$(date "+%Y%m%d-%H%M%S")

# 将远程服务器的原文件夹根据当前日期重命名作为备份
ssh root@xx.xxx.xx "mv /var/www/dist /var/www/dist-"${time}
# ssh root@xx.xxx.xx 'rm -rf /var/www/dist/*'


# 远程拷贝本地的dist文件夹到远程服务器的/var/www目录下
scp -r ./dist root@xx.xxx.xx:/var/www/

# 给远程服务器的dist目录赋读写权限
ssh root@xx.xxx.xx 'chmod +777 -R /var/www/dist/'

echo "***************部署成功***************"
