import React, { FC, ComponentType, FormEvent, useState, useEffect } from 'react'
import { CustomBreadcrumb } from '@/admin/components'
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form,
  Input,
  Col,
  Row,
  Switch,
  Button,
  Icon,
  Tooltip,
  message,
  Upload,
  Select
} from 'antd';
import {
  ClassNameRules,
  ClassTagsRules,
  ClassTeacherRules
} from './formValidate'
import { observer } from 'mobx-react'

import http from '@/admin/utils/http'

import './index.scss'
import { useStore } from '@/admin/hooks/useStore';

const { Option } = Select;

type classProps = RouteComponentProps & FormComponentProps

interface FormLayout {
  labelCol: object,
  wrapperCol: object,
  labelAlign?: 'left' | 'right' | undefined
}

interface TagInfo {
  id: number,
  tagName: string
}

interface ClassInfo {
  id: number,
  classTag: number
  classMember: number
  className: string,
  classCode: string,
  classTeacher: string,
  classAvatar: string,
  isChecked: boolean
}

const ClassDashboard: FC<classProps> = (props: classProps) => {
  const [classCode, setClassCode] = useState<string>('')
  const [classAvatar, setClassAvatar] = useState<string>('http://cdn.algbb.cn/emoji/32.png')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tagList, setTagList] = useState<TagInfo[]>([])
  const [classInfo, setClassInfo] = useState<ClassInfo>({
    id: 0,
    classTag: 0,
    classMember: 0,
    className: '',
    classCode: '',
    classTeacher: '',
    classAvatar: '',
    isChecked: false
  })

  const { userInfoStore } = useStore()
  const { setIsActived } = userInfoStore

  const { form } = props
  const { getFieldDecorator } = form
  const formLayout: FormLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 15,
      offset: 1
    }
  }

  const uploadButton = (
    <div>
      <Icon type={isLoading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  useEffect(() => {
    getTagList()
    getClassInfo()
  }, [])

  const getTagList = async () => {
    const { data: { tagList } } = await http.get('/tags')
    setTagList(tagList)
  }

  const getClassInfo = async () => {
    const { data: { classInfo } } = await http.get('/classes')
    const { classCode } = classInfo
    setClassCode(classCode)
    setClassInfo(classInfo)
  }

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    const { form } = props
    const { setFields, validateFieldsAndScroll } = form
    if (!classCode) {
      setFields({ classCode: { errors: [new Error('请生成课程随机码')] } })
    }
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { className, classTeacher, classTag, isChecked } = values
        const { data: { msg } } = await http.put('/classes', {
          className,
          classTeacher,
          classTag,
          classCode,
          classAvatar,
          isChecked
        })
        setIsActived(true)
        message.success(msg)
      }
    })
  }


  const getBase64 = (img: File, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleAvatarUpload = ({ file }: { file: File }) => {
    setIsLoading(true)
    getBase64(file, (imageUrl: string) => {
      setClassAvatar(imageUrl)
      setIsLoading(false)
    });
  }

  const handleRandomClick = () => {
    const { form } = props
    const { setFields } = form

    const randomList: string = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM'
    const randomCode: string = randomList.split('').sort(() => Math.random() - 0.5).join('').slice(0, 6)

    setFields({ classCode: { values: randomCode } })
    setClassCode(randomCode)
  }

  return (
    <div>
      <CustomBreadcrumb list={['班级建设', '班级管理']} />
      <div className="class-dashboard__container">
        <div className="form__title">班级信息</div>
        <Form layout="horizontal" {...formLayout} hideRequiredMark>
          <Form.Item label="班级名称">
            {getFieldDecorator('className', {
              rules: ClassNameRules,
              initialValue: classInfo.className
            })(<Input />)}
          </Form.Item>
          <Form.Item label="班级老师">
            {getFieldDecorator('classTeacher', {
              rules: ClassTeacherRules,
              initialValue: classInfo.classTeacher
            })(<Input />)}
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="班级标签" labelCol={{
                span: 8
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('classTag', {
                  rules: ClassTagsRules,
                  initialValue: classInfo.classTag
                })(<Select >
                  {tagList.map((tag: TagInfo) => {
                    const { id, tagName } = tag
                    return (
                      <Option key={id} value={id}>{tagName}</Option>
                    )
                  })}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="班级代码" labelCol={{
                span: 4
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('classCode', {
                })(
                  <div className="class-dashboard__code">
                    {classCode}
                    <Tooltip title="刷新">
                      <Icon className="icon" type="redo" onClick={handleRandomClick} />
                    </Tooltip>
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={
            <span>
              开启审核&nbsp;
              <Tooltip title="是否允许任何人通过输入班级代码加入班级">
                <Icon type="question-circle" />
              </Tooltip>
            </span>
          }>
            {getFieldDecorator('isChecked', {
              initialValue: classInfo.isChecked,
              valuePropName: 'checked'
            })(
              <Switch />
            )}
          </Form.Item>
          <Form.Item label="班级头像">
            {getFieldDecorator('classAvatar', {

            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={handleAvatarUpload}
                accept=".png,.jpg,.jpeg"
              >
                {classAvatar ? <img src={classAvatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5 }}>
            <Button type="primary" size="large" onClick={handleFormSubmit}>立即提交</Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}

export default Form.create({ name: 'classForm' })(observer(ClassDashboard)) as ComponentType