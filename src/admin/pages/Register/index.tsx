import React, { ComponentType, useState, useCallback, MouseEvent, FC, FormEvent } from 'react'
import { Form, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RouteComponentProps, Link } from 'react-router-dom'

import http from '@/admin/utils/http'

import './index.scss'

type RegisterProps = RouteComponentProps & FormComponentProps

const Register: FC<RegisterProps> = (props: RegisterProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const { getFieldDecorator } = props.form

  const handleMaskClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      setIsModalOpened(false)
    },
    [isModalOpened]
  )

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { form } = props
    form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password, phone, email } = values
        const { data: { msg, token } } = await http.post('/register', {
          username,
          password,
          phone,
          email
        })
        localStorage.setItem('token', token)
        message.success(msg)
        props.history.push('/')
      }
    })
  }

  return (
    <div className="register__container">
      <div className="register__mask" hidden={!isModalOpened} onClick={handleMaskClick} >
        <div className="register__mask__container">
          <div className="tips">登录二维码</div>
          <img src={require('../../assets/img/login.png')} />
        </div>
      </div>
      <div className="register__wrap">
        <div className="register__wrap--left" />
        <div className="register__wrap--right">
          <div className="form__decoration">
            <div className="logo">S</div>
          </div>
          <div className="form__container">
            <div className="form__title">欢迎注册<br />School-Partners</div>
            <Form onSubmit={handleFormSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <div className="form__wrap">
                    <i className="form__icon iconfont icon-yonghu" />
                    <input className="form__input" placeholder="用户名" />
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <div className="form__wrap">
                    <i className="form__icon iconfont icon-mima" />
                    <input className="form__input" type="password" placeholder="密码" />
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号!' }],
                })(
                  <div className="form__wrap">
                    <i className="form__icon iconfont icon-shouji" />
                    <input className="form__input" placeholder="手机号" />
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入邮箱!' }],
                })(
                  <div className="form__wrap">
                    <i className="form__icon iconfont icon-youxiang" />
                    <input className="form__input" placeholder="邮箱" />
                  </div>
                )}
              </Form.Item>
              <button className="form__button" type="submit">立即注册</button>
            </Form>
            <div className="form__footer">
              <Link to="/login">立即登录</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form.create({ name: 'registerForm' })(Register) as ComponentType