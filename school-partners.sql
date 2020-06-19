/*
Navicat MySQL Data Transfer

Source Server         : chatroom
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : school-partners

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2020-05-29 13:06:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chatlog`
-- ----------------------------
DROP TABLE IF EXISTS `chatlog`;
CREATE TABLE `chatlog` (
  `room_name` varchar(20) NOT NULL,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(2000) NOT NULL,
  `current_time` varchar(14) NOT NULL DEFAULT '',
  `user_avatar` varchar(200) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chatlog
-- ----------------------------
INSERT INTO `chatlog` VALUES ('shujuku', '3123213', '我爱数据库 ', '1567179732771', 'http://cdn.algbb.cn/fat.jpg', '11');
INSERT INTO `chatlog` VALUES ('shujuku', '3123213', '我爱数据库 ', '1567179974959', 'http://cdn.algbb.cn/fat.jpg', '15');
INSERT INTO `chatlog` VALUES ('ruanjiangongcheng', '3123213', '我爱数据库 ', '1567187242423', 'http://cdn.algbb.cn/fat.jpg', '25');
INSERT INTO `chatlog` VALUES ('shujuku', '3123213', '我爱数据库 ', '1567189380455', 'http://cdn.algbb.cn/fat.jpg', '33');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '哈哈哈', '1571036583375', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8m8ndPKiap2vYuJCvnyY9ziaQ/132', '34');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '瓦达瓦大', '1571299186397', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '35');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', 'awdawdaw', '1571299572539', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '36');
INSERT INTO `chatlog` VALUES ('jisuanjiwangluo', 'BB小天使?', '哈哈哈哈', '1571299936255', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '37');
INSERT INTO `chatlog` VALUES ('jisuanjiwangluo', 'BB小天使?', '123123', '1571300338670', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '38');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123213', '1571469869021', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '39');
INSERT INTO `chatlog` VALUES ('jisuanjiwangluo', 'BB小天使?', '哥哥哥', '1571476113188', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '40');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123213', '1571479462873', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '41');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123213213123', '1571479464557', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '42');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123213', '1571479467657', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '43');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571480629259', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '44');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123123', '1571480630611', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '45');
INSERT INTO `chatlog` VALUES ('shujuku', 'test', 'emmmmmm', '1571494139781', 'http://cdn.algbb.cn/fat.jpg', '46');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571494246599', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '47');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571494247871', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '48');
INSERT INTO `chatlog` VALUES ('shujuku', 'test', 'emmmmmm', '1571494251003', 'http://cdn.algbb.cn/fat.jpg', '49');
INSERT INTO `chatlog` VALUES ('shujuku', 'test', '瓦打我打我都爱我', '1571494565662', 'http://cdn.algbb.cn/fat.jpg', '50');
INSERT INTO `chatlog` VALUES ('shujuku', 'test', '瓦打我打我都爱我', '1571495381320', 'http://cdn.algbb.cn/fat.jpg', '51');
INSERT INTO `chatlog` VALUES ('shujuku', 'test', 'aahehih13123', '1571495389695', 'http://cdn.algbb.cn/fat.jpg', '52');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571495395472', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '53');
INSERT INTO `chatlog` VALUES ('shujuku', 'test', 'aahehih13123', '1571495396913', 'http://cdn.algbb.cn/fat.jpg', '54');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571577498172', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '55');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '哈哈哈', '1571578024908', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '56');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571578128721', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '57');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '啊啊', '1571585595948', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '58');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571585605166', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '59');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123123213', '1571585703657', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '60');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571585715089', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '61');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '啊啊啊', '1571631897734', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '62');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571636480762', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '63');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '嘿嘿', '1571637335510', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '64');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '爱我打我打我', '1571637933043', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '65');
INSERT INTO `chatlog` VALUES ('shujuku', 'test', 'aahehih13123', '1571638335200', 'http://cdn.algbb.cn/fat.jpg', '66');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1571641655110', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '67');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '测试测试！', '1572189828643', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '68');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '3', '1573631568378', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '69');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1573901850727', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '70');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '。。', '1575890533457', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '71');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', 'aa ', '1575961403193', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '72');
INSERT INTO `chatlog` VALUES ('ruanjiangongcheng', 'BB小天使?', '不把软件工程当人？', '1576569801219', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '73');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '测试测试', '1576655804357', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '74');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '色色', '1576656178890', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '75');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123213123123', '1577629778798', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '76');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '你们好啊', '1577629784657', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '77');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '嘿嘿', '1578566979856', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '78');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '213', '1578748465948', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '79');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '1111', '1578839928729', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '80');
INSERT INTO `chatlog` VALUES ('ruanjiangongcheng', 'BB小天使?', '？', '1578839935644', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8diaPnvZ2mbeM2iauiaictibQDMQ/132', '81');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1580046035540', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '82');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', 'hh ', '1583767693845', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '83');
INSERT INTO `chatlog` VALUES ('ruanjiangongcheng', 'BB小天使?', 'aaa', '1583767698068', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '84');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1585115595118', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '85');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '321', '1585115689061', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '86');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '123', '1585116278415', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '87');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '1', '1585116442213', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '88');
INSERT INTO `chatlog` VALUES ('jisuanjiwangluo', 'BB小天使?', '这是计网交流群', '1585116503558', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '89');
INSERT INTO `chatlog` VALUES ('jisuanjiwangluo', 'BB小天使?', '哈哈哈', '1585116507476', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '90');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '2', '1585120543573', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '91');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '3', '1585120552354', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '92');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '4', '1585120577687', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '93');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '1', '1585123782775', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '94');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '5', '1585123792640', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8aBQ2b5tic5bRFbg6iaC0EnuQ/132', '95');
INSERT INTO `chatlog` VALUES ('shujuku', '测试号?', '1', '1587034290763', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrnBicE4IawLQR3oAXmNZPWCLxnwcppSbSTmogZJNLWyUsoutS6YoO9iaWRXvQERDrj8hYgicqtibJicA/132', '96');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '2', '1587034308039', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8eAqOnia1yo2XMdEatWPElPA/132', '97');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '2', '1587178788146', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8eAqOnia1yo2XMdEatWPElPA/132', '98');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '1', '1587178795099', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8eAqOnia1yo2XMdEatWPElPA/132', '99');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '999', '1587178811052', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8eAqOnia1yo2XMdEatWPElPA/132', '100');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '1', '1587178824224', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8eAqOnia1yo2XMdEatWPElPA/132', '101');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '嘿嘿嘿嘿', '1589542270416', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS87p7XqWweNpy4vzaTRiapysw/132', '102');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '测试测试', '1589542275437', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS87p7XqWweNpy4vzaTRiapysw/132', '103');
INSERT INTO `chatlog` VALUES ('shujuku', '测试号?', '。。。', '1589542335646', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrnBicE4IawLQR3oAXmNZPWCLxnwcppSbSTmogZJNLWyUsoutS6YoO9iaWRXvQERDrj8hYgicqtibJicA/132', '104');
INSERT INTO `chatlog` VALUES ('shujuku', '测试号?', '嗷呜嗷呜', '1589542339468', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrnBicE4IawLQR3oAXmNZPWCLxnwcppSbSTmogZJNLWyUsoutS6YoO9iaWRXvQERDrj8hYgicqtibJicA/132', '105');
INSERT INTO `chatlog` VALUES ('shujuku', '测试号?', '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', '1589542342493', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrnBicE4IawLQR3oAXmNZPWCLxnwcppSbSTmogZJNLWyUsoutS6YoO9iaWRXvQERDrj8hYgicqtibJicA/132', '106');
INSERT INTO `chatlog` VALUES ('shujuku', '测试号?', '啦啦啦啦啦', '1589542345942', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrnBicE4IawLQR3oAXmNZPWCLxnwcppSbSTmogZJNLWyUsoutS6YoO9iaWRXvQERDrj8hYgicqtibJicA/132', '107');
INSERT INTO `chatlog` VALUES ('shujuku', '测试号?', '13123213', '1589542349965', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrnBicE4IawLQR3oAXmNZPWCLxnwcppSbSTmogZJNLWyUsoutS6YoO9iaWRXvQERDrj8hYgicqtibJicA/132', '108');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '嘿嘿', '1589550924197', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS87p7XqWweNpy4vzaTRiapysw/132', '109');
INSERT INTO `chatlog` VALUES ('shujuku', 'BB小天使?', '12', '1589678788758', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS87p7XqWweNpy4vzaTRiapysw/132', '110');

-- ----------------------------
-- Table structure for `class_list`
-- ----------------------------
DROP TABLE IF EXISTS `class_list`;
CREATE TABLE `class_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `class_code` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `class_member` int(11) NOT NULL DEFAULT '0',
  `class_teacher` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `class_tag` int(11) NOT NULL DEFAULT '1',
  `is_checked` int(2) NOT NULL DEFAULT '0',
  `class_avatar` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `tag_id` (`class_tag`),
  CONSTRAINT `tag_id` FOREIGN KEY (`class_tag`) REFERENCES `tag_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of class_list
-- ----------------------------
INSERT INTO `class_list` VALUES ('4', 'BB的班级', '79CBTY', '0', 'abc', '5', '1', 'http://cdn.algbb.cn/emoji/32.png');
INSERT INTO `class_list` VALUES ('5', 'bb1', 'DJWKMG', '0', 'bb', '2', '1', '');
INSERT INTO `class_list` VALUES ('6', '123121321', '2IWX7D', '0', '321', '2', '0', '');
INSERT INTO `class_list` VALUES ('7', '1', '5JTAWH', '0', '1', '1', '0', '');

-- ----------------------------
-- Table structure for `contacts_list`
-- ----------------------------
DROP TABLE IF EXISTS `contacts_list`;
CREATE TABLE `contacts_list` (
  `title` varchar(20) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `contacts_id` varchar(100) NOT NULL,
  PRIMARY KEY (`contacts_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contacts_list
-- ----------------------------
INSERT INTO `contacts_list` VALUES ('计算机网络交流群', 'http://cdn.algbb.cn/study/banner/7.svg', 'jisuanjiwangluo');
INSERT INTO `contacts_list` VALUES ('软件工程交流群', 'http://cdn.algbb.cn/study/banner/8.svg', 'ruanjiangongcheng');
INSERT INTO `contacts_list` VALUES ('数据库系统原理交流群', 'http://cdn.algbb.cn/study/banner/9.svg', 'shujuku');

-- ----------------------------
-- Table structure for `course_info`
-- ----------------------------
DROP TABLE IF EXISTS `course_info`;
CREATE TABLE `course_info` (
  `course_cid` char(15) COLLATE utf8_unicode_ci NOT NULL,
  `course_author` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `publish_date` varchar(14) COLLATE utf8_unicode_ci NOT NULL,
  `course_views` int(11) NOT NULL,
  `course_description` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `step_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `step_detail` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(11) NOT NULL,
  `course_rate` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of course_info
-- ----------------------------
INSERT INTO `course_info` VALUES ('156612079490634', 'BB小天使', '1572169315443', '132', '能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。', '[\"思考，感悟\",\"爱国，敬业\",\"思考，感悟\",\"诚信，友善\"]', '[\"阅读课文\",\"翻译文章\",\"阅读课文\",\"翻译文章\"]', '1', '3.5');

-- ----------------------------
-- Table structure for `course_list`
-- ----------------------------
DROP TABLE IF EXISTS `course_list`;
CREATE TABLE `course_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) NOT NULL,
  `is_recommend` int(2) NOT NULL DEFAULT '0',
  `course_author` varchar(20) NOT NULL,
  `publish_date` varchar(14) NOT NULL DEFAULT '',
  `course_views` int(11) NOT NULL DEFAULT '0',
  `course_steps` text NOT NULL,
  `course_rate` float NOT NULL DEFAULT '0',
  `course_description` varchar(200) NOT NULL,
  `class_id` int(11) NOT NULL,
  `is_public` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `课程班级id` (`class_id`),
  CONSTRAINT `课程班级id` FOREIGN KEY (`class_id`) REFERENCES `class_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course_list
-- ----------------------------
INSERT INTO `course_list` VALUES ('1', '软件工程', '1', 'BB小天使', '1572169315443', '132', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '3.5', '能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。', '4', '1');
INSERT INTO `course_list` VALUES ('2', 'web前端技术', '1', 'BB小天使', '1581313821964', '321', '[{\"title\":\"我是标题\",\"content\":\"我是内容1\"}]', '4', '我是web前端的简介我是web前端的简介我是web前端的简介我是web前端的简介', '4', '0');
INSERT INTO `course_list` VALUES ('3', '计算机网络', '1', 'BB', '1581313821964', '0', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '0', '能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。', '4', '0');
INSERT INTO `course_list` VALUES ('4', '数据库', '1', 'BB', '1581313821964', '0', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '0', '能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。', '4', '0');
INSERT INTO `course_list` VALUES ('5', '软件测试', '1', 'BB', '1581313821964', '0', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '0', '能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。', '4', '0');
INSERT INTO `course_list` VALUES ('6', '计算机算法', '1', 'BB', '1581313821964', '0', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '0', '能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。', '5', '0');
INSERT INTO `course_list` VALUES ('7', 'Java高编', '0', 'BB', '1581313821964', '0', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '0', '能说出这种话的男人，确实给不了朋友幸福！但是这个渣男竟然敢对我朋友说出“我还爱你”四个字，这就有点恶心人了，还侮辱了爱这个词。爱的话跨过千山万水，跨过艰难险阻，都是要来到朋友面前爱她的！不爱就不爱了呗，还在分手时说出什么我还爱你，爱是给不了你幸福的话。', '5', '0');
INSERT INTO `course_list` VALUES ('9', '测试课程', '1', 'BB', '1581313821964', '0', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '2', '测试简介', '5', '0');
INSERT INTO `course_list` VALUES ('10', '111', '0', '1', '1581314377347', '0', '[{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"爱国，敬业\",\"content\":\"翻译文章\"},{\"title\":\"思考，感悟\",\"content\":\"阅读课文\"},{\"title\":\"诚信，友善\",\"content\":\"翻译文章\"}]', '1', '1', '5', '0');
INSERT INTO `course_list` VALUES ('14', '新增课程', '1', '123', '1581388944763', '0', '[{\"title\":\"123\",\"content\":\"123\"}]', '3.5', '123', '4', '0');
INSERT INTO `course_list` VALUES ('15', '1', '0', '1', '1586569697030', '0', '[{\"title\":\"1\",\"content\":\"1\"}]', '4', '1', '4', '0');

-- ----------------------------
-- Table structure for `exam_list`
-- ----------------------------
DROP TABLE IF EXISTS `exam_list`;
CREATE TABLE `exam_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exam_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exam_content` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exam_difficulty` int(2) NOT NULL,
  `exam_type` int(2) NOT NULL,
  `topic_list` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `publish_date` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_time` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timing_mode` int(2) NOT NULL COMMENT '计时方式：1. 开始时间与结束时间 2. 倒计时',
  `exam_code` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '随机考试码',
  `count_down` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '倒计时时间戳',
  `is_open` int(2) NOT NULL DEFAULT '0',
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `班级id` (`class_id`),
  CONSTRAINT `班级id` FOREIGN KEY (`class_id`) REFERENCES `class_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of exam_list
-- ----------------------------
INSERT INTO `exam_list` VALUES ('1', '软件工程第一章测试', '123', '1', '1', '[{\"topicContent\":\"1\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"1\"},{\"id\":2,\"option\":\"1\"},{\"id\":3,\"option\":\"1\"},{\"id\":4,\"option\":\"1\"}]}]', '1581689695153', '0', '0', '1', 'a3ba2c', '30m', '1', '4');
INSERT INTO `exam_list` VALUES ('2', '数据库系统原理课堂小测2', '22222', '3', '1', '[{\"topicContent\":\"22\",\"topicType\":2,\"topicAnswer\":[1,2,3],\"topicOptions\":[{\"id\":1,\"option\":\"2\"},{\"id\":2,\"option\":\"2\"},{\"id\":3,\"option\":\"2\"},{\"id\":4,\"option\":\"2\"}]},{\"topicContent\":\"12\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"1\"},{\"id\":2,\"option\":\"1\"},{\"id\":3,\"option\":\"1\"},{\"id\":4,\"option\":\"1\"}]}]', '1581689935602', '0', '0', '1', '7fbfbb', '30d', '0', '4');
INSERT INTO `exam_list` VALUES ('3', '编译原理课堂小测1', '3', '1', '1', '[{\"topicContent\":\"3\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"3\"},{\"id\":2,\"option\":\"3\"},{\"id\":3,\"option\":\"3\"},{\"id\":4,\"option\":\"3\"}]}]', '1581689965951', '0', '0', '1', 'ef191b', '3s', '0', '4');
INSERT INTO `exam_list` VALUES ('4', '操作系统期中考试', '4', '3', '2', '[{\"topicContent\":\"4\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"4\"},{\"id\":2,\"option\":\"4\"},{\"id\":3,\"option\":\"4\"},{\"id\":4,\"option\":\"4\"}]}]', '1581690339843', '1581776731537', '1584714331537', '2', '6ca7d9', '0', '1', '5');
INSERT INTO `exam_list` VALUES ('5', '软件测试第六章测试', '1', '1', '1', '[{\"topicContent\":\"1\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"1\"},{\"id\":2,\"option\":\"1\"},{\"id\":3,\"option\":\"1\"},{\"id\":4,\"option\":\"1\"}]}]', '1581693805161', '1581693785000', '1584112985000', '2', '7197bf', '0', '0', '5');

-- ----------------------------
-- Table structure for `exercise_detail`
-- ----------------------------
DROP TABLE IF EXISTS `exercise_detail`;
CREATE TABLE `exercise_detail` (
  `exercise_id` int(11) NOT NULL,
  `detail_cid` int(255) NOT NULL AUTO_INCREMENT,
  `detail_list` varchar(21300) NOT NULL,
  `detail_answers` varchar(200) NOT NULL,
  PRIMARY KEY (`detail_cid`),
  KEY `exercise_id` (`exercise_id`),
  CONSTRAINT `exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `exercise_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exercise_detail
-- ----------------------------
INSERT INTO `exercise_detail` VALUES ('2', '2', '[{\"type\":\"radio\",\"topic\":\"人们常常把软件工程的方法（开发方法）、工具（支持方法的工具）、（ ）称为软件工程三要素。\",\"options\":[\"程序\",\"质量\",\"人员\",\"过程\"]},{\"type\":\"radio\",\"topic\":\"下面的（ ）说法是正确的。\",\"options\":[\"软件危机在20世纪70年代末期全面爆发\",\"当前先进的软件工程方法已经解决了软件危机的问题\",\"软件危机是指在计算机软件的开发和维护过程中遇到的一系列严重问题\",\"软件危机是指在软件产品中存在一系列的质量问题\"]},{\"type\":\"multiple\",\"topic\":\"软件工程的基本目标是（ ）。\",\"options\":[\"消除软件固有的复杂性\",\"开发高质量的软件\",\"努力发挥开发人员的创造性潜能\",\"更好地维护正在使用的软件产品\"]},{\"type\":\"radio\",\"topic\":\"开发软件所需高成本和产品的低质量之间有着尖锐的矛盾，这种现象称作（ ）\",\"options\":[\"软件工程\",\"软件周期\",\"软件危机\",\"软件产生\"]},{\"type\":\"multiple\",\"topic\":\"面向过程方法，设计时强调( )的思想采用“自顶向下，逐步求精”的技术对于系统进行划分，分解和抽象是它的两个基本手段。\",\"options\":[\"组件化\",\"模块化\",\"构建化\",\"包\"]},{\"type\":\"radio\",\"topic\":\"从事物的组成部件及每个部件的属性、功能来认识事物。这种方法被称为（ ）的方法。\",\"options\":[\"面向对象\",\"面向数据\",\"面向过程\",\"面向属性\"]}]', '[\"0\",\"2\",\"1-3\",\"3\",\"1-2\",\"2\"]');

-- ----------------------------
-- Table structure for `exercise_list`
-- ----------------------------
DROP TABLE IF EXISTS `exercise_list`;
CREATE TABLE `exercise_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exercise_name` varchar(20) NOT NULL,
  `exercise_content` varchar(100) NOT NULL,
  `is_hot` int(2) NOT NULL DEFAULT '0',
  `finish_count` int(11) NOT NULL DEFAULT '0',
  `total_count` int(11) NOT NULL DEFAULT '0',
  `exercise_difficulty` int(2) NOT NULL DEFAULT '1' COMMENT '困难程度：1. 简单，2. 中等， 3. 困难',
  `exercise_type` int(2) NOT NULL DEFAULT '1' COMMENT '题目类型：1. 免费，2. 会员',
  `topic_list` text NOT NULL,
  `publish_date` varchar(14) NOT NULL,
  `class_id` int(11) NOT NULL,
  `is_public` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `题库班级id` (`class_id`),
  CONSTRAINT `题库班级id` FOREIGN KEY (`class_id`) REFERENCES `class_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exercise_list
-- ----------------------------
INSERT INTO `exercise_list` VALUES ('1', '软件工程第一章', '本章对软件、软件工程、软件工程课程、软件工程学科体系进行了定义', '1', '1', '3', '1', '1', '[{\"topicContent\":\"软件工程的定义\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"程序\"},{\"id\":2,\"option\":\"算法\"},{\"id\":3,\"option\":\"设计\"},{\"id\":4,\"option\":\"硬件\"}]},{\"topicContent\":\"软件测试是什么\",\"topicType\":2,\"topicAnswer\":[1,3,2],\"topicOptions\":[{\"id\":1,\"option\":\"测试性能\"},{\"id\":2,\"option\":\"压力测试\"},{\"id\":3,\"option\":\"性能测试\"},{\"id\":4,\"option\":\"功能测试\"}]},{\"topicContent\":\"安卓怎么用\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"IDE打开\"},{\"id\":2,\"option\":\"VScode\"},{\"id\":3,\"option\":\"手写\"},{\"id\":4,\"option\":\"记事本\"}]}]', '1581314023570', '4', '1');
INSERT INTO `exercise_list` VALUES ('2', 'UML建模', '深度了解UML建模之间的各种关系', '1', '23', '14', '2', '2', '[{\"topicContent\":\"软件工程的定义\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"程序\"},{\"id\":2,\"option\":\"算法\"},{\"id\":3,\"option\":\"设计\"},{\"id\":4,\"option\":\"硬件\"}]},{\"topicContent\":\"软件测试是什么\",\"topicType\":2,\"topicAnswer\":[1,3,2],\"topicOptions\":[{\"id\":1,\"option\":\"测试性能\"},{\"id\":2,\"option\":\"压力测试\"},{\"id\":3,\"option\":\"性能测试\"},{\"id\":4,\"option\":\"功能测试\"}]}]', '1581314023570', '4', '0');
INSERT INTO `exercise_list` VALUES ('3', '前端面试必备', '收录了各大厂商的前端面试资源', '1', '45', '8', '3', '1', '[{\"topicContent\":\"软件工程的定义\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"程序\"},{\"id\":2,\"option\":\"算法\"},{\"id\":3,\"option\":\"设计\"},{\"id\":4,\"option\":\"硬件\"}]},{\"topicContent\":\"软件测试是什么\",\"topicType\":2,\"topicAnswer\":[1,3,2],\"topicOptions\":[{\"id\":1,\"option\":\"测试性能\"},{\"id\":2,\"option\":\"压力测试\"},{\"id\":3,\"option\":\"性能测试\"},{\"id\":4,\"option\":\"功能测试\"}]}]', '1581314023570', '4', '0');
INSERT INTO `exercise_list` VALUES ('4', 'Linux从入门到精通', '内含各种常见Linux命令，助您巩固基础', '1', '664', '12', '1', '2', '[{\"topicContent\":\"软件工程的定义\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"程序\"},{\"id\":2,\"option\":\"算法\"},{\"id\":3,\"option\":\"设计\"},{\"id\":4,\"option\":\"硬件\"}]},{\"topicContent\":\"软件测试是什么\",\"topicType\":2,\"topicAnswer\":[1,3,2],\"topicOptions\":[{\"id\":1,\"option\":\"测试性能\"},{\"id\":2,\"option\":\"压力测试\"},{\"id\":3,\"option\":\"性能测试\"},{\"id\":4,\"option\":\"功能测试\"}]}]', '1581314023570', '4', '0');
INSERT INTO `exercise_list` VALUES ('5', '计算机网络', '常见的Http协议，浏览器头文件等测试题', '0', '243', '10', '3', '1', '[{\"topicContent\":\"软件工程的定义\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"程序\"},{\"id\":2,\"option\":\"算法\"},{\"id\":3,\"option\":\"设计\"},{\"id\":4,\"option\":\"硬件\"}]},{\"topicContent\":\"软件测试是什么\",\"topicType\":2,\"topicAnswer\":[1,3,2],\"topicOptions\":[{\"id\":1,\"option\":\"测试性能\"},{\"id\":2,\"option\":\"压力测试\"},{\"id\":3,\"option\":\"性能测试\"},{\"id\":4,\"option\":\"功能测试\"}]}]', '1581314023570', '4', '0');
INSERT INTO `exercise_list` VALUES ('16', '名称测试', '题库简介', '1', '2', '2', '1', '1', '[{\"topicContent\":\"软件工程的定义\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"程序\"},{\"id\":2,\"option\":\"算法\"},{\"id\":3,\"option\":\"设计\"},{\"id\":4,\"option\":\"硬件\"}]},{\"topicContent\":\"软件测试是什么\",\"topicType\":2,\"topicAnswer\":[1,3,2],\"topicOptions\":[{\"id\":1,\"option\":\"测试性能\"},{\"id\":2,\"option\":\"压力测试\"},{\"id\":3,\"option\":\"性能测试\"},{\"id\":4,\"option\":\"功能测试\"}]}]', '1581314023570', '5', '0');
INSERT INTO `exercise_list` VALUES ('17', 'java高级编程', '好东西', '0', '3', '3', '2', '2', '[{\"topicContent\":\"java多少分\",\"topicType\":1,\"topicAnswer\":[4],\"topicOptions\":[{\"id\":1,\"option\":\"100\"},{\"id\":2,\"option\":\"20\"},{\"id\":3,\"option\":\"60\"},{\"id\":4,\"option\":\"80\"}]}]', '1581314023570', '5', '0');
INSERT INTO `exercise_list` VALUES ('18', '计算机图形学11111', '专注研究图形一百年', '1', '4', '4', '3', '1', '[{\"topicContent\":\"图形学是什么\",\"topicType\":1,\"topicAnswer\":[2],\"topicOptions\":[{\"id\":1,\"option\":\"好东西\"},{\"id\":2,\"option\":\"坏东西\"},{\"id\":3,\"option\":\"一般般\"},{\"id\":4,\"option\":\"不怎么好\"}]},{\"topicContent\":\"图形学干什么\",\"topicType\":2,\"topicAnswer\":[1,2,3,4],\"topicOptions\":[{\"id\":1,\"option\":\"研究\"},{\"id\":2,\"option\":\"学习\"},{\"id\":3,\"option\":\"好好\"},{\"id\":4,\"option\":\"嘻嘻\"}]}]', '1581314023570', '5', '0');
INSERT INTO `exercise_list` VALUES ('19', '新测试测试', '新简介', '0', '5', '5', '3', '2', '[{\"topicContent\":\"新1\",\"topicType\":2,\"topicAnswer\":[1,3,2,4],\"topicOptions\":[{\"id\":1,\"option\":\"新A\"},{\"id\":2,\"option\":\"新B\"},{\"id\":3,\"option\":\"新C\"},{\"id\":4,\"option\":\"新D\"}]},{\"topicContent\":\"新3\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"娃娃打我\"},{\"id\":2,\"option\":\"瓦达瓦达瓦大哇\"},{\"id\":3,\"option\":\"我乳娃娃\"},{\"id\":4,\"option\":\"瓦达瓦达瓦\"}]}]', '1581314023570', '5', '0');
INSERT INTO `exercise_list` VALUES ('20', '哈哈哈', '嘿嘿', '0', '6', '6', '3', '2', '[{\"topicContent\":\"1\",\"topicType\":2,\"topicAnswer\":[1,3],\"topicOptions\":[{\"id\":1,\"option\":\"2\"},{\"id\":2,\"option\":\"2\"},{\"id\":3,\"option\":\"2\"},{\"id\":4,\"option\":\"2\"}]}]', '1581314023570', '4', '0');
INSERT INTO `exercise_list` VALUES ('22', '测试新题库', '啊啊啊', '1', '7', '2', '1', '1', '[{\"topicContent\":\"123\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"111\"},{\"id\":2,\"option\":\"111\"},{\"id\":3,\"option\":\"22\"},{\"id\":4,\"option\":\"22\"}]},{\"topicContent\":\"22\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"22\"},{\"id\":2,\"option\":\"22\"},{\"id\":3,\"option\":\"22\"},{\"id\":4,\"option\":\"22\"}]}]', '1581314023570', '4', '0');
INSERT INTO `exercise_list` VALUES ('23', '题库', '123', '1', '0', '1', '1', '1', '[{\"topicContent\":\"123\",\"topicType\":1,\"topicAnswer\":[1],\"topicOptions\":[{\"id\":1,\"option\":\"123\"},{\"id\":2,\"option\":\"123\"},{\"id\":3,\"option\":\"213\"},{\"id\":4,\"option\":\"123\"}]}]', '1581388972096', '4', '0');

-- ----------------------------
-- Table structure for `forum_list`
-- ----------------------------
DROP TABLE IF EXISTS `forum_list`;
CREATE TABLE `forum_list` (
  `forum_id` int(11) NOT NULL AUTO_INCREMENT,
  `forum_avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `forum_author` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `publish_time` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `forum_image` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `forum_title` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `forum_content` varchar(4000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `forum_like` int(11) NOT NULL,
  `forum_comment` int(11) NOT NULL,
  PRIMARY KEY (`forum_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of forum_list
-- ----------------------------
INSERT INTO `forum_list` VALUES ('1', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132', '俺是BB', '1571494246599', 'http://cdn.algbb.cn/forum/3.jpg', '在校大学生竟然做出这种事', '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！', '24', '12');
INSERT INTO `forum_list` VALUES ('2', 'http://cdn.algbb.cn/emoji/30.png', 'Bob Tom', '1573902373063', 'http://cdn.algbb.cn/forum/4.jpg', '毕业前必须知道的18件事情', '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！', '11', '45');
INSERT INTO `forum_list` VALUES ('3', 'http://cdn.algbb.cn/emoji/32.png', 'Rose Steven', '1573631568378', 'http://cdn.algbb.cn/forum/1.jpg', '震惊，某高校学生引人泪目', '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！', '34', '8');
INSERT INTO `forum_list` VALUES ('21', 'http://cdn.algbb.cn/fat.jpg', '凤舞九天', '1576570442536', 'http://cdn.algbb.cn/forum/5.jpg', '大学生逃课，知道真相后大家都竖起了大拇指', '我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！我在马路边捡到一分钱，把它交到警察叔叔手里边，叔叔拿着钱，对我把头点，我高兴的说了声，叔叔再见！', '66', '43');

-- ----------------------------
-- Table structure for `student_class`
-- ----------------------------
DROP TABLE IF EXISTS `student_class`;
CREATE TABLE `student_class` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of student_class
-- ----------------------------
INSERT INTO `student_class` VALUES ('1', '1', '4');

-- ----------------------------
-- Table structure for `student_list`
-- ----------------------------
DROP TABLE IF EXISTS `student_list`;
CREATE TABLE `student_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `open_id` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_avatar` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `open_id` (`open_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of student_list
-- ----------------------------
INSERT INTO `student_list` VALUES ('1', 'real_name', 'BB小天使?', 'o0e-f4ot_r4ffQVqcLJBxpNO82Uw', 'https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS87p7XqWweNpy4vzaTRiapysw/132');
INSERT INTO `student_list` VALUES ('6', 'real_name', '测试号?', 'o0e-f4srh8x2H6heNAg6x95DOPJE', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrnBicE4IawLQR3oAXmNZPWCLxnwcppSbSTmogZJNLWyUsoutS6YoO9iaWRXvQERDrj8hYgicqtibJicA/132');

-- ----------------------------
-- Table structure for `tag_list`
-- ----------------------------
DROP TABLE IF EXISTS `tag_list`;
CREATE TABLE `tag_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of tag_list
-- ----------------------------
INSERT INTO `tag_list` VALUES ('1', '其他');
INSERT INTO `tag_list` VALUES ('2', '计算机基础');
INSERT INTO `tag_list` VALUES ('3', '前端');
INSERT INTO `tag_list` VALUES ('4', '后端');
INSERT INTO `tag_list` VALUES ('5', '算法');

-- ----------------------------
-- Table structure for `topic_list`
-- ----------------------------
DROP TABLE IF EXISTS `topic_list`;
CREATE TABLE `topic_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of topic_list
-- ----------------------------

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int(2) NOT NULL DEFAULT '1',
  `class_id` int(11) NOT NULL DEFAULT '-1',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_actived` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username` (`username`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `class_id` FOREIGN KEY (`class_id`) REFERENCES `class_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('23', 'bb', '1', '4', '123', '123', '1');
INSERT INTO `user_info` VALUES ('24', 'cc', '1', '5', '123', '123', '1');
INSERT INTO `user_info` VALUES ('25', 'dd', '1', '6', '123', '123', '1');
INSERT INTO `user_info` VALUES ('26', 'ee', '1', '7', '123', '123', '1');

-- ----------------------------
-- Table structure for `user_password`
-- ----------------------------
DROP TABLE IF EXISTS `user_password`;
CREATE TABLE `user_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user_password
-- ----------------------------
INSERT INTO `user_password` VALUES ('5', '23', '300dbc798691295085dc3dd86ec748e5', '1d');
INSERT INTO `user_password` VALUES ('6', '24', '1a121c194526da930de876ab143b5eef', 'c941');
INSERT INTO `user_password` VALUES ('7', '25', '4617616ac48eaedab4feed0873fb1849', 'a7d9');
INSERT INTO `user_password` VALUES ('8', '26', '345e61aeba784eac490166a5cb737fe5', '1ef42');
