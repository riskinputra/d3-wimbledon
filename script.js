/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (data) => {
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  console.log(data)
  let goalScore = d3.max(data, function(d){return d.GoalsScored})
  // console.log(goalScore)
  let yScale = d3.scaleLinear()
              .domain([0, goalScore])
              .range([0, height-50])
  let xScale = d3.scaleLinear()
              .domain([0, data.length])
              .range([0, width])
  let y = d3.scaleLinear()
        .domain([0, goalScore])
        .range([height-50, 0])
  let yAxis = d3.axisLeft(y).ticks(goalScore)
  let xAxis = d3.axisBottom(xScale).ticks(data.length)

  let colorScale = d3.scaleLinear()
                  .domain([0, data.length])
                  .range(['orange', 'red'])

  let chartGroup = svg.append('g')
                      .attr('transform', 'translate(30,50)')
  
  let t = d3.transition()
    .duration(1000)
    .ease(d3.easeLinear);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('height', function(d,i){return yScale(d.GoalsScored)})
      .attr('width','10')
      .attr('x', function(d,i) {return i*width/(data.length)})
      .attr('y', function(d,i) {return height - yScale(d.GoalsScored)})
      .attr('fill', function(d,i) {return colorScale(i)})
      .attr('transform', 'translate(31,-20)')
      .transition(t)
      .style("fill", "red")
      .transition(t)
      .style("fill", "orange")
      .transition(t)
      .style("fill", "yellow")
      .transition(t)
      .style("fill", "green")
      .transition(t)
      .style("fill", "tile")
      .transition(t)
      .style("fill", "blue")
      .transition(t)
      .style("fill", "purple")
  
  chartGroup.append('g')
            .attr('class','y axis').attr('transform', 'translate(1,-20)').call(yAxis)

  chartGroup.append('g')
            .attr('class','x axis').attr('transform', 'translate(0,230)').call(xAxis)
  
}

reload()
