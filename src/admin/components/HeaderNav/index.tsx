import React, { Component } from 'react'
import { Icon } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

import './index.scss'

interface IProps extends RouteComponentProps {

}

interface IStates {
  currentPageIndex: number
}

const linkList: Array<{ name: string, link: string }> = [{
  name: '城市', link: '#'
}, {
  name: '首页', link: '#'
}, {
  name: '课程', link: '#'
}, {
  name: '圈子', link: '#'
}, {
  name: 'APP', link: '#'
}, {
  name: '资讯', link: '#'
}, {
  name: '关于我们', link: '#'
}]

class Header extends Component<IProps, IStates>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentPageIndex: 1
    }
  }

  componentDidMount(): void {
    const { location: { pathname } } = this.props
    const currentLinkIndex: number = linkList.findIndex(({ link }) => link === pathname)
    this.setState({
      currentPageIndex: currentLinkIndex
    })
  }

  componentDidUpdate(preProps: IProps) {
    const pathIsChanged: boolean = preProps.location.pathname !== this.props.location.pathname
    if (pathIsChanged) {
      const { location: { pathname } } = this.props
      const currentLinkIndex: number = linkList.findIndex(({ link }) => link === pathname)
      this.setState({
        currentPageIndex: currentLinkIndex
      })
    }
  }

  handleLinkClick(currentPageIndex: number): void {
    this.props.history.push(linkList[currentPageIndex].link)
  }

  render() {
    const { currentPageIndex } = this.state
    return (
      <div className="header__container">
        <div className="header__wrap">
          <img className="logo" />
          <div className="link__container">
            {linkList.map((item, index) => {
              const { name, link } = item
              return (
                <div className="link__wrap" onClick={() => this.handleLinkClick(index)} key={index}>
                  <Link className={`link__item ${index === currentPageIndex && 'link__item--active'}`} to={link}>
                    {name}
                  </Link>
                </div>
              )
            })}
          </div>
          <div className="action__container">
            <button className="action__button">我要发布</button>
            <Link to="/register"><button className="action__button action__button--register">注册</button></Link>
            <Link to="/login"><button className="action__button action__button--login">登录</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)