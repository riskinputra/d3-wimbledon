/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3
  .select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', data => {
    redraw(data)
  })
}
// redraw function
let redraw = data => {
  // Your data to graph here
  var maxGoal = Math.max.apply(
    Math,
    data.map(function(d) {
      return d.GoalsScored
    })
  )

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length + 1])
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain([0, maxGoal])
    .range([0, height - margin])

  const xyScale = d3.scaleLinear()
  .domain([0, maxGoal])
  .range([height - margin, 0])

  const xAxis = d3.axisBottom(xScale)
    .ticks(data.length)
  const yAxis = d3.axisLeft(xyScale)
  .ticks(maxGoal)

    svg.append("svg:g")
    .attr('transform', 'translate(20,' + (height - 20)+ ")")
    .call(xAxis)
    
  svg.append("svg:g")
  .attr("transform", "translate(" + (20) + ", 0)")
  .call(yAxis)
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      // console.log(i * marginLeft, 'from x')
      return xScale(i + 1)
    })
    .attr('y', d => {
      // console.log(d.GoalsScored)
      return (height - margin) - yScale(d.GoalsScored)
    })
    .attr('width', 10)
    .attr('height', d => {
      return yScale(d.GoalsScored)
    })
  
  

  // svg.selectAll('rect')
  // .data(data)
  // .enter()
  // .append('rect')
  // .attr('class', 'bar')
  // .attr('x', (d, i) => {
  //   return i
  // })
  // .attr('y', (d) => {
  //   console.log(yScale(d.GoalsScored))
  //   return 300 - yScale(d.GoalsScored)
  // })
  // .attr('width', 20)
  // .attr('hieght', (d) => {
  //   return yScale(d.GoalsScored)
  // })
}

reload()
