import React, { ComponentType, useState, useCallback, MouseEvent } from 'react'
import { Checkbox } from 'antd'

import './index.scss'

const Login = () => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleMaskClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      setIsModalOpened(false)
    },
    [isModalOpened]
  )

  return (
    <div className="login__container">
      <div className="login__mask" hidden={!isModalOpened} onClick={handleMaskClick} >
        <div className="login__mask__container">
          <div className="tips">登录二维码</div>
          <img src={require('../../assets/img/login.png')} />
        </div>
      </div>
      <div className="login__wrap">
        <div className="login__wrap--left" />
        <div className="login__wrap--right">
          <div className="form__container">
            <div className="form__title">School-Partners<br />题库后台管理中心</div>
            <div className="form__wrap">
              <i className="form__icon iconfont icon-yonghu" />
              <input className="form__input" placeholder="用户名" />
            </div>
            <div className="form__wrap">
              <i className="form__icon iconfont icon-mima" />
              <input className="form__input" type="password" placeholder="密码" />
            </div>
            <Checkbox className="form__remember">记住密码</Checkbox>
            <button className="form__button">立即登录</button>
            <div className="form__link">
              其他登录方式
              <img src={require('../../assets/img/wechat.png')} onClick={() => setIsModalOpened(true)} />
              <img src={require('../../assets/img/qq.png')} onClick={() => setIsModalOpened(true)} />
              <img src={require('../../assets/img/weibo.png')} onClick={() => setIsModalOpened(true)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login as ComponentType