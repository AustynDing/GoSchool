import React, { MutableRefObject } from 'react'
import RootLayout from '@/app/layout'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { CardListContainer, IconContainer, ToggleContainer } from './style'
import { useSlideAnimation } from '@/hooks/useSlideAnimation'
import { VideoSchoolType } from './data'
import { useToggle } from 'ahooks'
import { HotSpotTopicContainer } from './components/HotSpotList'
import { MaskContext } from './context/MaskContext'
import { CardDetail } from './components/CardDetail'
import { CardItem } from './components/CardDetail/CardItem'
import { MaskContainer } from './components/MaskContainer'
import { Empty, Skeleton } from 'antd'
import { useVirtualList } from '@/hooks/useVirtualList'
import { useReachBottom } from '@/hooks/useReachBottom'

const fakeUrl = 'api/videoList'
export default function VideoPlayPage() {
  const PageRef = React.useRef<HTMLDivElement>(null)
  const [isShown, { toggle }] = useToggle(true)
  const filterTarget = React.useRef('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [maskShown, setMaskShown] = React.useState<boolean>(false)
  const [targetIndex, setTargetIndex] = React.useState(0)
  const [targetRef, setTargetRef] = React.useState<
    React.RefObject<HTMLDivElement>
  >(React.createRef())
  const [data, setData] = React.useState<VideoSchoolType[]>([])
  const allDataList: MutableRefObject<VideoSchoolType[]> = React.useRef([])
  const LoadData = React.useCallback(() => {
    fetch(fakeUrl)
      .then(res => res.json())
      .then((res: VideoSchoolType[]) => {
        allDataList.current.push(...res)
        if (filterTarget.current !== '') {
          res = res.filter(value => value.schoolName === filterTarget.current)
        }
        setData(prev => [...prev, ...res])
        if (isLoading) {
          setIsLoading(false)
        }
      })
  }, [])
  const AnimationNode = React.useMemo(() => {
    return <CardDetail {...data[targetIndex]} />
  }, [targetIndex]) // TODO：点击卡片后货不对板
  const Animation = useSlideAnimation({
    targetRef: targetRef,
    direction: maskShown ? 'slide-in' : 'slide-out',
    pageRef: PageRef,
    contentNode: AnimationNode,
  })

  const searchTargetSchoolVideo = React.useCallback(
    (targetName: string) => {
      setIsLoading(true)
      filterTarget.current = targetName
      const filter = allDataList.current.filter(
        value => value.schoolName === targetName,
      )
      setData([...filter])
      LoadData()
    },
    [data],
  )

  return (
    <div style={{ height: '100%', width: '100%' }} ref={PageRef}>
      <MaskContext.Provider
        value={{
          shown: maskShown,
          toggle: setMaskShown,
          setTargetIndex,
          setTargetRef,
          onSearch: searchTargetSchoolVideo,
        }}
      >
        <RootLayout>
          <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <VideoStream
              isLoading={isLoading}
              data={data}
              LoadData={LoadData}
            />
            <ToggleContainer onClick={toggle} show={isShown}>
              <IconContainer>
                {isShown ? <RightOutlined /> : <LeftOutlined />}
              </IconContainer>
            </ToggleContainer>
            <HotSpotTopicContainer show={isShown} />
          </div>
        </RootLayout>
      </MaskContext.Provider>
      <MaskContainer isShown={maskShown} setShow={setMaskShown}>
        {Animation}
      </MaskContainer>
    </div>
  )
}

const VideoStream = React.memo(
  ({
    isLoading,
    data,
    LoadData,
  }: {
    isLoading: boolean
    data: VideoSchoolType[]
    LoadData: () => void
  }) => {
    const { itemRef, visibleItems, containerRef, style, listHeight } =
      useVirtualList(data)
    useReachBottom({
      target: containerRef,
      onReachBottom: LoadData,
      threshold: 100,
    })

    const cardItems = visibleItems.map((item, index) => (
      <CardItem
        ref={index === 0 ? itemRef : null}
        key={item.schoolName + '' + index}
        {...item}
        index={index}
      />
    ))
    // React.useEffect(() => {
    //   console.log('here1 useEffect containerRef.current', containerRef.current) //
    //   console.log('here1 useEffect itemRef.current', itemRef.current) //
    // })//
    // React.useEffect(() => {
    //   console.log('here2 useEffect containerRef.current', containerRef.current) //
    //   console.log('here2 useEffect itemRef.current', itemRef.current) //
    // },[containerRef.current]) //
    // console.log('itemRef.current', itemRef.current)
    // console.log('containerRef.current', containerRef.current)
    // 有null值：itemRef.current还没有挂载 + itemRef.current对应的数据被unmount了
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 10 }} />
        ) : !isLoading && data.length === 0 ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Empty />
          </div>
        ) : (
          <>
            <div
              style={{
                position: 'absolute', // 设置absolute是为了脱离文档流，防止和CardListContainer有UI上的冲突
                left: 0,
                top: 0,
                zIndex: -1, // 避免显示在CardListContainer上面
                height: listHeight + 'px', // 表示的是整个data的高度（可视list + 不可视list）
                width: '100%',
              }}
            ></div>
            {/* 用来撑开整个container */}
            <CardListContainer style={style}>{cardItems}</CardListContainer>
            {/* 不能设置 overflow: 'auto'， 这是为了将滚动事件的触发节点转移到父节点上 */}
          </>
        )}
      </div>
    )
  },
)
