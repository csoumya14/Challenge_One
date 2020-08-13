import React, { useRef, useState, useEffect } from 'react'

import drawCurve from './CardinalSpline'

const CanvasComp = ({ pointValues, color, title }) => {
  const [points, setPoints] = useState([])
  const [gradients, setGradients] = useState('')

  const canvasRef = useRef(null)
  const isClosed = false
  const width = 460
  const height = 190
  const tension = 0.5

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setPoints(pointValues)
    setGradients(color)
    drawCurve(ctx, points, tension, isClosed, gradients)
  }, [pointValues, color, points, isClosed, gradients])

  return (
    <canvas
      ref={canvasRef}
      id="example"
      style={{ border: '1px solid #0d0f1d', borderRadius: '5px' }}
      width={width}
      height={height}
    />
  )
}
export default CanvasComp
