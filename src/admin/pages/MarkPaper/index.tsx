import React, { FC, ComponentType, useEffect, useRef, RefObject, useState, FormEvent } from 'react'
import { CustomBreadcrumb } from '@/admin/components'
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import {
  Slider, Radio, Button, Input, Tooltip
} from 'antd';

import './index.scss'
import { RadioChangeEvent } from 'antd/lib/radio';

type MarkPaperProps = RouteComponentProps & FormComponentProps

// 会引起内存泄漏，组件挂载后，不会销毁变量，需要手动销毁
let pointX: number = 0
let pointY: number = 0
let scale: number = 1
let translatePointX = 0
let translatePointY = 0
let lineWidth = 5

const MarkPaper: FC<MarkPaperProps> = (props: MarkPaperProps) => {
  console.log('render')
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null)
  const containerRef: RefObject<HTMLDivElement> = useRef(null)
  const wrapRef: RefObject<HTMLDivElement> = useRef(null)
  const [mouseType, setMouseType] = useState<number>(0)
  const [imgSrc, setImgSrc] = useState<any>('')
  const [width, setWidth] = useState<number>(5)
  const [color, setColor] = useState<string>('#fa4b2a')

  const img: HTMLImageElement = new Image()
  img.src = imgSrc
  // 不设置图片跨域，则无法使用toDataUrl
  img.setAttribute('crossOrigin', 'anonymous')

  // let pointX: number = initX
  // let pointY: number = initY
  // let scale: number = initScale

  useEffect(() => {
    // console.log(getPreImageInfo())
    fillImage()

    return (() => {
      pointX = 0
      pointY = 0
      scale = 1
    })
  }, [])

  useEffect(() => {
    handleCanvas()
  }, [mouseType, width, color])

  const getURLBase64 = (url: string) => {
    return new Promise<any>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status === 200) {
          const blob = this.response
          const fileReader = new FileReader()
          fileReader.onloadend = function (e) {
            const { target } = e
            const result = target?.result
            img.src = result?.toString() || ''
            setImgSrc(result)
            resolve(result)
          }
          fileReader.readAsDataURL(blob)
        }
      }
      xhr.onerror = function () {
        reject()
      }
      xhr.send()
    })
  }

  const fillImage = async () => {
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    if (!canvas || !wrap) return
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    const img = new Image()
    img.src = await getURLBase64('http://cdn.algbb.cn//test/canvasTest.jpg')
    img.onload = function () {
      // 取中间渲染图片
      // const centerX: number = canvas && canvas.width / 2 - img.width / 2 || 0
      // const centerY: number = canvas && canvas.height / 2 - img.height / 2 || 0
      canvas.width = img.width
      canvas.height = img.height
      context?.drawImage(img, pointX, pointY)
      canvas.style.transformOrigin = `${wrap?.offsetWidth / 2}px ${wrap?.offsetHeight / 2}px`
    }
  }

  const handleLineMode = (downX: number, downY: number) => {
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    if (!canvas || !wrap) return

    const offsetLeft: number = canvas.offsetLeft
    const offsetTop: number = canvas.offsetTop
    // 减去画布便宜的距离（以画布为基准进行计算坐标）
    downX = downX - offsetLeft
    downY = downY - offsetTop

    const wrapWidth: number = wrap.offsetWidth
    const wrapHeight: number = wrap.offsetHeight
    context?.beginPath()
    context?.moveTo(((wrapWidth / 2) - downX) / scale * (scale - 1) + downX - translatePointX,
      ((wrapHeight / 2) - downY) / scale * (scale - 1) + downY - translatePointY)
    canvas.onmousemove = (event: MouseEvent) => {

      const moveX: number = event.pageX - offsetLeft
      const moveY: number = event.pageY - offsetTop
      context?.lineTo(((wrapWidth / 2) - moveX) / scale * (scale - 1) + moveX - translatePointX,
        ((wrapHeight / 2) - moveY) / scale * (scale - 1) + moveY - translatePointY)
      context?.stroke()
    }
    canvas.onmouseup = () => {
      context?.closePath()
      canvas.onmousemove = null
      canvas.onmouseup = null
    }
  }

  const handleMoveMode = (downX: number, downY: number) => {
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    if (!canvas || !wrap || mouseType !== 0) return

    // 为容器添加移动事件，可以在空白处移动图片
    wrap.onmousemove = (event: MouseEvent) => {
      const moveX: number = event.pageX
      const moveY: number = event.pageY

      translatePointX = pointX + (moveX - downX)
      translatePointY = pointY + (moveY - downY)

      canvas.style.transform = `scale(${scale},${scale}) translate(${translatePointX}px,${translatePointY}px)`
    }

    wrap.onmouseup = (event: MouseEvent) => {
      const upX: number = event.pageX
      const upY: number = event.pageY
      pointX = pointX + (upX - downX)
      pointY = pointY + (upY - downY)

      wrap.onmousemove = null
      wrap.onmouseup = null;
    }
  }

  const handleCanvas = () => {
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    if (!context || !wrap) return
    context.strokeStyle = color
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = width

    // 清除上一次设置的监听，以防获取参数错误
    wrap.onmousedown = null
    wrap.onmousedown = function (event: MouseEvent) {
      const downX: number = event.pageX
      const downY: number = event.pageY
      console.log('downX: ', downX)

      mouseType === 0
        ? handleMoveMode(downX, downY)
        : handleLineMode(downX, downY)
    }
  }

  const handleScaleChange = (value: number) => {
    const { current: canvas } = canvasRef
    scale = value / 50
    canvas && (canvas.style.transform = `scale(${scale},${scale}) translate(${translatePointX}px,${translatePointY}px)`)
  }

  const handleLineWidthChange = (value: number) => {
    lineWidth = value
    setWidth(value)
  }

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  const handleMouseModeChange = (event: RadioChangeEvent) => {
    const { target: { value } } = event
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    const MOVE_MODE: number = 0
    const LINE_MODE: number = 1

    if (!canvas || !wrap) return
    switch (value) {
      case MOVE_MODE:
        canvas.style.cursor = 'move'
        wrap.style.cursor = 'move'
        break
      case LINE_MODE:
        canvas.style.cursor = `url('http://cdn.algbb.cn/pointer.ico') 6 26, pointer`
        wrap.style.cursor = 'default'
        break
      default:
        canvas.style.cursor = 'default'
        wrap.style.cursor = 'default'
        break
    }

    setMouseType(value)
  }

  const handleSaveClick = () => {
    const { current: canvas } = canvasRef
    console.log(canvas?.toDataURL())
  }

  return (
    <div>
      <CustomBreadcrumb list={['内容管理', '批阅作业']} />
      <div className="mark-paper__container" ref={containerRef}>
        <div className="mark-paper__wrap" ref={wrapRef}>
          <canvas
            ref={canvasRef}
            className="mark-paper__canvas"
          >
            <p>很可惜，这个东东与您的电脑不搭！</p>
          </canvas>
        </div>
        <div className="mark-paper__sider">
          <div>
            缩放：
            <Slider
              defaultValue={50}
              tipFormatter={(value) => `${(value / 50).toFixed(2)}x`}
              onChange={handleScaleChange} />
          </div>
          <div>
            画笔大小：
            <Slider
              min={1}
              max={9}
              value={width}
              tipFormatter={(value) => `${value}px`}
              onChange={handleLineWidthChange} />
          </div>
          <div>
            <Radio.Group
              onChange={handleMouseModeChange}
              value={mouseType}>
              <Radio value={0}>移动</Radio>
              <Radio value={1}>画笔</Radio>
            </Radio.Group>
          </div>
          <div className="color-picker__container">
            {['#fa4b2a', '#ffff00', '#ee00ee', '#1890ff', '#333333', '#ffffff'].map(color => {
              return (
                <Tooltip placement="top" title={color}>
                  <div
                    key={color}
                    role="button"
                    className="color-picker__wrap"
                    style={{ background: color }}
                    onClick={() => handleColorChange(color)}
                  />
                </Tooltip>
              )
            })}
          </div>
          <Button onClick={handleSaveClick}>保存图片</Button>
        </div>
      </div>
    </div >
  )
}

export default MarkPaper as ComponentType