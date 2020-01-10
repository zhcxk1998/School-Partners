import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

interface IProps {

}

const Footer: FC<IProps> = () => (
  <div className="footer__container">
    <div className="footer__wrap">
      <div className="service__wrap wrap">
        <div className="title">企业服务</div>
        <Link className="link" to="#">课程服务</Link>
        <Link className="link" to="#">新闻资讯</Link>
        <Link className="link" to="#">做题APP</Link>
      </div>
      <div className="help__wrap wrap">
        <div className="title">使用与帮助</div>
        <Link className="link" to="#">用户协议与隐私政策</Link>
        <Link className="link" to="#">防骗指南</Link>
        <Link className="link" to="#">发布规则</Link>
        <Link className="link" to="#">使用帮助</Link>
      </div>
      <div className="about__wrap wrap">
        <div className="title">关于我们</div>
        <Link className="link" to="#">项目介绍</Link>
        <Link className="link" to="#">开发背景</Link>
        <Link className="link" to="#">加入我们</Link>
      </div>
      <div className="contact__wrap wrap wrap--right">
        <div className="title">School-Partners学习平台</div>
        <div className="info">企业服务热线与投诉举报电话  123456789</div>
        <div className="info">工作日  8:00 - 22:00</div>
        <div className="info">休息日  0:00 - 24:00</div>
      </div>
    </div>
    <div className="copyright">
      Copyright © 2019 School-Partners 粤ICP备1231232号
    </div>
  </div>
)

export default Footer