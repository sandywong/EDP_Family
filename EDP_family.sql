-- phpMyAdmin SQL Dump
-- version 3.3.7deb5build0.10.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2011 年 09 月 14 日 14:18
-- 服务器版本: 5.1.49
-- PHP 版本: 5.3.3-1ubuntu9.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `EDP_family`
--

-- --------------------------------------------------------

--
-- 表的结构 `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL COMMENT '成员id',
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '花名',
  `name` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '真实姓名',
  `extenNum` int(40) DEFAULT NULL COMMENT '分机号',
  `wangWang` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '旺旺',
  `cellPhone` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '手机',
  `mail` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '邮箱地址',
  `weibo` varchar(80) CHARACTER SET utf8 DEFAULT NULL COMMENT '微博',
  `position` varchar(30) CHARACTER SET utf8 DEFAULT NULL COMMENT '职位',
  `place` varchar(30) CHARACTER SET ucs2 DEFAULT NULL COMMENT '座位位置',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- 表的结构 `tag`
--

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL,
  `tag` varchar(30) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;
