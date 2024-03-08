import React from 'react'
import { useDimensions } from './useDimensions'

export function useVirtualList(totalItems: any[]) {
  const { ref: itemRef, dimensions } = useDimensions()
  const { width, height } = dimensions
  const [startIndex, setStartIndex] = React.useState(0)
  const [endIndex, setEndIndex] = React.useState(10)
  const [startOffset, setStartOffset] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const visibleCount = (() => {
    if (containerRef.current && height !== 0 && width !== 0) {
      const xCount = Math.ceil(containerRef.current.clientWidth / width)
      const yCount = Math.ceil(containerRef.current.clientHeight / height) // 使用 ceil 防止只有一半的数据出现
      // console.log(containerRef.current.clientWidth, width, xCount)
      // console.log(containerRef.current.clientHeight, height, yCount)
      return xCount * yCount + 10
    } else {
      return 0
    }
  })()
  // 添加 containerRef.current 作为依赖是没有意义的，因为useMemo是在挂载前执行完的
  // console.log('scroll2', height,width, totalItems.length,containerRef.current?.clientHeight,visibleCount) // 始终是0
  const onScroll = React.useCallback(
    (event: any) => {
      // console.log('scroll', height,visibleCount) // 始终是0
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
    // console.log('here useEffect containerRef.current', containerRef.current) //here null 可能是生命周期的问题导致可以访问到null - 即使已经挂载了
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', onScroll)
      return () => containerRef.current?.removeEventListener('scroll', onScroll)
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
