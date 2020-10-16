import React, { FC, ComponentType, useEffect, useRef, RefObject, useState, MutableRefObject } from 'react'
import { CustomBreadcrumb } from '@/admin/components'
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import {
  Slider,
  Radio,
  Button,
  Tooltip,
  Icon,
  Select,
  Spin,
  message,
  Popconfirm,
  Form
} from 'antd';

import './index.scss'
import { RadioChangeEvent } from 'antd/lib/radio';
import { getURLBase64 } from '@/admin/utils/getURLBase64'
import { ExerciseListProps, ExerciseIndexList, ExerciseStudentList } from '@/admin/modals/exerciseList'
import { prefix } from '@/admin/utils/common'
import { SelectValue } from 'antd/lib/select';
import http from '@/admin/utils/http'
const { Option, OptGroup } = Select;

type MarkPaperProps = RouteComponentProps & FormComponentProps

const MarkPaper: FC<MarkPaperProps> = (props: MarkPaperProps) => {
  const { form } = props
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = form


  /* 画布字段 */
  const MOVE_MODE: number = 0
  const LINE_MODE: number = 1
  const ERASER_MODE: number = 2
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null)
  const containerRef: RefObject<HTMLDivElement> = useRef(null)
  const wrapRef: RefObject<HTMLDivElement> = useRef(null)
  const translatePointXRef: MutableRefObject<number> = useRef(0)
  const translatePointYRef: MutableRefObject<number> = useRef(0)
  const fillStartPointXRef: MutableRefObject<number> = useRef(0)
  const fillStartPointYRef: MutableRefObject<number> = useRef(0)
  const canvasHistroyListRef: MutableRefObject<ImageData[]> = useRef([])
  const [lineColor, setLineColor] = useState<string>('#fa4b2a')
  const [fillImageSrc, setFillImageSrc] = useState<string>('')
  const [mouseMode, setmouseMode] = useState<number>(MOVE_MODE)
  const [lineWidth, setLineWidth] = useState<number>(5)
  const [canvasScale, setCanvasScale] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [canvasCurrentHistory, setCanvasCurrentHistory] = useState<number>(0)

  /* 信息字段 */
  const [exerciseList, setExerciseList] = useState<ExerciseListProps[]>([])
  const [exerciseId, setExerciseId] = useState<number>(0)
  const [exerciseIndex, setExerciseIndex] = useState<number>(0)
  const [exerciseIndexList, setExerciseIndexList] = useState<ExerciseIndexList[]>([])
  const [exerciseStudentList, setExerciseStudentList] = useState<ExerciseStudentList[]>([])
  const [classId, setClassId] = useState<number>(0)

  useEffect(() => {
    // setFillImageSrc('http://cdn.algbb.cn/test/canvasTest.jpg')
  }, [])

  // 重置变换参数，重新绘制图片
  useEffect(() => {
    fillImageSrc !== '' && setIsLoading(true)
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
  }, [mouseMode, canvasScale, canvasCurrentHistory])

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

  useEffect(() => {
    const { current: canvas } = canvasRef
    const { current: canvasHistroyList } = canvasHistroyListRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    if (!canvas || !context || canvasCurrentHistory === 0) return
    context?.putImageData(canvasHistroyList[canvasCurrentHistory - 1], 0, 0)
  }, [canvasCurrentHistory])

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

      // 背景设置为图片，橡皮擦的效果才能出来
      canvas.style.background = `url(${img.src})`
      context.drawImage(img, 0, 0)
      context.strokeStyle = lineColor
      context.lineWidth = lineWidth
      context.lineJoin = 'round'
      context.lineCap = 'round'

      // 设置变化基点，为画布容器中央
      canvas.style.transformOrigin = `${wrap?.offsetWidth / 2}px ${wrap?.offsetHeight / 2}px`
      // 清除上一次变化的效果
      canvas.style.transform = ''
      const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height)
      canvasHistroyListRef.current = []
      canvasHistroyListRef.current.push(imageData)
      // canvasCurrentHistoryRef.current = 1
      setCanvasCurrentHistory(1)
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
    if (!canvas || !wrap || !context) return

    const offsetLeft: number = canvas.offsetLeft
    const offsetTop: number = canvas.offsetTop
    // 减去画布偏移的距离（以画布为基准进行计算坐标）
    downX = downX - offsetLeft
    downY = downY - offsetTop

    const { pointX, pointY } = generateLinePoint(downX, downY)
    context.globalCompositeOperation = "source-over"
    context.beginPath()
    context.moveTo(pointX, pointY)

    canvas.onmousemove = null
    canvas.onmousemove = (event: MouseEvent) => {
      const moveX: number = event.pageX - offsetLeft
      const moveY: number = event.pageY - offsetTop
      const { pointX, pointY } = generateLinePoint(moveX, moveY)
      context.lineTo(pointX, pointY)
      context.stroke()
    }
    canvas.onmouseup = () => {
      const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height)

      // 如果此时处于撤销状态，此时再使用画笔，则将之后的状态清空，以刚画的作为最新的画布状态
      if (canvasCurrentHistory < canvasHistroyListRef.current.length) {
        canvasHistroyListRef.current = canvasHistroyListRef.current.slice(0, canvasCurrentHistory)
      }
      canvasHistroyListRef.current.push(imageData)
      setCanvasCurrentHistory(canvasCurrentHistory + 1)
      context.closePath()
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

  // 目前橡皮擦还有点问题，前端显示正常，保存图片下来，擦除的痕迹会变成白色
  const handleEraserMode = (downX: number, downY: number) => {
    const { current: canvas } = canvasRef
    const { current: wrap } = wrapRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    if (!canvas || !wrap || !context) return

    const offsetLeft: number = canvas.offsetLeft
    const offsetTop: number = canvas.offsetTop
    downX = downX - offsetLeft
    downY = downY - offsetTop

    const { pointX, pointY } = generateLinePoint(downX, downY)

    context.beginPath()
    context.moveTo(pointX, pointY)

    canvas.onmousemove = null
    canvas.onmousemove = (event: MouseEvent) => {
      const moveX: number = event.pageX - offsetLeft
      const moveY: number = event.pageY - offsetTop
      const { pointX, pointY } = generateLinePoint(moveX, moveY)
      context.globalCompositeOperation = "destination-out"
      context.lineWidth = lineWidth
      context.lineTo(pointX, pointY)
      context.stroke()
    }
    canvas.onmouseup = () => {
      const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height)
      if (canvasCurrentHistory < canvasHistroyListRef.current.length) {
        canvasHistroyListRef.current = canvasHistroyListRef.current.slice(0, canvasCurrentHistory)
      }
      canvasHistroyListRef.current.push(imageData)
      setCanvasCurrentHistory(canvasCurrentHistory + 1)
      context.closePath()
      canvas.onmousemove = null
      canvas.onmouseup = null
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
        case ERASER_MODE:
          handleEraserMode(downX, downY)
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
        canvas.style.cursor = `url('http://cdn.algbb.cn/pencil.ico') 6 26, pointer`
        wrap.style.cursor = 'default'
        break
      case ERASER_MODE:
        message.warning('橡皮擦功能尚未完善，保存图片会出现错误')
        canvas.style.cursor = `url('http://cdn.algbb.cn/eraser.ico') 6 26, pointer`
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
      'xueshengjia': 'http://cdn.algbb.cn/test/canvasTest.jpg',
      'xueshengyi': 'http://cdn.algbb.cn/test/canvasTest2.png',
      'xueshengbing': 'http://cdn.algbb.cn/emoji/30.png',
    }
    setFillImageSrc(fillImageList[value])
  }

  const handleRollBack = () => {
    const isFirstHistory: boolean = canvasCurrentHistory === 1
    if (isFirstHistory) return
    setCanvasCurrentHistory(canvasCurrentHistory - 1)
  }

  const handleRollForward = () => {
    const { current: canvasHistroyList } = canvasHistroyListRef
    const isLastHistory: boolean = canvasCurrentHistory === canvasHistroyList.length
    if (isLastHistory) return
    setCanvasCurrentHistory(canvasCurrentHistory + 1)
  }

  const handleClearCanvasClick = () => {
    const { current: canvas } = canvasRef
    const context: CanvasRenderingContext2D | undefined | null = canvas?.getContext('2d')
    if (!canvas || !context || canvasCurrentHistory === 0) return

    // 清空画布历史
    canvasHistroyListRef.current = [canvasHistroyListRef.current[0]]
    setCanvasCurrentHistory(1)

    message.success('画布清除成功！')
  }

  /* 获取题库 */
  useEffect(() => {
    getExerciseList()
  }, [])

  const getExerciseList = async () => {
    const { data = {} } = await http.get(`${prefix}/exercises`)
    const { exerciseList = [] } = data

    setExerciseList([...exerciseList])
  }

  const handleExerciseIdChange = async (value: SelectValue) => {
    const { uploadExerciseList } = await http.get(`${prefix}/mark/paper/getExercises?exerciseId=${value}`)
    setExerciseId(+value)
    setExerciseIndexList([...uploadExerciseList])

    /* 切换时，清空先前选项 */
    form.resetFields(['index', 'student'])
  }

  const handleExerciseIndexChange = async (value: SelectValue) => {
    const { classId, studentList } = await http.get(`${prefix}/mark/paper?exerciseId=${exerciseId}&exerciseIndex=${value}`)
    setClassId(classId)
    setExerciseIndex(+value)
    setExerciseStudentList([...studentList])

    /* 切换时，清空先前选项 */
    form.resetFields(['student'])
  }

  const handleExerciseStudentChange = async (value: SelectValue) => {
    // const data = exerciseStudentList.filter(item => item.studentId === +value)
    const imgPath = `http://cdn.algbb.cn/uploadImage/exercise/${classId}/${exerciseId}/${exerciseIndex}/${value}.png`
    setFillImageSrc(imgPath)
  }

  return (
    <div>
      <CustomBreadcrumb list={['内容管理', '批阅作业']} />
      <div className="mark-paper__container" ref={containerRef}>
        <div className="mark-paper__wrap" ref={wrapRef}>
          <div className="mark-paper__tips" style={{ display: fillImageSrc === '' ? 'flex' : 'none' }}>
            右侧完善基本信息<br />即可编辑图片
          </div>
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
          <Form>
            <div>
              选择题库：
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('id', {
                })(<Select
                  style={{
                    width: '100%', margin: '10px 0 20px 0'
                  }}
                  placeholder="请选择题库"
                  onChange={handleExerciseIdChange} >
                  {exerciseList.map((item) => {
                    const { id, exerciseName } = item
                    return (
                      <Option value={id} key={id}>{exerciseName}</Option>
                    )
                  })}
                </Select>)}
              </Form.Item>
            </div>
            <div>
              选择题目：
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('index', {
                })(<Select
                  notFoundContent="暂无文件上传题"
                  style={{
                    width: '100%', margin: '10px 0 20px 0'
                  }}
                  placeholder="请选择题目"
                  onChange={handleExerciseIndexChange} >
                  {exerciseIndexList.map((item) => {
                    const { index, topicContent } = item
                    return (
                      <Option value={index} key={index}>第{index + 1}题</Option>
                    )
                  })}
                </Select>)}
              </Form.Item>
            </div>
            <div>
              选择学生：
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('student', {
                })(<Select
                  notFoundContent="暂无已提交的学生"
                  placeholder="请选择学生"
                  style={{
                    width: '100%', margin: '10px 0 20px 0'
                  }}
                  onChange={handleExerciseStudentChange} >
                  {exerciseStudentList.map((item) => {
                    const { studentId, studentName } = item
                    return (
                      <Option value={studentId} key={studentId}>{studentName}</Option>
                    )
                  })}
                </Select>)}
              </Form.Item>
            </div>
            <div>
              画布操作：<br />
              <div className="mark-paper__action">
                <Tooltip title="撤销">
                  <i
                    className={`icon iconfont icon-chexiao ${canvasCurrentHistory <= 1 && 'disable'}`}
                    onClick={handleRollBack} />
                </Tooltip>
                <Tooltip title="恢复">
                  <i
                    className={`icon iconfont icon-fanhui ${canvasCurrentHistory >= canvasHistroyListRef.current.length && 'disable'}`}
                    onClick={handleRollForward} />
                </Tooltip>
                <Popconfirm
                  title="确定清空画布吗？"
                  onConfirm={handleClearCanvasClick}
                  okText="确定"
                  cancelText="取消"
                >
                  <Tooltip title="清空">
                    <i className="icon iconfont icon-qingchu" />
                  </Tooltip>
                </Popconfirm>
              </div>
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
                <Radio value={2}>橡皮擦</Radio>
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
          </Form>
        </div>
      </div>
    </div >
  )
}

export default Form.create({ name: 'MarkPaper' })(MarkPaper) as ComponentType