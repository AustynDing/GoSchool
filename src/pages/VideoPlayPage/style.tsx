import styled from '@emotion/styled'

export const CardListContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* 设置容器的弹性换行为换行，让卡片在一行放不下时自动换行 */
  flex-wrap: wrap;
  /* 设置容器的对齐方式为居中，让卡片在容器内居中显示 */
  align-items: center;
  padding: 24px 0 24px 24px;
`

export const ArrowLeftContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 24px;
  top: 24px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 10;
  box-shadow:
    0 2px 8px 0 rgba(0, 0, 0, 0.04),
    0 1px 2px 0 rgba(0, 0, 0, 0.02);
  &:hover {
    background-color: #f7f7f7;
  }
`

// export const UpAndDownContainer = styled.div`
//   position: fixed;
//   top: 50%;
//   right: 8px;
//   transform: translatex(-50%);
//   height: 88px;
//   width: 44px;
//   background-color: #bfbfbf;
//   z-index: 101;
//   border-radius: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   transition: all 0.3s;
//   &:hover {
//     background-color: #d9d9d9;
//     cursor: pointer;
//   }
// `

export const RightBarContainer = styled.div<{ show: boolean }>`
  height: 100%;
  width: ${({ show }) => (show ? '300px' : '0px')};
  padding: 10px;
  /* background-color: #fafafa; */
  transform: translateX(${({ show }) => (show ? 0 : '100%')});
  transition: all 0.3s;
`

export const TabContainer = styled.div`
  height: 90%;
  width: 100%;
`

export const ToggleContainer = styled.div<{ show: boolean }>`
  position: fixed;
  cursor: pointer;
  top: 50%;
  right: 300px;
  transform: translateY(-50%)
    translateX(${({ show }) => (show ? '0' : '300px')});
  transition: all 0.3s;
`

export const IconContainer = styled.div`
  color: #8c8c8c;
  &:hover {
    color: #1f1f1f;
    transition: all 0.3s;
  }
`
