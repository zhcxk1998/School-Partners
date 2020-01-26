import React, { useEffect, FC } from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const LoadingPage: FC = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])
  return (
    <div className="load-component" />
  )
}

const LoadableComponent = (component: () => Promise<any>) => Loadable({
  loader: component,
  loading: () => <LoadingPage />,
})

export default LoadableComponent
