/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

let colorScale = d3.scaleLinear()
.domain([0, 100])
  .range(['red', 'green', 'orange', 'purple', 'pink', 'teal', 'blue', 'wheat'])

const draw = (words) => {
  // Draw your data here...
  console.log('ini', words)
  d3.select("body").append("svg")
    .attr("widht", 750)
    .attr("height", 350)
    .attr("class", "wordcloud")
    .append('g')
    .attr('transform','translate(320,200)')
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', function(d){
      return d.size+"px"
    })
    .style('fill', function(d, i) {
      return colorScale(i)
    })
    .attr('transform', function(d,i){
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d){
      return d.Name
    })
}


const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', (data) => {
    data.map(function(name){
      name.size=name.G*2
    })
    // console.log(data)
    d3.layout.cloud().size([800, 300])
    .words(data)
    .rotate(function(data) {return ~~(Math.random() * 2) * 90})
    .font("Impact")
    .fontSize(function(data){
      return data.size
    })
    .on('end',draw)
    .start();
  })
}

load()
