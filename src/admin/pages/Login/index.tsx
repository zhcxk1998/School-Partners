import React, { ComponentType, useState, useCallback, MouseEvent, FC, FormEvent } from 'react'
import { Checkbox, Form, message, Spin } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useService } from '@/admin/hooks'
import { FetchConfig } from '@/admin/modals/http'

import LinkIcon from '@/admin/components/LinkIcon'

import './index.scss'

type LoginProps = RouteComponentProps & FormComponentProps

const Login: FC<LoginProps> = (props: LoginProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [fetchConfig, setFetchConfig] = useState<FetchConfig>({
    url: '', method: 'GET', params: {}, config: {}
  })
  const { response = {} } = useService(fetchConfig)
  const { getFieldDecorator } = props.form
  const { code = 0, data = {} } = response || {}

  /* 登录成功 */
  if (code === 200) {
    const { msg, token } = data
    localStorage.setItem('token', token)
    message.success(msg)
    props.history.push('/admin')
  }

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
        const { username, password } = values
        const loginConfig: FetchConfig = {
          url: '/login',
          method: 'POST',
          params: { username, password },
          config: {}
        }
        setFetchConfig(Object.assign({}, loginConfig))
      }
    })
  }

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
          <div className="form__decoration">
            <div className="logo">S</div>
          </div>
          <div className="form__container">
            <div className="form__title">School-Partners<br />题库后台管理中心</div>
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
                {getFieldDecorator('isRemember', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Checkbox className="form__remember">记住密码</Checkbox>
                )}
              </Form.Item>
              <button className="form__button" type="submit">立即登录</button>
            </Form>
            <div className="form__footer">
              <Link to="/register">立即注册</Link>
              <div className="form__link">
                其他登录方式
                <LinkIcon icon="wechat.png" onClick={() => setIsModalOpened(true)} />
                <LinkIcon icon="qq.png" onClick={() => setIsModalOpened(true)} />
                <LinkIcon icon="weibo.png" onClick={() => setIsModalOpened(true)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form.create({ name: 'loginForm' })(Login) as ComponentType