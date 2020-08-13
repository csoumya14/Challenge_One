import React from 'react'

import dataObject from './GraphData'
import CanvasComp from './CanvasComp'

const paper = {
  display: 'flex',
  flexDirection: 'column',
  padding: '50px',
  textAlign: 'center',
  borderRadius: '4',
  width: '45%',
  margin: 'auto',

  marginBottom: '20px',
  backgroundColor: '#050711',
}
const divClass = {
  marginTop: '8px',
}

const Main = () => {
  return (
    <div style={paper}>
      <div>
        <CanvasComp
          pointValues={dataObject.upperChart.points}
          color={dataObject.upperChart.color}
          title={dataObject.upperChart.heading}
        />
      </div>
      <div style={divClass}>
        <CanvasComp
          pointValues={dataObject.lowerChart.points}
          color={dataObject.lowerChart.color}
          title={dataObject.lowerChart.heading}
        />
      </div>
    </div>
  )
}

export default Main
