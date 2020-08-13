const drawCurve = (ctx, pts, tension, isClosed, gradients, numOfSegments, showPoints) => {
  //background color of the canvas
  ctx.beginPath()
  ctx.rect(0, 0, 460, 190)
  ctx.fillStyle = '#0d0f1d'
  ctx.fill()
  //draw curves
  ctx.beginPath()
  drawLines(ctx, getCurvePoints(pts, tension, isClosed, numOfSegments), gradients)

  function drawSoftLine(x1, y1, x2, y2, lineWidth, r, g, b, a) {
    var gradient = ctx.createLinearGradient(x1, y1, x2, y2)

    gradient.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',0)') //lower
    gradient.addColorStop(0.35, 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')')
    gradient.addColorStop(0.37, 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')')
    gradient.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b + ',0)') //upper

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = gradient
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  //draw hover point
  if (gradients === 'blue') {
    drawSoftLine(84, 180, 84, 13, 1.5, 78, 255, 207, 2)
    drawSoftLine(20, 85, 117, 85, 1.2, 78, 255, 207, 2)

    ctx.beginPath()
    ctx.arc(85, 85, 0.8, 0, 2 * Math.PI, false)
    ctx.fillStyle = '#1bfbe4'
    ctx.fill()
    ctx.lineWidth = 4
    ctx.strokeStyle = '#1bfbe4'
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(85, 85, 5, 0, 2 * Math.PI, false)

    ctx.lineWidth = 1
    ctx.strokeStyle = '#1bfbe4'
    ctx.stroke()
    ctx.font = 'bold 16px Montserrat, sans-serif'
    ctx.fillStyle = 'white'
    ctx.fillText('9,0', 93, 73)
  }

  if (showPoints) {
    ctx.beginPath()
    for (var i = 0; i < pts.length - 1; i += 2) ctx.rect(pts[i] - 2, pts[i + 1] - 2, 4, 4)
  }
  // x and y labels and title
  ctx.font = 'bold 16px Montserrat, sans-serif'
  ctx.fillStyle = '#849fb4'
  if (gradients === 'blue') {
    ctx.fillText('Individuals', 193, 32)
  } else {
    ctx.fillText('Companies', 193, 32)
  }

  ctx.font = 'bold 10px Montserrat, sans-serif'
  ctx.fillStyle = '#849fb4'
  ctx.fillText("Jun'19", 32, 186)
  ctx.fillText("Jul'19", 97, 186)
  ctx.fillText("Aug'19", 162, 186)
  ctx.fillText("Sep'19", 227, 186)
  ctx.fillText("Oct'19", 292, 186)
  ctx.fillText("Nov'19", 357, 186)
  ctx.fillText("Dec'19", 422, 186)
  ctx.fillText('12', 8, 58)
  ctx.fillText('9', 8, 86)
  ctx.fillText('6', 8, 114)
  ctx.fillText('3', 8, 142)
  ctx.fillText('0', 8, 170)
  ctx.stroke()
}

//drawCurve(ctx, myPoints); //default tension=0.5
//drawCurve(ctx, myPoints, tension);

function getCurvePoints(pts, tension, isClosed, numOfSegments) {
  // use input value if provided, or use a default value
  tension = typeof tension != 'undefined' ? tension : 0.5
  isClosed = isClosed ? isClosed : false
  numOfSegments = numOfSegments ? numOfSegments : 16

  var _pts = [],
    res = [], // clone array
    x,
    y, // our x,y coords
    t1x,
    t2x,
    t1y,
    t2y, // tension vectors
    c1,
    c2,
    c3,
    c4, // cardinal points
    st,
    t,
    i // steps based on num. of segments

  // clone array so we don't change the original
  //
  _pts = pts.slice(0)

  // The algorithm require a previous and next point to the actual point array.
  // Check if we will draw closed or open curve.
  // If closed, copy end points to beginning and first points to end
  // If open, duplicate first points to fill, end points to end
  if (isClosed) {
    _pts.unshift(pts[pts.length - 1])
    _pts.unshift(pts[pts.length - 2])
    _pts.unshift(pts[pts.length - 1])
    _pts.unshift(pts[pts.length - 2])
    _pts.push(pts[0])
    _pts.push(pts[1])
  } else {
    _pts.unshift(pts[1]) //copy 1. point and insert at beginning
    _pts.unshift(pts[0])
    _pts.push(pts[pts.length - 2]) //copy last point and append
    _pts.push(pts[pts.length - 1])
  }

  // ok, lets start..

  // 1. loop goes through point array
  // 2. loop goes through each segment between the 2 pts + 1e point before and after
  for (i = 2; i < _pts.length - 4; i += 2) {
    for (t = 0; t <= numOfSegments; t++) {
      // calc tension vectors
      t1x = (_pts[i + 2] - _pts[i - 2]) * tension
      t2x = (_pts[i + 4] - _pts[i]) * tension

      t1y = (_pts[i + 3] - _pts[i - 1]) * tension
      t2y = (_pts[i + 5] - _pts[i + 1]) * tension

      // calc step
      st = t / numOfSegments

      // calc cardinals
      c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1
      //c1 = 2 * Math.pow(st, 2) - 3 * Math.pow(st, 1) + 1
      c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2)
      c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st
      c4 = Math.pow(st, 3) - Math.pow(st, 2)

      // calc x and y cords with common control vectors
      x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x
      y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y

      //store points in array
      res.push(x)
      res.push(y)
    }
  }

  return res
}

function drawLines(ctx, pts, gradients) {
  ctx.moveTo(pts[0], pts[1])
  for (var i = 2; i < pts.length - 1; i += 2) ctx.lineTo(pts[i], pts[i + 1])
  ctx.lineTo(460, 190)

  const grd = ctx.createLinearGradient(0, 190, 0, 0)

  if (gradients === 'blue') {
    grd.addColorStop(0.3, 'rgb(8, 164, 188, 50)') //lower
    grd.addColorStop(0.5, 'rgb(78, 255, 207, 100)') //upper
    grd.addColorStop(0, '#0d0f1d')
  } else {
    grd.addColorStop(0, 'rgb(62, 87, 194,100)') //lower
    grd.addColorStop(1, 'rgb(255, 86, 238,90)') //upper
    grd.addColorStop(0, '#0d0f1d')
  }

  ctx.fillStyle = grd

  ctx.fill()
  ctx.strokeStyle = '#0d0f1d'
  ctx.stroke()
}

export default drawCurve
