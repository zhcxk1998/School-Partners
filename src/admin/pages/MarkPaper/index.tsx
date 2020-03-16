import React, { FC, ComponentType, useEffect, useRef, RefObject, useState, MutableRefObject } from 'react'
import { CustomBreadcrumb } from '@/admin/components'
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import {
  Slider, Radio, Button, Tooltip, Icon, Select, Spin
} from 'antd';

import './index.scss'
import { RadioChangeEvent } from 'antd/lib/radio';
import { getURLBase64 } from '@/admin/utils/getURLBase64'

const { Option, OptGroup } = Select;

type MarkPaperProps = RouteComponentProps & FormComponentProps

const MarkPaper: FC<MarkPaperProps> = (props: MarkPaperProps) => {
  const MOVE_MODE: number = 0
  const LINE_MODE: number = 1
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null)
  const containerRef: RefObject<HTMLDivElement> = useRef(null)
  const wrapRef: RefObject<HTMLDivElement> = useRef(null)
  const translatePointXRef: MutableRefObject<number> = useRef(0)
  const translatePointYRef: MutableRefObject<number> = useRef(0)
  const fillStartPointXRef: MutableRefObject<number> = useRef(0)
  const fillStartPointYRef: MutableRefObject<number> = useRef(0)
  const [mouseMode, setmouseMode] = useState<number>(MOVE_MODE)
  const [lineWidth, setLineWidth] = useState<number>(5)
  const [lineColor, setLineColor] = useState<string>('#fa4b2a')
  const [canvasScale, setCanvasScale] = useState<number>(1)
  const [fillImageSrc, setFillImageSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setFillImageSrc('http://cdn.algbb.cn/test/canvasTest.jpg')
  }, [])

  // 重置变换参数，重新绘制图片
  useEffect(() => {
    setIsLoading(true)
    translatePointXRef.current = 0
    translatePointYRef.current = 0
    fillStartPointXRef.current = 0
    fillStartPointYRef.current = 0
    setCanvasScale(1)
    fillImage()
  }, [fillImageSrc])

  // 画布参数变动时，重新监听canvas
  useEffect(() => {
    handleCanvas()
  }, [mouseMode, canvasScale])

  // 监听画笔颜色变化
  useEffect(() => {
    const { current: canvas } = canvasRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    if (!context) return

    context.strokeStyle = lineColor
    context.lineWidth = lineWidth
    context.lineJoin = 'round'
    context.lineCap = 'round'
  }, [lineWidth, lineColor])

  //监听缩放画布
  useEffect(() => {
    const { current: canvas } = canvasRef
    const { current: translatePointX } = translatePointXRef
    const { current: translatePointY } = translatePointYRef
    canvas && (canvas.style.transform = `scale(${canvasScale},${canvasScale}) translate(${translatePointX}px,${translatePointY}px)`)
  }, [canvasScale])

  const fillImage = async () => {
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    const img: HTMLImageElement = new Image()

    if (!canvas || !wrap || !context) return

    img.src = await getURLBase64(fillImageSrc)
    img.onload = () => {
      // 取中间渲染图片
      // const centerX: number = canvas && canvas.width / 2 - img.width / 2 || 0
      // const centerY: number = canvas && canvas.height / 2 - img.height / 2 || 0
      canvas.width = img.width
      canvas.height = img.height
      // context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0)
      context.strokeStyle = lineColor
      context.lineWidth = lineWidth
      context.lineJoin = 'round'
      context.lineCap = 'round'

      // 设置变化基点，为画布容器中央
      canvas.style.transformOrigin = `${wrap?.offsetWidth / 2}px ${wrap?.offsetHeight / 2}px`
      // 清除上一次变化的效果
      canvas.style.transform = ''
      setTimeout(() => { setIsLoading(false) }, 500)
    }
  }

  const generateLinePoint = (x: number, y: number) => {
    const { current: wrap } = wrapRef
    const { current: translatePointX } = translatePointXRef
    const { current: translatePointY } = translatePointYRef
    const wrapWidth: number = wrap?.offsetWidth || 0
    const wrapHeight: number = wrap?.offsetHeight || 0
    // 缩放位移坐标变化规律
    // (transformOrigin - downX) / scale * (scale-1) + downX - translateX = pointX
    const pointX: number = ((wrapWidth / 2) - x) / canvasScale * (canvasScale - 1) + x - translatePointX
    const pointY: number = ((wrapHeight / 2) - y) / canvasScale * (canvasScale - 1) + y - translatePointY

    return {
      pointX,
      pointY
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
    console.log(canvasRef)
    downX = downX - offsetLeft
    downY = downY - offsetTop

    const { pointX, pointY } = generateLinePoint(downX, downY)

    console.log(downX, offsetLeft, pointX, translatePointXRef.current)

    context?.beginPath()
    context?.moveTo(pointX, pointY)

    canvas.onmousemove = null
    canvas.onmousemove = (event: MouseEvent) => {
      const moveX: number = event.pageX - offsetLeft
      const moveY: number = event.pageY - offsetTop
      const { pointX, pointY } = generateLinePoint(moveX, moveY)
      context?.lineTo(pointX, pointY)
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
    const { current: fillStartPointX } = fillStartPointXRef
    const { current: fillStartPointY } = fillStartPointYRef
    if (!canvas || !wrap || mouseMode !== 0) return

    // 为容器添加移动事件，可以在空白处移动图片
    wrap.onmousemove = (event: MouseEvent) => {
      const moveX: number = event.pageX
      const moveY: number = event.pageY

      translatePointXRef.current = fillStartPointX + (moveX - downX)
      translatePointYRef.current = fillStartPointY + (moveY - downY)

      canvas.style.transform = `scale(${canvasScale},${canvasScale}) translate(${translatePointXRef.current}px,${translatePointYRef.current}px)`
    }

    wrap.onmouseup = (event: MouseEvent) => {
      const upX: number = event.pageX
      const upY: number = event.pageY

      wrap.onmousemove = null
      wrap.onmouseup = null;

      fillStartPointXRef.current = fillStartPointX + (upX - downX)
      fillStartPointYRef.current = fillStartPointY + (upY - downY)
    }
  }

  const handleCanvas = () => {
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    if (!context || !wrap) return

    // 清除上一次设置的监听，以防获取参数错误
    wrap.onmousedown = null
    wrap.onmousedown = function (event: MouseEvent) {
      const downX: number = event.pageX
      const downY: number = event.pageY

      switch (mouseMode) {
        case MOVE_MODE:
          handleMoveMode(downX, downY)
          break
        case LINE_MODE:
          handleLineMode(downX, downY)
          break
        default:
          break
      }
    }

    wrap.onwheel = null
    wrap.onwheel = (e: MouseWheelEvent) => {
      const { deltaY } = e
      const newScale: number = deltaY > 0
        ? (canvasScale * 10 - 0.1 * 10) / 10
        : (canvasScale * 10 + 0.1 * 10) / 10
      if (newScale < 0.1 || newScale > 2) return
      setCanvasScale(newScale)
    }
  }

  const handleScaleChange = (value: number) => {
    setCanvasScale(value)
  }

  const handleLineWidthChange = (value: number) => {
    setLineWidth(value)
  }

  const handleColorChange = (color: string) => {
    setLineColor(color)
  }

  const handleMouseModeChange = (event: RadioChangeEvent) => {
    const { target: { value } } = event
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef

    setmouseMode(value)

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
  }

  const handleSaveClick = () => {
    const { current: canvas } = canvasRef
    // 可存入数据库或是直接生成图片
    console.log(canvas?.toDataURL())
  }

  const handlePaperChange = (value: string) => {
    const fillImageList = {
      'chenzikang': 'http://cdn.algbb.cn/test/canvasTest.jpg',
      'xueshengjia': 'http://cdn.algbb.cn/test/canvasTest2.png',
      'xueshengyi': 'http://cdn.algbb.cn/emoji/30.png',
    }
    setFillImageSrc(fillImageList[value])
  }

  return (
    <div>
      <CustomBreadcrumb list={['内容管理', '批阅作业']} />
      <div className="mark-paper__container" ref={containerRef}>
        <div className="mark-paper__wrap" ref={wrapRef}>
          <div
            className="mark-paper__mask"
            style={{ display: isLoading ? 'flex' : 'none' }}
          >
            <Spin
              tip="图片加载中..."
              indicator={<Icon type="loading" style={{ fontSize: 36 }} spin
              />}
            />
          </div>
          <canvas
            ref={canvasRef}
            className="mark-paper__canvas">
            <p>很可惜，这个东东与您的电脑不搭！</p>
          </canvas>
        </div>
        <div className="mark-paper__sider">
          <div>
            选择作业：
            <Select
              defaultValue="chenzikang"
              style={{
                width: '100%', margin: '10px 0 20px 0'
              }}
              onChange={handlePaperChange} >
              <OptGroup label="17软件一班">
                <Option value="chenzikang">陈子康</Option>
                <Option value="xueshengjia">学生甲</Option>
              </OptGroup>
              <OptGroup label="17软件二班">
                <Option value="xueshengyi">学生乙</Option>
              </OptGroup>
            </Select>
          </div>
          <div>
            画布缩放：
            <Tooltip placement="top" title='可用鼠标滚轮进行缩放'>
              <Icon type="question-circle" />
            </Tooltip>
            <Slider
              min={0.1}
              max={2.01}
              step={0.1}
              value={canvasScale}
              tipFormatter={(value) => `${(value).toFixed(2)}x`}
              onChange={handleScaleChange} />
          </div>
          <div>
            画笔大小：
            <Slider
              min={1}
              max={9}
              value={lineWidth}
              tipFormatter={(value) => `${value}px`}
              onChange={handleLineWidthChange} />
          </div>
          <div>
            模式选择：
            <Radio.Group
              className="radio-group"
              onChange={handleMouseModeChange}
              value={mouseMode}>
              <Radio value={0}>移动</Radio>
              <Radio value={1}>画笔</Radio>
            </Radio.Group>
          </div>
          <div>
            颜色选择：
            <div className="color-picker__container">
              {['#fa4b2a', '#ffff00', '#ee00ee', '#1890ff', '#333333', '#ffffff'].map(color => {
                return (
                  <Tooltip placement="top" title={color} key={color}>
                    <div
                      role="button"
                      className={`color-picker__wrap ${color === lineColor && 'color-picker__wrap--active'}`}
                      style={{ background: color }}
                      onClick={() => handleColorChange(color)}
                    />
                  </Tooltip>
                )
              })}
            </div>
          </div>
          <Button onClick={handleSaveClick}>保存图片</Button>
        </div>
      </div>
    </div >
  )
}

export default MarkPaper as ComponentType