$(function() {
  var options = {
    width: 3000,
    height: 2000,
    originX: 100,
    originY: 100
  }

  var items
  var afc_north = ['Cleveland Browns', 'Baltimore Ravens', 'Cincinnati Bengals', 'Pittsburgh Steelers']
  var afc_east = ['Buffalo Bills', 'Miami Dolphins', 'New York Jets', 'New England Patriots']
  var afc_south = ['Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Tennessee Titans']

  // attach base svg element
  var svg = d3.select('body').append('svg')
                        .attr('width', options.width)
                        .attr('height', options.height)

  // the main draw function
  function draw(data) {
      var circles = svg.selectAll('circle').data(data)

      // update
      circles.transition()
        .attr('cx', function(d, i){ return i * 70 + options.originX} )
        .attr('cy', options.originY )
        .attr('r', function(d){ return d.avg_ticket / 4 } )
        .style('fill', 'black')

      // exit
      circles.exit().transition().duration(500).attr('r', 0).remove()

      // enter
      circles.enter().append('circle')
                        .attr('r', 0)
                        .transition().duration(1500)
                        .attr('cx', function(d, i){ return i * 70 + options.originX} )
                        .attr('cy', options.originY )
                        .attr('r', function(d){ return d.avg_ticket / 4 } )
                        .style('fill', 'black')
  }

  // filter(items, team, afc_north)
  // @items[Array of Objects]
  // @key[String]
  // @filterList[array of key's values]
  function filter(items, key, filterList) {
    var resultsList = []
    for(i = 0; i < items.length; i++){
      // if the item's key exists in the filteredList
      if(filterList.indexOf(items[i][key]) > -1) {
        resultsList.push( items[i] )
      }
    }

    return resultsList
  }

  function oneAtATime(items, interval) {
    setInterval(function() {
      items = items.splice(1, items.length - 1)
      draw(items)
    }, interval)
  }

  // get initial set of data and render it
  $.getJSON('nfl_ticket_data.json', function(data) {
    items = data
    draw(items)
    setTimeout(function(){
      draw(filter(items, 'team', afc_north))
    }, 5000)
    setTimeout(function(){
      draw(filter(items, 'team', afc_east))
    }, 7000)
    setTimeout(function(){
      draw(filter(items, 'team', afc_south))
    }, 9000)
  })



})
