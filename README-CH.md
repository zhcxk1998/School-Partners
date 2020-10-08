# School-Partners学习小伴侣:sunny:~

Language: [简体中文](README-CH.md) | [English](README.md)

**本项目小程序端采用Taro技术框架，可将React代码编译为微信小程序、安卓APP、IOS程序、H5页面等，管理端采用React Hook + TypeScript来进行开发**

> 目前因学业任务比较重，没有好好的完善，目前小程序端比较完善的只有习题，课程，论坛，聊天室。管理端也开始进行开发了，现在完成了题库管理，新增题库，修改题库以及登录的功能

## 介绍
当代大学生上课缺少积极性，学习缺乏效率。同为大学生的我深有体会。所以特别开发出这样一款学习类的微信小程序帮助学生进行学习、巩固知识，同时增加对战PK模块来加强学生们的学习积极性。:sparkles:这是一个为学生提供在线学习课程、题库练习、考试答题、做题PK、上课签到、资料查阅、成绩分析等功能的微信小程序:pig:

具体使用请参考本人博客,将持续更新分析项目技术
> 管理端: https://juejin.im/post/5e3389f06fb9a02fbd3791cf  
> 小程序端: https://juejin.im/post/5dd161675188254efb3bceea    
> canvas实现图片标记与画布的各种变换效果：https://juejin.im/post/5e717376e51d4526dd1ec2e6


## 视频演示
http://cdn.algbb.cn/School-Partners%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91.mp4

## 参数配置
**运行项目前，需要对`src/server/config`目录下的配置文件进行配置**

## 数据库文件
**运行项目前，请务必将根目录下的sql文件导入进mysql数据库，否则无法运行**
https://github.com/zhcxk1998/School-Partners/blob/master/school-partners.sql

## 技术选型

客户端：Taro + 微信小程序 + Echarts

服务端：Node.js + MySql + websocket

管理端：React + TypeScript

其他：七牛云存储

## 功能
### 小程序端
1. 在线学习课程
2. 专项题库练习
3. 课程考试答题
4. 知识趣味竞赛
5. 上课签到系统
6. 专业资料查阅
7. 学生成绩分析
8. 活动日程安排
9. 学习分享论坛


### 管理端
1. 登录注册
2. 题库管理
3. 试卷批改

## 运行截图

> 客户端
### 1. 主页
![](http://cdn.algbb.cn/screenshots/index.png)

### 2. 个人中心
![](http://cdn.algbb.cn/screenshots/dashboard.png)

### 3. 课程详情
![](http://cdn.algbb.cn/screenshots/course.png)

### 4. 做题练习
![](http://cdn.algbb.cn/screenshots/exercise.png)

### 5. 学习交流群
![](http://cdn.algbb.cn/screenshots/contacts.png)

### 6. 聊天室
![](http://cdn.algbb.cn/screenshots/chatroom.png)

### 7. 课程列表
![](http://cdn.algbb.cn/screenshots/courseList.png)

### 8. 习题列表
![](http://cdn.algbb.cn/screenshots/exerciseList.png)

### 9. 排行榜
![](http://cdn.algbb.cn/screenshots/rank.png)

### 10. 论坛
![](http://cdn.algbb.cn/screenshots/forumList.png)

### 11. 日程管理
![](http://cdn.algbb.cn/screenshots/schedule.png)

> 管理端

### 1. 登录界面
![](http://cdn.algbb.cn/screenshots/school-partners/管理端登录.png)

### 2. 题库管理
![](http://cdn.algbb.cn/screenshots/school-partners/题库管理.png)

### 3. 修改题库
![](http://cdn.algbb.cn/screenshots/school-partners/修改题库.png)

### 4. 试卷批改
![](http://cdn.algbb.cn/screenshots/mark-paper.png)

## 安装运行

* #### 第一步
    * 克隆项目到本地`git clone http://github.com/zhcxk1998/School-Partners
* #### 第二步
    * `cnpm i`安装依赖
* #### 第三步
    * 启动后台服务 `npm run server`
    * 构建小程序运行服务 `npm run dev:weapp`
    * 构建管理端 `npm run dev`
* #### 第四部
    * 在微信小程序开发工具中预览
    * 在PC端预览管理端

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
        -- [admin]                // 管理端代码
           -- [assets]            // 静态文件
           -- [components]        // 组件文件
           -- [pages]             // 页面文件
           -- [store]             // 状态管理
           -- [styles]            // 样式文件
           -- [utils]             // 工具包函数
    |-- .gitignore                // git忽略配置
    |-- package-lock.json         // npm
    |-- package.json              // npm
    ...
