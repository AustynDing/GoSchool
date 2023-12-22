import React, { useState } from 'react'
import './IndexSearchMajor.css'

const IndexSearchMajor: React.FC = () => {
  return (
    <div
      style={{
        width: 1280,
        height: 500,
        display: 'flex',
        // backgroundColor: '#0f0',
        margin: '50px auto',
      }}
    >
      <div className={'major-des'}>
        <div className={'cards-container'}>
          <div className={'cards'}>
            <div className={'card-wrapper'}>
              <div className={'card'}>
                <div className={'card-content is-front'}>
                  <img
                    src="/images/machine.jpg"
                    alt="Magic Image icon"
                    style={{ width: '200px', opacity: 1, borderRadius: 32 }}
                  />
                </div>
                <div className={'card-content is-back'}></div>
              </div>
            </div>

            <div className={'card-wrapper'}>
              <div className={'card'}>
                <div className={'card-content is-front'}>
                  <img
                    src="/images/dna.jpg"
                    alt="Magic Image icon"
                    style={{ width: '200px', opacity: 1 }}
                  />
                </div>
                <div className={'card-content is-back'}></div>
              </div>
            </div>

            <div className={'card-wrapper'}>
              <div className={'card'}>
                <div className={'card-content is-front'}>
                  <img
                    src="/images/chemistry.jpg"
                    alt="Loading"
                    style={{ width: '200px', opacity: 1 }}
                  />
                </div>
                <div className={'card-content is-back'}></div>
              </div>
            </div>

            <div className={'card-wrapper'}>
              <div className={'card'}>
                <div className={'card-content is-front'}>
                  <img
                    src="/images/chemistry.jpg"
                    alt="Loading"
                    style={{ width: '200px', opacity: 1 }}
                  />
                </div>
                <div className={'card-content is-back'}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // backgroundColor: '#f00',
          height: '100%',
          width: '45%',
          paddingLeft: 100,
        }}
      >
        <div
          style={
            {
              // position: 'absolute',
              // left: '10px',
              // marginLeft: '30px'
            }
          }
        >
          <p
            style={{
              lineHeight: 1.15,
              // color: '#000',
              fontFamily:
                'Gilroy-regular,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
              margin: 0,
              padding: 0,
              fontWeight: 'bold',
              fontSize: '38px',
              letterSpacing: '.02em',
              marginBottom: '12px',
            }}
          >
            查专业
          </p>
          <div
            style={{
              lineHeight: 1.15,
              fontFamily:
                'Gilroy-regular,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
              margin: 0,
              padding: 0,
              fontSize: '20px',
              letterSpacing: '.02em',
              color: '#777e87',
            }}
          >
            喜欢土木工程怎么办？稳啦！
          </div>

          <ul>
            <li className={'desList'}>独特交互式地图指引，了解大学地理全貌</li>
            <li className={'desList'}>从GDP、教育经费等筛选，增加择校维度</li>
            <li className={'desList'}>全面精炼信息展示，迅速掌握大学概况</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IndexSearchMajor
