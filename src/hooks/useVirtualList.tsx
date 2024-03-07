import React from 'react'
import { useDimensions } from './useDimensions'

export function useVirtualList(totalItems: any[]) {
  const { ref: itemRef, dimensions } = useDimensions()
  // console.log('strange',dimensions) // 其实已经发生改变了
  const { width, height } = dimensions
  const [startIndex, setStartIndex] = React.useState(0)
  const [endIndex, setEndIndex] = React.useState(10)
  const [startOffset, setStartOffset] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const visibleCount = React.useMemo(() => {
    if (containerRef.current && height !== 0 && width !== 0) {
      const xCount = Math.ceil(containerRef.current.clientWidth / width)
      const yCount = Math.ceil(containerRef.current.clientHeight / height) // 使用 ceil 防止只有一半的数据出现
      // console.log('caculate',xCount,containerRef.current.clientWidth,width,yCount)
      return xCount * yCount
    } else {
      console.log('here', containerRef.current) //here null
      return 0
    }
  }, [containerRef.current, width, height])
  // console.log('scroll2', height) // 始终是0

  const onScroll = React.useCallback(
    (event: any) => {
      // console.log('scroll', height) // 始终是0
      const target = event.target
      if (target && height !== 0) {
        const scrollTop = target.scrollTop
        const start = Math.floor(scrollTop / height) ?? 0
        const end = start + visibleCount
        setStartIndex(start)
        setEndIndex(end)
        setStartOffset(scrollTop - (scrollTop % height))
      }
    },
    [height, visibleCount], // 必须添加好依赖，防止闭包陷阱
  )
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', onScroll)
      return () => containerRef.current?.removeEventListener('scroll', onScroll)
    } else {
      console.error('not')
    }
  }, [onScroll]) // 怀疑没有width,height作为依赖项，会变成闭包陷阱
  // 使用onScroll作为依赖，防止onScroll仍然捕获的是过时的数据
  // console.log(totalItems.length, startIndex, endIndex)
  return {
    visibleItems: totalItems.slice(startIndex, endIndex),
    style: {
      transform: `translate3d(0,${startOffset}px,0)`,
    },
    containerRef,
    itemRef,
    listHeight: totalItems.length * height,
    bind: React.useCallback(() => ({ onScroll }), [onScroll]),
  }
}
