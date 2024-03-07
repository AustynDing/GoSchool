import Searchbar from '@/components/Searchbar'
import { usePageNavigation } from '@/hooks/usePageNavigation'
import { responseData } from '@/pages/SearchMajorPage/components/MajorList'
import { responseSchoolData } from '@/pages/SearchSchoolPage/components/UniversityList'
import { List, Skeleton, Tabs } from 'antd'
import React from 'react'
import { useMaskContext } from '../../context/MaskContext'
import { RightBarContainer, TabContainer } from '../../style'
import { HotSpot, TabData, TabDataType, TabTitle } from './HotSpotData'
import {
  HotSpotListContainer,
  ItemContainer,
  NumberContainer,
  TitleContainer,
} from './style'

const fakeDataUrl = 'api/universitylist'
function HotSpotList({
  list,
  hotSpotType,
}: {
  list: HotSpot[]
  hotSpotType: TabTitle
}) {
  const { goToSearchSchoolPage, goToSearchMajorPage } = usePageNavigation()
  const targetRef = React.useRef('')
  return (
    <HotSpotListContainer>
      <List
        split={false}
        dataSource={list}
        renderItem={(item: HotSpot, index) => (
          <ItemContainer>
            <List.Item
              onClick={() => {
                if (hotSpotType === '政策分析') {
                  window.open(item.link, '_blank')
                } else if (hotSpotType === '院校热搜') {
                  targetRef.current = item.title
                  goToSearchSchoolPage({
                    name: targetRef.current,
                  })
                } else if (hotSpotType === '专业热搜') {
                  targetRef.current = item.title
                  goToSearchMajorPage({
                    name: targetRef.current,
                  })
                }
              }}
            >
              <NumberContainer>{index + 1}</NumberContainer>
              <TitleContainer>{item.title}</TitleContainer>
            </List.Item>
          </ItemContainer>
        )}
      />
    </HotSpotListContainer>
  )
}

const generateItems = (data: TabDataType[]) => {
  return data.map((value: TabDataType, index) => ({
    key: '' + index,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {value.icon}
        {value.tabTitle}
      </div>
    ),
    children: (
      <HotSpotList list={value.dataSource} hotSpotType={value.tabTitle} />
    ),
  }))
}

// 在组件中使用generateItems函数生成items数组
export const HotSpotTopicContainer = React.memo(
  ({ show }: { show: boolean }) => {
    const [data, setData] = React.useState<TabDataType[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const TabContent = React.useMemo(() => {
      const items = generateItems(data)
      return isLoading ? (
        <Skeleton style={{ width: '300px' }} />
      ) : (
        <Tabs type="card" defaultActiveKey="1" items={items} />
      )
    }, [data, isLoading])
    React.useEffect(() => {
      fetch(fakeDataUrl)
        .then(res => res.json())
        .then((res: responseSchoolData) => {
          const { page } = res
          TabData[1].dataSource = page.map(value => ({
            title: value.name,
            link: value.website,
          }))
          setData(TabData) // 更新数据到状态变量
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          setIsLoading(false)
        })
      fetch('/data/mockMajorData.json')
        .then(res => res.json())
        .then((res: responseData) => {
          const { page } = res
          TabData[2].dataSource = page.map(value => ({
            title: value.name,
            link: value.website,
          }))
          setData(TabData) // 更新数据到状态变量
        })
    }, [])
    const options = React.useMemo(() => {
      if (data.length > 1 && data[1].dataSource) {
        return data[1].dataSource.map(value => value.title)
      }
      return []
    }, [data])
    const onSearch = useMaskContext().onSearch
    return (
      <RightBarContainer show={show}>
        <Searchbar
          onSearch={onSearch}
          style={{ width: '100%', marginBottom: '5px' }}
          optionsData={options}
          placeholder={'快搜索你感兴趣的学校吧！'}
        />
        <TabContainer>{TabContent}</TabContainer>
      </RightBarContainer>
    )
  },
)
