#!/bin/sh

#
# 使用方法：(脚本自动发布)
# Yipmall：front_deploy.sh Yip-Mall
#

GIT_HOME=/develop/git-repository/
DEST_PATH=/product/frontend/

# cd dir
if [ ! -n "$1" ];
    then
    echo -e "请输入要发布的项目！"
    exit
fi

if [ $1 = "Yip-Mall" ];
    then
    echo -e "=========Enter Yip-Mall==========="
    cd $GIT_HOME$1
else
    echo -e "输入的项目名没有找到！"
    exit
fi

# clear git dist 文件
echo -e "==========Clear Git Dist==========="
rm -rf ./dist

# git 操作
echo -e "==========git checkout master==========="
git checkout master

echo -e "==========git pull==========="
git pull

# npm install
echo -e "=========npm install==========="
npm install

# npm run build
echo -e "=========npm run build==========="
npm run build

if [ -d "./dist" ];
    then
    # backup dest
    echo -e "=========dest backup==========="
    mv $DEST_PATH$1/dist $DEST_PATH$1/dist.bak

    # copy
    echo -e "=========copy==========="
    cp -R ./dist $DEST_PATH$1

    # echo result
    echo -e "=========Deploy Success==========="
else
     echo -e "=========Deploy Error==========="
fi
