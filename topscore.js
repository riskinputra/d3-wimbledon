/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...
  console.log('ini', words)
  d3.select("body").append("svg")
    .attr("widht", 700)
    .attr("height", 400)
    .append('g')
    .attr('transform','translate(320,200)')
    .selectAll('text')
}


const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', (data) => {
    data.map(function(name){
      name.size=name.G*2
    })
    // console.log(data)
    d3.layout.cloud().size([700, 400])
    .words(data)
    .rotate(function(data) {return ~~(Math.random() * 2) * 90})
    .fontSize(function(data){
      return data.size
    })
    .on('end',draw)
    .start();
  })
}

load()
