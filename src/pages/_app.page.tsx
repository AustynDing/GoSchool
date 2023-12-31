import React from 'react'
import '../styles/global.css'
export default function App({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<any>
  pageProps: any
}) {
  const ref = React.useRef<HTMLElement | null>(null)
  React.useEffect(() => {
    ;(function loadGlobalCssVariables() {
      function setInnerHeight() {
        window.document.documentElement.style.setProperty(
          '--innerHeight',
          `${window.innerHeight / 100}px`,
        )
      }
      setInnerHeight()
      window.document.addEventListener('DOMContentLoaded', setInnerHeight) // 没有触发
      window.addEventListener('resize', setInnerHeight)
    })()
    ref.current = document.getElementById('__next')
    // 12.22修改
    if (ref.current) {
      ref.current.style.height = '100%'
    }
  }, [])
  return (
    <ContainerContext.Provider value={{ container: ref }}>
      <Component {...pageProps} />
    </ContainerContext.Provider>
  )
}
interface ContainerContextValue {
  container: React.MutableRefObject<HTMLElement | null>
}

const ContainerContext = React.createContext<ContainerContextValue>({
  container: null as any,
})
export const usePageContainer = () =>
  React.useContext(ContainerContext).container
