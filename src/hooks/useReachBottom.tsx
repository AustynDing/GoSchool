import React, { useEffect } from 'react'
import { useDebounceEffect, useThrottleEffect } from 'ahooks'
import { useScrollComputation } from './useScrollComputation'

interface OptionsType<T> {
  target: React.MutableRefObject<T | null>
  onReachBottom: () => void
  threshold?: number
}

export const useReachBottom = function <T extends HTMLElement | null>(
  options: OptionsType<T>,
  deps?: any[],
) {
  const { target, onReachBottom, threshold } = options
  const judge = React.useCallback(() => {
    if (target.current) {
      return (
        Math.abs(
          target.current?.scrollHeight -
            target.current?.scrollTop -
            target.current?.clientHeight,
        ) < (threshold ?? 1)
      )
    }
    return true
  }, [target.current])
  const { computedResult: hasReachedBottom } = useScrollComputation(
    judge,
    target.current,
  )
  useEffect(
    () => {
      if (
        hasReachedBottom &&
        target.current &&
        Math.abs(
          target.current.scrollHeight -
            target.current.scrollTop -
            target.current.clientHeight,
        ) < (threshold ?? 1)
      ) {
        console.log('reach bottom')
        onReachBottom()
      }
    },
    deps ? [hasReachedBottom, target.current, ...deps] : undefined,
  ) // TODO:使用useThrottleEffect似乎有bug
}
