$(function() {
  width = 1000
  height = 1000
  xoffset = 100
  yoffset = 100
  var items

  function getData() {
      $.getJSON('nfl_ticket_data.json', function(data) {
      items = data
      draw()
    })
  }

  function draw() {
      var svg = d3.select('body').append('svg')
                        .attr('width', width)
                        .attr('height', height)

      console.log(items)
      var circles = svg.selectAll('circle')
                    .data(items)
                    .enter()
                    .append('circle')

      var circleAttrs = circles
                        .attr('cx', function(d, i){ return i * 20 + xoffset})
                        .attr('cy', yoffset)
                        .attr('r', function(d){ return d.avg_ticket / 5 })
                        .style('fill', 'black')
  }


  getData()
})
