import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import { Table, Button, Popconfirm, Tag, Input, Empty, message } from 'antd';
import { ColumnProps } from 'antd/es/table'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { CustomBreadcrumb } from '@/admin/components'
import { CourseList } from '@/admin/modals/courseList'
import { FetchConfig } from '@/admin/modals/http'
import { useService } from '@/admin/hooks'
import http from '@/admin/utils/http'

import './index.scss'

const CourseList: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [fetchConfig, setFetchConfig] = useState<FetchConfig>({
    url: '', method: 'GET', params: {}, config: {}
  })
  const [fetchFlag, setFetchFlag] = useState<number>(0)
  const hasSelected: boolean = selectedRowKeys.length > 0
  const { history } = props

  useEffect(() => {
    const fetchConfig: FetchConfig = {
      url: '/courses',
      method: 'GET',
      params: {},
      config: {}
    }
    setFetchConfig(Object.assign({}, fetchConfig))
  }, [fetchFlag])

  const handleSelectedChange = (selectedRowKeys: number[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const handleSearchChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = changeEvent
    setSearchValue(value)
  }

  const handleEditClick = (exerciseId: number) => {
    history.push(`/admin/content/course-modify/${exerciseId}`)
  }

  const handleDeleteClick = async (exerciseId: number) => {
    const { data: { msg } } = await http.delete(`/courses/${exerciseId}`)
    setFetchFlag(fetchFlag + 1)
    setSelectedRowKeys([])
    message.success(msg)
  }

  const handleBatchDelete = async () => {
    const { data: { msg } } = await http.delete(`/courses`, {
      data: selectedRowKeys
    })
    setFetchFlag(fetchFlag + 1)
    setSelectedRowKeys([])
    message.success(msg)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectedChange,
  }

  const columns: ColumnProps<CourseList>[] = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 180,
      filteredValue: [searchValue],
      onFilter: (_, row) => (
        row.courseName.toString().indexOf(searchValue) !== -1
      )
    }, {
      title: '课程描述',
      dataIndex: 'courseDescription',
      key: 'courseDescription',
      ellipsis: true,
    }, {
      title: '课程作者',
      dataIndex: 'courseAuthor',
      key: 'courseAuthor',
      width: 120,
    },
    {
      title: '发布时间',
      dataIndex: 'publishDate',
      key: 'publishDate',
      width: 120,
      render: publishDate => new Date(publishDate).toLocaleDateString(),
      sorter: (a, b) => a.publishDate - b.publishDate
    }, {
      title: '是否推荐',
      dataIndex: 'isRecommend',
      key: 'isRecommend',
      width: 120,
      render: isRecommend => isRecommend ? '是' : '否',
      sorter: a => a.isRecommend ? 1 : -1
    }, {
      title: '操作',
      dataIndex: '',
      key: '',
      width: 180,
      render: (_, row) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleEditClick(row.id)}>编辑</Button>
          <Popconfirm
            title="确定删除此课程吗?"
            onConfirm={() => handleDeleteClick(row.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="danger">删除</Button>
          </Popconfirm>
        </span>
      )
    }
  ]
  const { isLoading = false, response } = useService(fetchConfig)
  const { data = {} } = response || {}
  const { courseList = [], total: totalPage = 0 } = data
  return (
    <div>
      <CustomBreadcrumb list={['内容管理', '课程管理']} />
      <div className="course-list__container">
        <div className="course-list__header">
          <Button type="primary" style={{ marginRight: 10 }} onClick={() => { history.push('/admin/content/exercise-publish') }}>新增课程</Button>
          <Popconfirm
            disabled={!hasSelected}
            title="确定删除这些课程吗?"
            onConfirm={handleBatchDelete}
            okText="确定"
            cancelText="取消"
          >
            <Button type="danger" disabled={!hasSelected}>批量删除</Button>
          </Popconfirm>

          <Input.Search
            className="search__container"
            value={searchValue}
            placeholder="请输入要查询的题目名称"
            onChange={handleSearchChange}
            enterButton />
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={courseList}
          columns={columns}
          rowKey="id"
          scroll={{
            y: "calc(100vh - 300px)"
          }}
          loading={{
            spinning: isLoading,
            tip: "加载中...",
            size: "large"
          }}
          pagination={{
            pageSize: 10,
            total: totalPage,
            current: currentPage,
            onChange: (pageNo) => setCurrentPage(pageNo)
          }}
          locale={{
            emptyText: <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无数据" />
          }}
        />
      </div>
    </div>
  )
}

export default withRouter(CourseList)