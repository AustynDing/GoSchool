import React from 'react'

export function useDimensions() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 }) // 要使用useState而不是useRef
  // useEffect 是副作用函数，而不是监听函数，不会在依赖变化的时候，主动发起clean up和set up函数
  // 而是必须在re-render的时候，判断依赖是否发生改变
  React.useLayoutEffect(() => {
    const element = ref.current // 由于虚拟列表，导致为null了
    // console.log('there',element) // 之后ref.current不再变化，所以也不在setState了
    if (!element) return
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width: Math.round(width), height: Math.round(height) })
      }
    })
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [ref.current])

  return { ref, dimensions }
}
