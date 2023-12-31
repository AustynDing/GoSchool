import styled from '@emotion/styled'
import schoolBadge from '@/static/school-badge/南京大学 NJU.svg'

export const MapContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
`

export const Layer = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
`

export const CardListContainer = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #f5f5f5;
  // margin-left: 5px;
`
