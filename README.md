# School-Partners学习小伴侣:sunny:~

## 介绍
当代大学生上课缺少积极性，学习缺乏效率。同为大学生的我深有体会。所以特别开发出这样一款学习类的微信小程序帮助学生进行学习、巩固知识，同时增加对战PK模块来加强学生们的学习积极性。:sparkles:这是一个为学生提供在线学习课程、题库练习、考试答题、做题PK、上课签到、资料查阅、成绩分析等功能的微信小程序:pig:

## 技术选型

前端：Taro + 微信小程序 + Echarts

后端：Node.js + MySql + websocket

其他：七牛云存储

## 功能
1. 在线学习课程
2. 专项题库练习
3. 课程考试答题
4. 知识趣味竞赛
5. 上课签到系统
6. 专业资料查阅
7. 学生成绩分析

## 运行截图

### 1. 主页
![](http://cdn.algbb.cn/screenshots/1.gif)

### 2. 做题模块
![](http://cdn.algbb.cn/screenshots/2.gif)

### 3. 个人中心
![](http://cdn.algbb.cn/screenshots/3.gif)

## 安装运行

* ##### 第一步
    * 克隆项目到本地`git clone http://github.com/zhcxk1998/School-Partners
* #### 第二步
    * `cnpm i`安装依赖
* #### 第三步
    * 构建运行服务`npm run dev:weapp`
* #### 第四部
    * 在微信小程序开发工具中预览

## 目录结构

    |-- [config]                  // 项目配置文件
    |-- [dist]                    // 项目打包文件
    |-- [src]                     // 项目代码
        -- [client]               // 客户端代码
           -- [assets]            // 静态文件
           -- [components]        // 组件文件
           -- [pages]             // 页面文件
           -- [store]             // 状态管理
           -- [styles]            // 样式文件
           -- [utils]             // 工具包函数
        -- [server]               // 服务端代码
           -- [config]            // 服务端配置文件
           -- [routes]            // 路由目录
           -- [utils]             // 工具函数
           -- [middlewares]       // 中间件
    |-- .gitignore                // git忽略配置
    |-- package-lock.json         // npm
    |-- package.json              // npm
    ...
