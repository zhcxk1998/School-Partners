# School-Partners Learning applets:sunny:~

**Language**: [简体中文](README-CH.md) | [English](README.md)

**This project adopts the Taro technology framework, which can compile React code into WeChat small program, android APP, IOS program, H5 page and so on, The management side is developed with React Hook + TypeScript**

> At present, due to the heavy academic task, there is no good improvement, at present, the small program end is more perfect only exercises, courses, forums, chat rooms. Management side also began to develop, now complete the question bank management, add the question bank, modify the question bank and login functions.

## Introduce
Contemporary college students lack enthusiasm in class and efficiency in learning. As a college student, I have deep experience. So specially developed such a learning WeChat small program to help students to learn, consolidate knowledge, at the same time to increase the PK module to strengthen students' learning enthusiasm. :sparkles:This is a WeChat small program that provides students with online learning courses, question bank exercises, exam questions, do questions PK, class check-in, data search, score analysis and other functions:pig:


For specific use, please refer to my blog, will continue to update the analysis of project technology
> Admin: https://juejin.im/post/5e3389f06fb9a02fbd3791cf  
> Client: https://juejin.im/post/5dd161675188254efb3bceea  
> Using Canvas to realize image marking and transformation: https://juejin.im/post/5e717376e51d4526dd1ec2e6#comment

## Video Demo
http://cdn.algbb.cn/School-Partners%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91.mp4

## Sql File
**Please import the sql file into mysql, otherwise the project will run fail**
https://github.com/zhcxk1998/School-Partners/blob/master/school-partners.sql

## Technology Selection

The Client：Taro + WeChat Applet + Echarts

The Back End：Node.js + MySql + websocket

The Admin：React + TypeScript

Other：Qiniu Cloud

## Function
### mini program
1. Online learning course
2. Special question bank exercises
3. Answer questions on the course exam
4. Fun contest for knowledge
5. Class check-in system
6. Professional data search
7. Student performance analysis
8. Schedule of activities
9. Learning sharing forum

### admin
1. Login and Register
2. The question bank management
3. Mark the Exam Paper

## Screenshot

> Client
### 1. Index
![](http://cdn.algbb.cn/screenshots/index.png)

### 2. DashBoard
![](http://cdn.algbb.cn/screenshots/dashboard.png)

### 3. Course details
![](http://cdn.algbb.cn/screenshots/course.png)

### 4. Practice
![](http://cdn.algbb.cn/screenshots/exercise.png)

### 5. Learning communication group
![](http://cdn.algbb.cn/screenshots/contacts.png)

### 6. The chat room
![](http://cdn.algbb.cn/screenshots/chatroom.png)

### 7. Course list
![](http://cdn.algbb.cn/screenshots/courseList.png)

### 8. Problem sets list
![](http://cdn.algbb.cn/screenshots/exerciseList.png)

### 9. Ranking list
![](http://cdn.algbb.cn/screenshots/rank.png)

### 10. Forum
![](http://cdn.algbb.cn/screenshots/forumList.png)

### 11. Schedule management
![](http://cdn.algbb.cn/screenshots/schedule.png)

> Admin

### 1. Login Page
![](http://cdn.algbb.cn/screenshots/school-partners/管理端登录.png)

### 2. Question Bank Management
![](http://cdn.algbb.cn/screenshots/school-partners/题库管理.png)

### 3. Question Bank Modify
![](http://cdn.algbb.cn/screenshots/school-partners/修改题库.png)

### 4. Mark Paper
![](http://cdn.algbb.cn/screenshots/mark-paper.png)

## Installation operation

* ##### First
    * Clone the project locally `git clone http://github.com/zhcxk1998/School-Partners
* #### second
    * `cnpm i` Install dependencies
* #### third
    * Start the server `npm run server`
    * Build run services `npm run dev:weapp`
    * Build run admin `npm run dev`
* #### fourth
    * Preview in the WeChat applet development tool
    * Preview admin in the Chrome 

## The directory structure

    |-- [config]                  // Project profile
    |-- [dist]                    // Project package file
    |-- [src]                     // Project code
        -- [client]               // Client code
           -- [assets]            // Static files
           -- [components]        // Component files
           -- [pages]             // Page file
           -- [store]             // State management
           -- [styles]            // The style file
           -- [utils]             // Toolkit function
        -- [server]               // Server code
           -- [config]            // Server configuration file
           -- [routes]            // Routing directory
           -- [utils]             // Tool function
           -- [middlewares]       // The middleware
        -- [client]               // Admin code
           -- [assets]            // Static files
           -- [components]        // Component files
           -- [pages]             // Page file
           -- [store]             // State management
           -- [styles]            // The style file
           -- [utils]             // Toolkit function
    |-- .gitignore                // Git ignore configuration
    |-- package-lock.json         // npm
    |-- package.json              // npm
    ...
