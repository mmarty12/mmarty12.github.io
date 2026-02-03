// SVG1: step count visualization
const svgStepCount = document.getElementById('step-count')
const width = 500
const height = 250
const padding = 20

// step count data for the last 20 days was tracked using my phone's inbuilt counter
const data = [
  6171, 8642, 5721, 5691, 5760, 305, 5642,
  3756, 6900, 6444, 253, 5999, 8493, 4369,
  4398, 4982, 6040, 3133, 4022, 2624
]

const maxValue = Math.max(...data)
const barWidth = (width - padding * 2) / data.length

const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line')
yAxis.setAttribute('x1', padding - 5)
yAxis.setAttribute('y1', padding - 15)
yAxis.setAttribute('x2', padding - 5)
yAxis.setAttribute('y2', height - padding + 6)
yAxis.setAttribute('stroke', '#333')
yAxis.setAttribute('stroke-width', '2')
svgStepCount.appendChild(yAxis);

const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line')
xAxis.setAttribute('x1', padding - 5)
xAxis.setAttribute('y1', height - padding + 5)
xAxis.setAttribute('x2', width - padding)
xAxis.setAttribute('y2', height - padding + 5)
xAxis.setAttribute('stroke', '#333')
xAxis.setAttribute('stroke-width', '2')
svgStepCount.appendChild(xAxis)

const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
yLabel.setAttribute('x', -58)
yLabel.setAttribute('y', 15)
yLabel.setAttribute('font-size', '16')
yLabel.setAttribute('font-style', 'bold')
yLabel.textContent = 'Steps'
svgStepCount.appendChild(yLabel)

const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
xLabel.setAttribute('x', 500)
xLabel.setAttribute('y', 250)
xLabel.setAttribute('font-size', '16')
xLabel.setAttribute('font-style', 'bold')
xLabel.setAttribute('text-anchor', 'middle')
xLabel.textContent = 'Days'
svgStepCount.appendChild(xLabel)

const tickInterval = 1500
const maxTick = Math.ceil(maxValue / tickInterval) * tickInterval

for (let value = 0; value <= maxTick; value += tickInterval) {
  const y = height - padding - (value / maxValue) * (height - padding * 2)
  
  const tickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  tickLine.setAttribute('x1', padding - 10)
  tickLine.setAttribute('y1', y)
  tickLine.setAttribute('x2', padding - 5)
  tickLine.setAttribute('y2', y)
  tickLine.setAttribute('stroke', '#333')
  tickLine.setAttribute('stroke-width', '1')
  svgStepCount.appendChild(tickLine)
  
  const tick = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  tick.setAttribute('x', padding - 15)
  tick.setAttribute('y', y + 4)
  tick.setAttribute('font-size', '10')
  tick.setAttribute('text-anchor', 'end')
  tick.textContent = value.toLocaleString()
  svgStepCount.appendChild(tick)
}

for (let i = 0; i < data.length; i++) {
  const x = padding + i * barWidth + barWidth / 2

  const tickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  tickLine.setAttribute('x1', x)
  tickLine.setAttribute('y1', height - padding + 5)
  tickLine.setAttribute('x2', x)
  tickLine.setAttribute('y2', height - padding + 10)
  tickLine.setAttribute('stroke', '#333')
  tickLine.setAttribute('stroke-width', '1')
  svgStepCount.appendChild(tickLine)
  
  const tick = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  tick.setAttribute('x', x)
  tick.setAttribute('y', height - padding + 22)
  tick.setAttribute('font-size', '10')
  tick.setAttribute('text-anchor', 'middle')
  tick.textContent = i + 1
  svgStepCount.appendChild(tick)
}

  data.forEach((value, i) => {
  const barHeight = (value / maxValue) * (height - padding * 2)

  const rect = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'rect'
  )

  rect.setAttribute('x', padding + i * barWidth)
  rect.setAttribute('y', height - padding - barHeight)
  rect.setAttribute('width', barWidth - 4)
  rect.setAttribute('height', barHeight)
  rect.setAttribute('fill', '#6b8e5a')


  svgStepCount.appendChild(rect)
})
 
// SVG2: journey visualization
// distance was calculated based on step count data (assuming average step length of 0.75m); 
// data was calculated with the help of ChatGPT
  const progressKm = 75.7; 
  const totalDistance = 2900 // Bag End to Mount Doom
  const places = [
    { name: 'Bag End', km: 0 },
    { name: 'Bree', km: 217 },
    { name: 'Rivendell', km: 677 },
    { name: 'Lothlórien', km: 1367 },
    { name: 'Rauros', km: 2007 },
    { name: 'Mordor', km: 2527 },
    { name: 'Mount Doom', km: 2900 }
  ]

  const svgJourney = document.getElementById("journey")

  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  bg.setAttribute('x', -50)
  bg.setAttribute('y', -30)
  bg.setAttribute('width', width + 50)
  bg.setAttribute('height', height + 30)
  bg.setAttribute('rx', 8)
  bg.setAttribute('class', 'vis-bg')
  svgJourney.appendChild(bg)

  const pts = [
    [20, height * 0.6],
    [width * 0.22, height * 0.35],
    [width * 0.45, height * 0.8],
    [width * 0.68, height * 0.45],
    [width * 0.92, height * 0.55]
  ]

  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1]
    const [bx, by] = pts[i]
    d += ` C ${ax + (bx - ax) * 0.35} ${ay}, ${ax + (bx - ax) * 0.65} ${by}, ${bx} ${by}`
  }

  const road = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  road.setAttribute('d', d)
  road.setAttribute('stroke', '#d0d6cf')
  road.setAttribute('stroke-width', '6')
  road.setAttribute('fill', 'none')
  svgJourney.appendChild(road)

  const progress = road.cloneNode()
  progress.setAttribute('stroke', '#6b8e5a')
  progress.setAttribute('stroke-linecap', 'round')
  svgJourney.appendChild(progress)

  const len = road.getTotalLength()
  const ratio = Math.min(progressKm / totalDistance, 1)

  progress.style.strokeDasharray = len
  progress.style.strokeDashoffset = len * (1 - ratio)

  places.forEach(stage => {
    const t = stage.km / totalDistance
    if (t < 0 || t > 1) return

    const p = road.getPointAtLength(len * t)

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    dot.setAttribute('cx', p.x)
    dot.setAttribute('cy', p.y)
    dot.setAttribute('r', 3)
    dot.setAttribute('fill', '#3a2f1c')
    svgJourney.appendChild(dot)

    const placeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    placeLabel.setAttribute('x', p.x - 5)
    placeLabel.setAttribute('y', p.y - 15)
    placeLabel.setAttribute('text-anchor', 'middle')
    placeLabel.setAttribute('font-size', '12')
    placeLabel.setAttribute('font-weight', 'bold')
    placeLabel.setAttribute('fill', '#3a2f1c')
    placeLabel.textContent = stage.name
    svgJourney.appendChild(placeLabel)
  })

  const pos = road.getPointAtLength(len * ratio)
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  group.setAttribute('transform', `translate(${pos.x}, ${pos.y})`)
  group.setAttribute('class', 'vis-marker-group')

  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  marker.setAttribute('r', 6)
  marker.setAttribute('fill', '#fff')
  marker.setAttribute('stroke', '#6b8e5a')
  marker.setAttribute('stroke-width', '2')
  group.appendChild(marker)

  const boot = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  boot.setAttribute('d', 'M-3 1 L 0 -5 L 3 1 Z')
  boot.setAttribute('fill', '#6b8e5a')
  group.appendChild(boot)

  svgJourney.appendChild(group)

  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  label.setAttribute('x', pos.x + 1)
  label.setAttribute('y', pos.y + 35)
  label.setAttribute('text-anchor', 'middle')
  label.setAttribute('font-weight', 'bold')
  label.textContent = `${progressKm.toFixed(1)} km ~ ${((progressKm / totalDistance) * 100).toFixed(1)}%`
  svgJourney.appendChild(label)