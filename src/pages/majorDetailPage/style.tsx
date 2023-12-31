import styled from '@emotion/styled'

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
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

export const InfoContainer = styled.div`
  width: 60%;
  margin-left: 10%;
  height: 100%;
  overflow-y: auto;
  // margin-right: 5px;
`
