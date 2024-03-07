import { Card, Tag } from 'antd'
import Image from 'next/image'
const { Meta } = Card
import React, { forwardRef } from 'react'
import { useMaskContext } from '../../context/MaskContext'
import { VideoSchoolType } from '../../data'
import { CardContainer } from './style'

const TagColorMap: Record<string, string> = {
  招生宣传: 'cyan',
  专业解读: 'green',
  政策分析: 'orange',
  热点: 'red',
}
const TagOptions = ['招生宣传', '专业解读', '政策分析']
function CardItemRender(
  props: VideoSchoolType & { index: number },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const { toggle, setTargetIndex, setTargetRef } = useMaskContext()
  const option = TagOptions[Math.floor(Math.random() * 3)]
  const TagItem = (
    <span style={{ width: '100%' }}>
      <Tag color={TagColorMap['招生宣传']}>{'招生宣传'}</Tag>
      {/* <Tag color={TagColorMap['专业解读']}>{'专业解读'}</Tag> */}
      <Tag color={TagColorMap['热点']}>{'热点'}</Tag>
    </span>
  )
  const index = props.index
  return (
    <>
      <CardContainer ref={ref}>
        <Card
          ref={cardRef}
          onClick={() => {
            toggle(true)
            setTargetIndex(index)
            setTargetRef(cardRef)
          }}
          hoverable
          cover={
            <div
              style={{
                height: '350px',
                position: 'relative',
              }}
            >
              <Image
                style={{
                  objectFit: 'cover',
                }}
                alt="example"
                src={props.schoolCover}
                fill
              />
            </div>
          }
        >
          <Meta
            style={{
              display: 'flex',
              alignItems: 'contain',
            }}
            title={props.schoolName}
            description={TagItem}
          />
        </Card>
      </CardContainer>
    </>
  )
}

export const CardItem = forwardRef(CardItemRender)
