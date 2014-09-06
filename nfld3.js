$(function() {
  width = 3000
  height = 2000
  xoffset = 100
  yoffset = 100
  var items

  // attach base svg element
  var svg = d3.select('body').append('svg')
                        .attr('width', width)
                        .attr('height', height)

  // the main draw function
  function draw(data) {


      var circles = svg.selectAll('circle').data(data)

      var circlesEnter = circles.enter().append('circle')

      var circlesExit = circles.exit()

      circlesExit.transition().duration(500).attr('r', 0).transition().duration(500).attr('opacity', 0)

      var circleAttrs = circlesEnter
                        .attr('r', 0)
                        .transition().duration(1500)
                        .attr('cx', function(d, i){ return i * 70 + xoffset})
                        .attr('cy', yoffset)
                        .attr('r', function(d){ return d.avg_ticket / 4 })
                        .style('fill', 'black')
  }

  // get initial set of data and render it
  $.getJSON('nfl_ticket_data.json', function(data) {
    items = data
    draw(items)
    setInterval(function() {
      items = items.splice(1, items.length -1)
      // console.log(items)
      draw(items)
    }, 800)
  })



})
