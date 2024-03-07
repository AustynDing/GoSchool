import { deepEqual } from '@/utils/deepEqual'
import React from 'react'

interface ComputedScroll {
  speed: number
  time: number
  pos: number
  screenIndex: number
  progress: number
}

const defaultComputedScroll = {
  speed: 0,
  time: 0,
  pos: 0,
  screenIndex: 0,
  progress: 0,
}

function updateScrollMemoryV2(
  curPos: number,
  curTime: number,
  curContainerSize: number,
  curContainerScrollSize: number,
): (prevState: ComputedScroll) => ComputedScroll {
  return prevState => {
    if (Math.abs(curTime - prevState.time) < 10) {
      return prevState
    }
    return {
      speed: (1000 * (curPos - prevState.pos)) / (curTime - prevState.time + 1),
      time: curTime,
      pos: curPos,
      screenIndex: curPos / curContainerSize,
      progress: (100 * (curPos + curContainerSize)) / curContainerScrollSize,
    }
  }
}

export function useScrollComputation<T = any>(
  expression: (computedScroll: {
    scrollX: ComputedScroll
    scrollY: ComputedScroll
    lastComputedResult: T | null
  }) => T,
  target?: HTMLElement | null,
) {
  const scrollX = React.useRef<ComputedScroll>(defaultComputedScroll)
  const scrollY = React.useRef<ComputedScroll>(defaultComputedScroll)
  const computedResultRef = React.useRef<T>(
    expression({
      scrollX: scrollX.current,
      scrollY: scrollY.current,
      lastComputedResult: null,
    }),
  )
  const [computedResult, setComputedResult] = React.useState(
    computedResultRef.current,
  )

  const onScroll = React.useCallback(
    function (evt: any) {
      const { target, timeStamp } = evt
      scrollX.current = updateScrollMemoryV2(
        target?.scrollLeft,
        timeStamp,
        target?.clientWidth,
        target?.scrollWidth,
      )(scrollX.current)
      scrollY.current = updateScrollMemoryV2(
        target?.scrollTop,
        timeStamp,
        target?.clientHeight,
        target?.scrollHeight,
      )(scrollY.current)
      const newComputedResult = expression({
        scrollX: scrollX.current,
        scrollY: scrollY.current,
        lastComputedResult: computedResultRef.current,
      })
      if (!deepEqual(newComputedResult, computedResultRef.current)) {
        computedResultRef.current = newComputedResult
        setComputedResult(computedResultRef.current)
      }
    },
    [expression],
  )

  React.useEffect(() => {
    if (target) {
      target.addEventListener('scroll', onScroll)
      return () => {
        target.removeEventListener('scroll', onScroll)
      }
    }
  }, [onScroll])

  return {
    computedResult,
    bind: React.useCallback(() => ({ onScroll }), [onScroll]),
  }
}
