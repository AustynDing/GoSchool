import dynamic from 'next/dynamic'
import { Mask } from './style'
import { Card, Divider, Tag, Space, Popover, Button, Spin, Select } from 'antd'
const UniversityScoreLine = dynamic(() => import('./UniversityScoreLine'), {
  ssr: false,
})
// import UniversityScoreLine from './UniversityScoreLine'
const UniversityMajorPlan = dynamic(() => import('./UniversityMajorPlan'), {
  ssr: false,
})
import UniversityScoreLineTable from './UniversityScoreLineTable'
// import UniversityMajorPlan from './UniversityMajorPlan'
import type { ScorelineDataType, UniversityDetailProps } from '../type'
import UniersityOverview from './UniversityOverview'
import {
  FieldTimeOutlined,
  FlagOutlined,
  EnvironmentOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons'
const UniversityRank = dynamic(() => import('./UniversityRank'), { ssr: false })
// import UniversityRank from './UniversityRank'
const GenderRatioChart = dynamic(() => import('./UniversityGenderRatio'), {
  ssr: false,
})
// import GenderRatioChart from './UniversityGenderRatio'
import UniversityEnvironment from './UniversityEvironment'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TagColorMap, tagsType } from './UniversityList'
import { province } from '../enum'

interface DetailData {
  scorelineData: { year: number; score: number; type: '文史' | '理工' }[]
  majorData: {
    key: number
    major: string[]
    majorGroup: string
    admissionType: string
    requirement: string
    year: number
    scoreLine: number
    category: string
  }[]
  rankData: {
    year: number
    rank: number
    type: 'USNews' | 'QS' | 'THE' | 'ARWU'
  }[]
  genderRatio: { female: number; male: number }
}
export default function UniversityDetail(data: UniversityDetailProps) {
  const [tableData, setTableData] = useState<ScorelineDataType[]>([]) // 提取唯一年份
  const [detailData, setDetailData] = useState<DetailData>({} as DetailData)
  const linkRefs = useRef<(HTMLDivElement | null)[]>([])
  const dataChange = useRef<'' | 'scoreLineData' | 'majorData'>('') // 很蹩脚的手段 - 用于区分历年分数和专业组分数数据更新的区别
  const [scoreLineIsLoading, setScoreLineIsLoading] = useState(false)
  const [majorIsLoading, setMajorIsLoading] = useState(false)
  const provinces = Object.values(province)
    .filter(value => value !== province.None)
    .map(province => ({
      label: province,
      value: province,
    }))
  const scrollInToSection = useCallback(
    (index: number) => {
      linkRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
    [linkRefs.current],
  )
  const LoadData = useCallback(() => {
    if (dataChange.current === 'scoreLineData') {
      setScoreLineIsLoading(true)
    } else {
      setMajorIsLoading(true)
    }
    fetch(`api/universityDetail?target=${data.name}`, {
      method: 'POST',
      body: JSON.stringify({
        // Add parameters here
        tags: data.tags,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then((res: DetailData) => {
        let data: ScorelineDataType[] = []
        const years = Array.from(
          new Set(res.scorelineData.map(item => item.year)),
        )
        years.forEach((year, index) => {
          const newDataItem: ScorelineDataType = {
            key: `${index + 1}`,
            arts:
              res.scorelineData.find(
                item => item.year === year && item.type === '文史',
              )?.score || 0,
            science:
              res.scorelineData.find(
                item => item.year === year && item.type === '理工',
              )?.score || 0,
            year: year,
          }
          data.push(newDataItem)
        })
        if (dataChange.current !== 'majorData') {
          setTableData(data)
        }
        setDetailData(prev => {
          if (dataChange.current === 'scoreLineData') {
            return {
              ...res,
              majorData: prev.majorData, // 如果是scoreLineData，不修改的应该是majorData
            }
          } else if (dataChange.current === 'majorData') {
            return {
              ...res,
              scorelineData: prev.scorelineData,
            }
          } else {
            return res
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setMajorIsLoading(false)
        setScoreLineIsLoading(false)
      })
  }, [])
  useEffect(LoadData, [])

  const content = (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {[
        '学校简介',
        '学校概况',
        '历年分数',
        '专业组分数',
        '大学排名',
        '校园情况',
      ].map((value, index) => (
        <div>
          <a onClick={() => scrollInToSection(index)}>{value}</a>
        </div>
      ))}
    </div>
  )

  return (
    <div
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        marginTop: '-13px',
        height: '85vh',
        paddingBottom: '100px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: '1',
          right: '10px',
          top: '10px',
        }}
      >
        <Popover
          title={
            <h1
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              页内导航
            </h1>
          }
          trigger="click"
          content={content}
        >
          <Button>
            <NodeIndexOutlined />
            页内导航
          </Button>
        </Popover>
      </div>
      <div
        style={{
          width: '100%',
          height: '20vh',
          backgroundColor: '#ffffff',
          backgroundImage: `url(${data.backgroundUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <Mask />
      </div>
      <div
        ref={el => (linkRefs.current[0] = el)}
        style={{
          marginTop: '-75px',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '-20px',
        }}
      >
        <img src={data.logoUrl} style={{ width: '150px', height: '150px' }} />
        <h1 style={{ marginTop: '85px' }}>
          {data.name}
          <Space style={{ marginLeft: '10px' }} size={[0, 4]} wrap>
            {data.tags.map((value: tagsType) => {
              return TagColorMap[value] ? (
                <Tag color={TagColorMap[value]}>{value}</Tag>
              ) : null
            })}
          </Space>
        </h1>
      </div>
      <Card size="small" style={{ width: '100%' }}>
        <p>{data.description}</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FieldTimeOutlined
              style={{ marginRight: '5px', color: '#1677FF' }}
            />
            <p style={{ marginRight: '5px' }}>建校时间:</p>
            <p>{data.created}</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FlagOutlined style={{ marginRight: '5px', color: '#1677FF' }} />
            <p style={{ marginRight: '5px' }}>主管部门:</p>
            <p>{data.dominant}</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <EnvironmentOutlined
              style={{ marginRight: '5px', color: '#1677FF' }}
            />
            <p style={{ marginRight: '5px' }}>学校地址:</p>
            <div style={{ flexDirection: 'column' }}>
              {data.location.map((item, index) => {
                return (
                  <>
                    <p style={{ margin: '0' }} key={index}>
                      {item.name}: {item.place}
                    </p>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </Card>
      {detailData.scorelineData ? (
        <>
          <div ref={el => (linkRefs.current[1] = el)}></div>
          <Divider orientation="left">学校概况</Divider>
          <UniersityOverview />
          <div ref={el => (linkRefs.current[2] = el)}></div>
          <Divider orientation="left">
            历年分数
            <Select
              style={{ marginLeft: '5px', width: '85px' }}
              options={provinces}
              defaultValue={'江苏'}
              placement="bottomLeft"
              onSelect={() => {
                dataChange.current = 'scoreLineData'
                LoadData()
              }}
            />
          </Divider>
          <Spin spinning={scoreLineIsLoading}>
            <div
              style={{
                height: '300px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Card size="small" style={{ width: '49.5%', height: '300px' }}>
                <UniversityScoreLine data={detailData.scorelineData} />
              </Card>
              <Card size="small" style={{ width: '49.5%', height: '300px' }}>
                <UniversityScoreLineTable data={tableData} />
              </Card>
            </div>
          </Spin>

          <div ref={el => (linkRefs.current[3] = el)}></div>
          <Divider orientation="left">
            专业组分数
            <Select
              style={{ marginLeft: '5px', width: '85px' }}
              options={provinces}
              defaultValue={'江苏'}
              placement="bottomLeft"
              onSelect={() => {
                dataChange.current = 'majorData'
                LoadData()
              }}
            />
          </Divider>
          <Spin spinning={majorIsLoading}>
            <UniversityMajorPlan data={detailData.majorData} />
          </Spin>
          <div ref={el => (linkRefs.current[4] = el)}></div>
          <Divider orientation="left">大学排名</Divider>
          <Card size="small" style={{ height: '300px' }}>
            <UniversityRank data={detailData.rankData} />
          </Card>
          <div ref={el => (linkRefs.current[5] = el)}></div>
          <Divider orientation="left">校园情况</Divider>
          <div
            style={{
              height: '300px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Card size="small" style={{ height: '300px', width: '49.5%' }}>
              <GenderRatioChart
                male={detailData.genderRatio.male}
                female={detailData.genderRatio.female}
              />
            </Card>
            <UniversityEnvironment style={{ width: '49.5%' }} />
          </div>
        </>
      ) : (
        <div
          style={{
            width: '100%',
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin style={{ margin: 'auto' }} />
        </div>
      )}
    </div>
  )
}
